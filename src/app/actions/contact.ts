"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }

  try {
    await resend.emails.send({
      from: "Portfolio <hello@pardeep.me>",
      to: "hello@pardeep.me",
      replyTo: email,
      subject: `Message from ${name} <${email}>`,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: "Failed to send. Please try again." };
  }
}
