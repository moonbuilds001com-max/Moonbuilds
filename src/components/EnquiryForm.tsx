"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Send, MessageCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryFields,
} from "@/lib/validation";
import { SITE } from "@/lib/site";

const EMPTY: EnquiryFields = {
  name: "",
  email: "",
  phone: "",
  business: "",
  service: "",
  description: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; sent: boolean; emailConfigured: boolean }
  | { kind: "error"; message: string };

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFields>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const whatsappLink = useMemo(() => {
    const text = [
      `Hello ${SITE.name}, I'd like to enquire about a project.`,
      `Name: ${values.name || "—"}`,
      `Email: ${values.email || "—"}`,
      `Phone: ${values.phone || "—"}`,
      `Business: ${values.business || "—"}`,
      `Service: ${values.service || "—"}`,
      `Project: ${values.description || "—"}`,
    ].join("\n");
    return `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`;
  }, [values]);

  const set =
    (field: keyof EnquiryFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const clientErrors = validateEnquiry(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setStatus({ kind: "submitting" });
    try {
      let turnstileToken: string | undefined;
      const el = document.querySelector<HTMLInputElement>(
        'input[name="cf-turnstile-response"]'
      );
      if (el?.value) turnstileToken = el.value;

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        sent?: boolean;
        emailConfigured?: boolean;
        errors?: EnquiryErrors;
        message?: string;
      };

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus({
          kind: "error",
          message: data.message || "The enquiry could not be sent. Please try again.",
        });
        return;
      }
      if (data.sent) {
        setStatus({
          kind: "success",
          sent: true,
          emailConfigured: data.emailConfigured ?? true,
        });
      } else {
        setStatus({
          kind: "success",
          sent: false,
          emailConfigured: data.emailConfigured ?? false,
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "A network error occurred. Please try again, or use WhatsApp.",
      });
    }
  }

  const inputClass =
    "w-full rounded-lg border border-cream/15 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-stone focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/40";

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-cream/15 bg-ink/70 p-8 backdrop-blur-xl"
      >
        <CheckCircle2 className="h-10 w-10 text-ember" aria-hidden="true" />
        {status.sent ? (
          <>
            <h3 className="mt-4 font-display text-2xl font-bold text-cream">
              Enquiry sent.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Your enquiry has been emailed to us. We usually reply within one
              working day — for anything urgent, WhatsApp is fastest.
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-4 font-display text-2xl font-bold text-cream">
              Your enquiry is ready to send.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Email delivery is not configured on this deployment yet, so we
              won&apos;t pretend a message was sent. Your details are prepared
              below — send them straight to us on WhatsApp in one tap.
            </p>
          </>
        )}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ember px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Send via WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setStatus({ kind: "idle" });
          }}
          className="mt-4 block text-xs text-stone underline underline-offset-4 hover:text-cream"
        >
          Start a new enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-cream/15 bg-ink/70 p-6 backdrop-blur-xl md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name} htmlFor="f-name">
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            className={inputClass}
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" error={errors.email} htmlFor="f-email">
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            placeholder="you@business.co.ke"
          />
        </Field>
        <Field label="Phone" error={errors.phone} htmlFor="f-phone">
          <input
            id="f-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            placeholder="+254 712 345 678"
          />
        </Field>
        <Field label="Business name" error={errors.business} htmlFor="f-business">
          <input
            id="f-business"
            name="business"
            autoComplete="organization"
            className={inputClass}
            value={values.business}
            onChange={set("business")}
            aria-invalid={Boolean(errors.business)}
            placeholder="Your business, or “none”"
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Service required" error={errors.service} htmlFor="f-service">
            <select
              id="f-service"
              name="service"
              className={inputClass}
              value={values.service}
              onChange={set("service")}
              aria-invalid={Boolean(errors.service)}
            >
              <option value="">Choose a service…</option>
              {[
                "Website Design",
                "Website Development",
                "E-commerce Development",
                "Interactive & 3D Web Experiences",
                "Website Redesign",
                "Digital Brand Experiences",
                "Website Maintenance & Support",
                "Not sure yet — please advise",
              ].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field
            label="Project description"
            error={errors.description}
            htmlFor="f-description"
          >
            <textarea
              id="f-description"
              name="description"
              rows={5}
              className={inputClass}
              value={values.description}
              onChange={set("description")}
              aria-invalid={Boolean(errors.description)}
              placeholder="What does your business do, what should the website do for it, and when would you like to launch?"
            />
          </Field>
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="f-companyUrl">Company URL</label>
        <input
          id="f-companyUrl"
          name="companyUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyUrl ?? ""}
          onChange={set("companyUrl")}
        />
      </div>

      {turnstileSiteKey ? (
        <div className="mt-5">
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="dark"
          />
        </div>
      ) : null}

      {status.kind === "error" ? (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-lg border border-ember/40 bg-ember/10 p-4 text-sm text-cream"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ember px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-cream disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status.kind === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-stone">
        Submitting sends your details to MOONBUILDS so we can reply to your
        enquiry. We never share them with anyone else. Prefer chat?{" "}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cream underline underline-offset-4 hover:text-ember"
        >
          Send the same enquiry on WhatsApp
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-stone"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-ember" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
