/**
 * Enquiry validation shared by the client form and the server route.
 * The server re-runs this — never trusts client validation.
 */
export interface EnquiryFields {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  description: string;
  /** Honeypot — must stay empty. */
  companyUrl?: string;
}

export interface EnquiryErrors {
  name?: string;
  email?: string;
  phone?: string;
  business?: string;
  service?: string;
  description?: string;
}

export const SERVICE_LIST = [
  "Website Design",
  "Website Development",
  "E-commerce Development",
  "Interactive & 3D Web Experiences",
  "Website Redesign",
  "Digital Brand Experiences",
  "Website Maintenance & Support",
  "Not sure yet — please advise",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Accepts international formats and common local formats: +2547..., 07..., 01... */
const PHONE_RE = /^(\+?\d[\d\s\-()]{7,19})$/;

export function validateEnquiry(
  data: Partial<EnquiryFields>
): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const business = (data.business || "").trim();
  const service = (data.service || "").trim();
  const description = (data.description || "").trim();

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(phone))
    errors.phone = "Please enter a valid phone number, e.g. +254 712 345 678.";
  if (business.length < 2)
    errors.business = "Please enter your business name, or write “none”.";
  if (!SERVICE_LIST.includes(service as (typeof SERVICE_LIST)[number]))
    errors.service = "Please choose the service you need.";
  if (description.length < 20)
    errors.description = "Please describe your project in at least 20 characters.";

  return errors;
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}
