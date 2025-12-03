# Resend Email Service Setup Guide

Panduan lengkap untuk mengkonfigurasi Resend email service untuk fitur password reset di production.

## 📋 Prerequisites

- Akun Resend (gratis untuk 3,000 emails/bulan)
- Domain yang sudah di-verify (opsional, bisa pakai `onboarding@resend.dev` untuk testing)

---

## 🚀 Step-by-Step Setup

### 1. Daftar Akun Resend

1. Kunjungi [resend.com](https://resend.com)
2. Klik **"Sign Up"** atau **"Get Started"**
3. Daftar menggunakan:
   - Email address
   - GitHub account
   - Google account
4. Verify email Anda jika diminta

### 2. Generate API Key

1. Login ke [Resend Dashboard](https://resend.com/overview)
2. Klik **"API Keys"** di sidebar
3. Klik **"Create API Key"**
4. Beri nama API key (contoh: "My SiTO Production")
5. Pilih permission: **"Full Access"** atau **"Sending Access"**
6. Klik **"Create"**
7. **PENTING:** Copy API key yang muncul (hanya ditampilkan sekali!)
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

### 3. (Opsional) Verify Domain

> **Note:** Untuk testing, Anda bisa skip langkah ini dan menggunakan `onboarding@resend.dev` sebagai sender email.

**Untuk Production dengan Domain Sendiri:**

1. Di Resend Dashboard, klik **"Domains"**
2. Klik **"Add Domain"**
3. Masukkan domain Anda (contoh: `yourdomain.com`)
4. Resend akan memberikan DNS records yang perlu ditambahkan:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **DMARC Record** (TXT)
5. Tambahkan DNS records tersebut di domain provider Anda:
   - Cloudflare
   - Namecheap
   - GoDaddy
   - dll.
6. Tunggu propagasi DNS (bisa 5 menit - 24 jam)
7. Klik **"Verify"** di Resend Dashboard

### 4. Configure Environment Variables

1. Buka file `.env` di project Anda
2. Tambahkan environment variables:

```env
# Resend Email Service
RESEND_API_KEY="re_your_actual_api_key_here"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
```

**Untuk Testing (tanpa domain):**

```env
RESEND_API_KEY="re_your_actual_api_key_here"
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

3. **JANGAN** commit file `.env` ke Git!
4. Pastikan `.env` ada di `.gitignore`

### 5. Test Email Sending

**Development Mode (Console Log):**

```bash
npm run dev
# Email akan ditampilkan di terminal, tidak dikirim via Resend
```

**Production Mode (Resend):**

```bash
NODE_ENV=production npm run dev
# Email akan dikirim via Resend
```

---

## 🧪 Testing

### Test Forgot Password Flow

1. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

2. Buka browser: `http://localhost:3000/auth`

3. Klik **"Forgot password?"**

4. Masukkan email yang terdaftar

5. Klik **"Send Reset Link"**

6. **Development Mode:**

   - Check terminal untuk melihat email content
   - Copy reset link dari terminal

7. **Production Mode:**

   - Check inbox email Anda
   - Klik link di email atau copy ke browser

8. Masukkan password baru

9. Klik **"Reset Password"**

10. Login dengan password baru

---

## 🔧 Troubleshooting

### ❌ Error: "Email service not configured"

**Penyebab:** `RESEND_API_KEY` tidak di-set atau invalid

**Solusi:**

1. Pastikan `.env` file ada di root project
2. Pastikan `RESEND_API_KEY` di-set dengan benar
3. Restart development server setelah update `.env`

### ❌ Error: "Failed to send email: Invalid API key"

**Penyebab:** API key salah atau expired

**Solusi:**

1. Generate API key baru di Resend Dashboard
2. Update `RESEND_API_KEY` di `.env`
3. Restart server

### ❌ Email tidak masuk ke inbox

**Kemungkinan Penyebab:**

1. **Email masuk ke Spam/Junk**

   - Check folder spam
   - Mark email sebagai "Not Spam"

2. **Domain belum di-verify**

   - Verify domain di Resend Dashboard
   - Atau gunakan `onboarding@resend.dev` untuk testing

3. **DNS records belum propagate**

   - Tunggu 24 jam untuk DNS propagation
   - Check DNS dengan tool: [whatsmydns.net](https://www.whatsmydns.net)

4. **Rate limit exceeded**
   - Free plan: 3,000 emails/bulan
   - Check usage di Resend Dashboard

### ❌ Error: "Domain not verified"

**Solusi:**

1. Gunakan `onboarding@resend.dev` untuk testing
2. Atau verify domain Anda di Resend Dashboard

---

## 📊 Monitoring

### Check Email Logs

1. Login ke [Resend Dashboard](https://resend.com/overview)
2. Klik **"Logs"** di sidebar
3. Lihat status email:
   - ✅ **Delivered** - Email berhasil terkirim
   - ⏳ **Queued** - Email dalam antrian
   - ❌ **Failed** - Email gagal terkirim

### Check API Usage

1. Di Resend Dashboard, klik **"Usage"**
2. Monitor:
   - Total emails sent
   - API calls
   - Remaining quota

---

## 🔐 Security Best Practices

1. **Jangan commit API key ke Git**

   - Selalu gunakan environment variables
   - Add `.env` ke `.gitignore`

2. **Rotate API keys secara berkala**

   - Generate API key baru setiap 3-6 bulan
   - Delete API key lama setelah migration

3. **Use different API keys untuk environment berbeda**

   - Development API key
   - Staging API key
   - Production API key

4. **Monitor email logs**
   - Check untuk suspicious activity
   - Set up alerts di Resend Dashboard

---

## 💰 Pricing

**Free Plan:**

- 3,000 emails/bulan
- 100 emails/hari
- Unlimited domains
- Email logs (30 hari)

**Pro Plan ($20/bulan):**

- 50,000 emails/bulan
- Unlimited emails/hari
- Email logs (90 hari)
- Priority support

**Enterprise:**

- Custom volume
- Dedicated IP
- SLA
- Custom pricing

---

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Resend Status Page](https://status.resend.com)
- [Resend Community](https://resend.com/community)

---

## ✅ Checklist

- [ ] Daftar akun Resend
- [ ] Generate API key
- [ ] (Opsional) Verify domain
- [ ] Add `RESEND_API_KEY` ke `.env`
- [ ] Add `RESEND_FROM_EMAIL` ke `.env`
- [ ] Test forgot password flow
- [ ] Verify email terkirim ke inbox
- [ ] Test reset password dengan link dari email
- [ ] Monitor email logs di Resend Dashboard

---

**Selamat! 🎉** Email service Anda sudah siap untuk production!
