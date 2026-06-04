import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "Listify <onboarding@resend.dev>";

export async function sendWelcomeEmail(email: string, name?: string | null) {
  const firstName = name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXTAUTH_URL ?? "https://listify-silk.vercel.app";

  if (!resend) {
    console.log("\n--- WELCOME EMAIL (dev mode) ---");
    console.log(`To: ${email}`);
    console.log("-------------------------------\n");
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to Listify — your first listing is waiting",
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Logo -->
        <tr><td style="padding-bottom:24px;" align="center">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#0E1C2E;width:32px;height:32px;border-radius:8px;text-align:center;vertical-align:middle;">
                <span style="color:#B89858;font-size:18px;font-weight:900;line-height:32px;">L</span>
              </td>
              <td style="padding-left:10px;font-size:20px;font-weight:700;color:#111827;letter-spacing:-0.5px;">
                List<span style="color:#B89858;">ify</span>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#ffffff;border-radius:16px;padding:40px 36px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#111827;line-height:1.2;">
            Welcome, ${firstName}! 🎉
          </h1>
          <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
            Your Listify account is all set. You can now generate professional MLS listing
            descriptions in 30 seconds — with 3 variations every time.
          </p>

          <!-- Feature highlights -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${[
              ["⚡", "30-second generation", "Fill in the property details and AI does the rest"],
              ["🛡️", "Fair Housing compliant", "Every listing is automatically scanned before you see it"],
              ["📋", "3 variations per listing", "Pick your favorite or mix and match"],
              ["💾", "Saved history", "Every listing you generate is saved to your account"],
            ].map(([icon, title, desc]) => `
            <tr>
              <td style="padding:8px 0;vertical-align:top;width:36px;font-size:18px;">${icon}</td>
              <td style="padding:8px 0 8px 4px;">
                <span style="font-size:14px;font-weight:600;color:#111827;">${title}</span>
                <span style="font-size:14px;color:#9ca3af;"> — ${desc}</span>
              </td>
            </tr>`).join("")}
          </table>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="background:linear-gradient(135deg,#C4A05A,#8C6828);border-radius:10px;">
                <a href="${appUrl}/generate"
                   style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;
                          color:#ffffff;text-decoration:none;border-radius:10px;">
                  Generate Your First Listing →
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">
            You're on the <strong style="color:#111827;">Free plan</strong> — 3 listings per month, no credit card required.
            When you're ready for unlimited listings,
            <a href="${appUrl}/pricing" style="color:#B89858;text-decoration:none;font-weight:600;">upgrade to Pro</a> anytime.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
            You're receiving this because you created a Listify account.<br/>
            <a href="${appUrl}/account" style="color:#9ca3af;">Account Settings</a> ·
            <a href="${appUrl}/terms" style="color:#9ca3af;">Terms</a> ·
            <a href="${appUrl}/privacy" style="color:#9ca3af;">Privacy</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });
}

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
