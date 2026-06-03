import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "Listify <noreply@listify.app>";

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!resend) {
    // Dev mode — print to console instead of sending
    console.log("\n--- PASSWORD RESET LINK (dev mode) ---");
    console.log(`To: ${email}`);
    console.log(`Link: ${resetUrl}`);
    console.log("--------------------------------------\n");
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Reset your Listify password",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px;">
        <h2 style="font-size:22px;font-weight:700;color:#111827;margin-bottom:8px;">
          Reset your password
        </h2>
        <p style="color:#6b7280;margin-bottom:24px;">
          Click the button below to reset your password. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}"
          style="display:inline-block;background:#2563eb;color:#fff;font-weight:600;
                 padding:12px 24px;border-radius:8px;text-decoration:none;margin-bottom:24px;">
          Reset Password
        </a>
        <p style="color:#9ca3af;font-size:13px;">
          If you didn't request this, you can safely ignore this email.<br/>
          This link will expire in 1 hour.
        </p>
      </div>
    `,
  });
}
