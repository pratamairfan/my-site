import { Resend } from "resend";

/**
 * Email utility for sending emails
 *
 * Development mode: Logs email content to console
 * Production mode: Uses Resend email service
 */

// At least one of text or html must be provided
type SendEmailOptions =
  | {
      to: string;
      subject: string;
      text: string;
      html?: string;
    }
  | {
      to: string;
      subject: string;
      text?: string;
      html: string;
    }
  | {
      to: string;
      subject: string;
      text: string;
      html: string;
    };

// Initialize Resend client (only if API key is available)
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  // Development mode: Log to console
  if (process.env.NODE_ENV === "development") {
    console.log("\n📧 ===== EMAIL SENT (DEV MODE) =====");
    console.log("To:", options.to);
    console.log("Subject:", options.subject);
    if (options.text) {
      console.log("Text:", options.text);
    }
    if (options.html) {
      console.log("HTML Preview:", options.html.substring(0, 200) + "...");
    }
    console.log("====================================\n");
    return;
  }

  // Production mode: Use Resend
  if (!resend) {
    console.error("❌ RESEND_API_KEY not configured. Email was not sent.");
    console.error("To:", options.to);
    console.error("Subject:", options.subject);
    throw new Error(
      "Email service not configured. Please set RESEND_API_KEY environment variable."
    );
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      ...options,
    });

    if (error) {
      console.error("❌ Failed to send email via Resend:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("✅ Email sent successfully via Resend");
    console.log("Email ID:", data?.id);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}

export async function sendResetPasswordEmail(
  email: string,
  url: string
): Promise<void> {
  const subject = "Reset Your Password - My SiTO";
  const text = `Click the link below to reset your password:\n\n${url}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Reset Your Password</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">We received a request to reset your password for your My SiTO account. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
          <p style="font-size: 14px; color: #667eea; word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${url}</p>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">This link will expire in <strong>1 hour</strong>.</p>
          <p style="font-size: 14px; color: #666;">If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            This is an automated email from My SiTO. Please do not reply to this email.
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© ${new Date().getFullYear()} My SiTO. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;

  await sendEmail({ to: email, subject, text, html });
}
