import BetterAuth from "better-auth";
import nodemailer from "nodemailer";

type SendVerificationOptions = {
  email: string;
  userId: string;
  name?: string;
  expiresIn?: string; // e.g. "24h"
  from?: string;
};

/**
 * Mengirim email verifikasi menggunakan library better-auth untuk membuat token verifikasi
 * dan nodemailer untuk mengirim email.
 *
 * Lingkungan yang digunakan (env):
 * - BETTER_AUTH_SECRET
 * - BETTER_AUTH_ISSUER (opsional)
 * - FRONTEND_URL (contoh: https://example.com)
 * - SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
 * - EMAIL_FROM (opsional)
 * - APP_NAME (opsional)
 */
const betterAuth = new BetterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "default-better-auth-secret",
  issuer: process.env.BETTER_AUTH_ISSUER || "your-app",
});

/**
 * Menghasilkan token verifikasi. API better-auth bisa berbeda-beda,
 * jadi kita mencoba beberapa metode yang umum (`createVerificationToken` atau `createToken`).
 */
async function generateVerificationToken(
  userId: string,
  expiresIn = "24h",
): Promise<string> {
  // Jika library menyediakan createVerificationToken
  if (typeof (betterAuth as any).createVerificationToken === "function") {
    const res = await (betterAuth as any).createVerificationToken(
      { userId },
      { expiresIn },
    );
    // beberapa implementasi mengembalikan string langsung, beberapa mengembalikan objek
    return typeof res === "string"
      ? res
      : res.token || res.id || JSON.stringify(res);
  }

  // Fallback ke createToken
  if (typeof (betterAuth as any).createToken === "function") {
    const res = await (betterAuth as any).createToken(
      { sub: userId, type: "verification" },
      { expiresIn },
    );
    return typeof res === "string"
      ? res
      : res.token || res.id || JSON.stringify(res);
  }

  throw new Error(
    "better-auth: no token creation method (createVerificationToken or createToken) found",
  );
}

/**
 * Mengirim email verifikasi.
 */
export async function sendVerificationEmail(opts: SendVerificationOptions) {
  if (!opts || !opts.email || !opts.userId) {
    throw new Error("sendVerificationEmail: email and userId are required");
  }

  const expiresIn = opts.expiresIn || "24h";
  const token = await generateVerificationToken(opts.userId, expiresIn);

  const frontend = process.env.FRONTEND_URL || "http://localhost:3000";
  const baseUrl = frontend.replace(/\/+$/, "");
  const verificationUrl = `${baseUrl}/verify-email?token=${encodeURIComponent(token)}`;

  const namePart = opts.name ? `Hi ${opts.name},` : "Hi,";
  const appName = process.env.APP_NAME || "Our App";

  const text = `${namePart}

Please verify your email address by clicking the link below:

${verificationUrl}

This link will expire in ${expiresIn}.

If you did not request this, you can safely ignore this email.

Thanks,
${appName}
`;

  const html = `
<p>${namePart}</p>
<p>Please verify your email address by clicking the button below. This link will expire in <strong>${expiresIn}</strong>.</p>
<p><a href="${verificationUrl}" style="display:inline-block;padding:10px 18px;background:#2563eb;color:#ffffff;border-radius:6px;text-decoration:none;">Verify Email</a></p>
<p>If you did not request this, please ignore this email.</p>
<p>Thanks,<br/>${appName}</p>
`.trim();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true" || false,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  const from =
    opts.from ||
    process.env.EMAIL_FROM ||
    `no-reply@${new URL(baseUrl).hostname || "example.com"}`;

  const mailOptions = {
    from,
    to: opts.email,
    subject: `Verify your email for ${appName}`,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, info };
}

/**
 * Utility untuk memverifikasi token (opsional).
 * Menggunakan better-auth untuk mem-verify token, jika tersedia.
 */
export async function verifyEmailToken(token: string) {
  if (typeof (betterAuth as any).verifyToken === "function") {
    return (betterAuth as any).verifyToken(token);
  }

  if (typeof (betterAuth as any).verify === "function") {
    return (betterAuth as any).verify(token);
  }

  throw new Error(
    "better-auth: no token verification method found (verifyToken or verify)",
  );
}
