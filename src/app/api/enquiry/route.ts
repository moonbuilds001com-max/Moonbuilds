import { NextRequest, NextResponse } from "next/server";
import {
  validateEnquiry,
  type EnquiryFields,
} from "@/lib/validation";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* Rate limiting: in-memory, per IP, generous for people, tight for    */
/* abuse. (On serverless this is per-instance, which still stops       */
/* bursts; a Redis-backed limiter can replace it without API changes.) */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear(); // bound memory
  return list.length > MAX_PER_WINDOW;
}

const emailConfigured = Boolean(
  process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL
);

function badRequest(
  message: string,
  errors?: Record<string, string>,
  status = 400
) {
  return NextResponse.json({ ok: false, message, errors }, { status });
}

export async function POST(request: NextRequest) {
  // --- Rate limit ----------------------------------------------------
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Too many enquiries in a short time. Please wait a minute, or reach us on WhatsApp.",
      },
      { status: 429 }
    );
  }

  // --- Parse ----------------------------------------------------------
  let body: Partial<EnquiryFields> & { turnstileToken?: string };
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  // --- Honeypot: bots get a fake success, people never see this field --
  if ((body.companyUrl || "").trim() !== "") {
    return NextResponse.json({ ok: true, sent: false, emailConfigured });
  }

  // --- Turnstile (only enforced when keys are configured) --------------
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = body.turnstileToken || "";
    try {
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: token, remoteip: ip }),
      });
      const result = (await verify.json()) as { success?: boolean };
      if (!result.success) {
        return badRequest("Spam check failed. Please try again.");
      }
    } catch {
      return badRequest("Spam check could not run. Please try again.");
    }
  }

  // --- Server-side validation (never trust the client) -----------------
  const errors = validateEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        errors,
      },
      { status: 400 }
    );
  }

  const data: EnquiryFields = {
    name: (body.name || "").trim(),
    email: (body.email || "").trim(),
    phone: (body.phone || "").trim(),
    business: (body.business || "").trim(),
    service: (body.service || "").trim(),
    description: (body.description || "").trim(),
  };

  // --- Honest behaviour when email is not configured --------------------
  if (!emailConfigured) {
    return NextResponse.json({
      ok: true,
      sent: false,
      emailConfigured: false,
      message:
        "Email delivery is not configured on this deployment. The enquiry is handed to WhatsApp instead — nothing was pretended.",
    });
  }

  // --- Send via Resend --------------------------------------------------
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from =
      process.env.CONTACT_FROM_EMAIL || "MOONBUILDS enquiries <onboarding@resend.dev>";

    const text = [
      `New project enquiry from ${SITE.name} website`,
      "",
      `Name:        ${data.name}`,
      `Email:       ${data.email}`,
      `Phone:       ${data.phone}`,
      `Business:    ${data.business}`,
      `Service:     ${data.service}`,
      "",
      "Project description:",
      data.description,
      "",
      `Reply-to: ${data.email}`,
    ].join("\n");

    const sent = await resend.emails.send({
      from,
      to: [process.env.CONTACT_TO_EMAIL as string],
      replyTo: data.email,
      subject: `Project enquiry — ${data.business} (${data.service})`,
      text,
    });

    if (sent.error) {
      console.error("Resend error:", sent.error);
      return NextResponse.json(
        {
          ok: false,
          emailConfigured: true,
          message:
            "The enquiry could not be delivered by email right now. Please use WhatsApp instead — your details stay intact.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, sent: true, emailConfigured: true });
  } catch (err) {
    console.error("Enquiry send failed:", err);
    return NextResponse.json(
      {
        ok: false,
        emailConfigured: true,
        message:
          "The enquiry could not be delivered right now. Please use WhatsApp instead.",
      },
      { status: 502 }
    );
  }
}
