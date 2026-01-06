# Email Configuration Issue - Booking Confirmations

## Problem

Booking confirmation emails are only being sent to `tharushadenuwan35@gmail.com` and not to other email addresses that users enter.

## Root Cause

**Resend is running in sandbox/development mode**, which restricts email sending to only verified email addresses. This is a security feature to prevent spam during development.

## Solutions

### Solution 1: Verify Your Domain (Recommended for Production) ✅

This is the best solution for a production environment.

1. **Go to Resend Dashboard**

   - Visit [resend.com/domains](https://resend.com/domains)
   - Log in with your account

2. **Add Your Domain**

   - Click "Add Domain"
   - Enter your domain (e.g., `manjula.at`)
   - Follow the DNS configuration instructions

3. **Update DNS Records**

   Add these exact DNS records to your domain registrar (e.g., HostProfis, Cloudflare, GoDaddy):

   **DKIM Record (Required)**

   - Type: `TXT`
   - Name: `resend._domainkey`
   - Content: `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEcA+6Ifr+pdu1qF6/lb7v3QQ6RSXXjKhu0Eyb3IAijxDrrV0DfidaYhZDPbyqHZX+e1m1ETeciIRpetn9WRDFXAPQZldMNrz83+wv0ugweWAv5mHksoMjFFJubXnDJ3TgCuvWQzzErRPqE+uIf4RwayEJpYaaFD2zTv8CtsbJWQIDAQAB`
   - TTL: `Auto` or `3600`

   **SPF Record for Sending (Required)**

   - Type: `MX`
   - Name: `send`
   - Content: `feedback-smtp.ap-northeast-1.amazonses.com`
   - TTL: `3600`
   - Priority: `10`

   - Type: `TXT`
   - Name: `send`
   - Content: `v=spf1 include:amazonses.com ~all`
   - TTL: `3600`

   **DMARC Record (Optional but Recommended)**

   - Type: `TXT`
   - Name: `_dmarc`
   - Content: `v=DMARC1; p=none;`
   - TTL: `Auto` or `3600`

   **MX Record for Receiving (Optional)**

   - Type: `MX`
   - Name: `@`
   - Content: `inbound-smtp.ap-northeast-1.amazonaws.com`
   - TTL: `3600`
   - Priority: `9`

4. **Wait for Verification**

   - Verification usually takes a few minutes to 24 hours
   - You'll receive an email when verification is complete

5. **Update Environment Variable**

   ```env
   RESEND_FROM_EMAIL=noreply@manjula.at
   # or
   RESEND_FROM_EMAIL=booking@manjula.at
   ```

6. **Restart Your Application**
   ```bash
   # Stop the dev server and restart
   npm run dev
   # or
   pnpm dev
   ```

### Solution 2: Add Individual Email Addresses for Testing (Development Only)

If you're still in development and need to test with specific email addresses:

1. **Go to Resend Dashboard**

   - Visit [resend.com/settings](https://resend.com/settings)

2. **Add Test Recipients**

   - Look for "Test Mode" or "Verified Recipients"
   - Add the email addresses you want to test with

3. **Verify Each Email**
   - Each recipient will receive a verification email
   - They must click the verification link

**Note:** This is only for development. In production, you should verify your domain.

### Solution 3: Use a Different Email Service

If you prefer not to use Resend or need immediate functionality:

1. **Consider alternatives:**

   - SendGrid
   - Mailgun
   - AWS SES
   - Postmark

2. **Update the email sending code** in:
   - `apps/web/src/features/calendar/actions/send-booking-confirmation.ts`

## Checking Your Current Setup

### Check if Domain is Verified

1. Log in to [Resend Dashboard](https://resend.com)
2. Go to "Domains"
3. Check the status of your domains

### Check Environment Variables

Make sure these are set in your `.env` or `.env.local` file:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=your-verified-email@yourdomain.com
RESEND_FROM_NAME=Manjula Ayurveda
```

### Check Server Logs

After the recent updates, you'll see detailed logs when emails are sent:

```
✅ Booking confirmation email sent successfully to: user@example.com
```

Or if there's an error:

```
❌ Error sending booking confirmation email: [error details]
⚠️  RESEND SANDBOX MODE DETECTED: Only verified email addresses can receive emails.
```

## Testing

1. **Test with a verified email** (e.g., `tharushadenuwan35@gmail.com`):

   - Should work ✅

2. **Test with an unverified email** (any other email):

   - Will fail if domain is not verified ❌
   - Check server logs for error details

3. **After domain verification**:
   - All emails should work ✅

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Domain Verification Guide](https://resend.com/docs/dashboard/domains/introduction)
- [SPF, DKIM, DMARC Explained](https://resend.com/docs/dashboard/domains/spf-dkim-dmarc)

## Support

If you continue to experience issues:

1. Check the server console logs for detailed error messages
2. Verify your Resend API key is correct and active
3. Ensure your domain DNS records are properly configured
4. Contact Resend support if domain verification fails

## Files Modified

The following files have been updated with better error logging:

- `apps/web/src/features/calendar/actions/send-booking-confirmation.ts`
- `apps/web/src/features/calendar/actions/add-calendar.action.ts`

These will now provide detailed logs about email sending success/failure.

---

## Step-by-Step Guide: Adding DNS Records to Your Domain

### Step 1: Access Your Domain Provider's DNS Management

1. Log in to your domain registrar (where you purchased `manjula.at`)
   - Common providers: HostProfis, Cloudflare, GoDaddy, Namecheap, etc.
2. Navigate to DNS Management / DNS Settings / Zone Editor
3. Look for options to "Add Record" or "Add DNS Record"

### Step 2: Add Each DNS Record

#### Record 1: DKIM (Authentication)

```
Type:      TXT
Name:      resend._domainkey
Value:     p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEcA+6Ifr+pdu1qF6/lb7v3QQ6RSXXjKhu0Eyb3IAijxDrrV0DfidaYhZDPbyqHZX+e1m1ETeciIRpetn9WRDFXAPQZldMNrz83+wv0ugweWAv5mHksoMjFFJubXnDJ3TgCuvWQzzErRPqE+uIf4RwayEJpYaaFD2zTv8CtsbJWQIDAQAB
TTL:       Auto (or 3600)
```

#### Record 2: MX Record for Sending

```
Type:      MX
Name:      send
Value:     feedback-smtp.ap-northeast-1.amazonses.com
TTL:       3600
Priority:  10
```

#### Record 3: SPF TXT Record

```
Type:      TXT
Name:      send
Value:     v=spf1 include:amazonses.com ~all
TTL:       3600
```

#### Record 4: DMARC (Optional but Recommended)

```
Type:      TXT
Name:      _dmarc
Value:     v=DMARC1; p=none;
TTL:       Auto (or 3600)
```

#### Record 5: MX Record for Receiving (Only if you want to receive emails)

```
Type:      MX
Name:      @ (or leave blank for root domain)
Value:     inbound-smtp.ap-northeast-1.amazonaws.com
TTL:       3600
Priority:  9
```

### Step 3: Important Notes

- **Full Domain Names**: Some DNS providers require you to enter the full domain name:

  - Instead of `resend._domainkey` → enter `resend._domainkey.manjula.at`
  - Instead of `send` → enter `send.manjula.at`
  - Instead of `_dmarc` → enter `_dmarc.manjula.at`
  - Instead of `@` → leave blank or enter `manjula.at`

- **Quotes**: If your DNS provider asks, the TXT record values should NOT include quotes

- **Propagation Time**: DNS changes can take 5 minutes to 48 hours to propagate globally

### Step 4: Verify in Resend Dashboard

1. Go to [resend.com/domains](https://resend.com/domains)
2. Your domain should show a "Verified" status once DNS records are detected
3. If not verified after a few hours, click "Verify" or "Check DNS" button

### Step 5: Update Your Environment Variables

Once verified, update your `.env` or `.env.local`:

```env
RESEND_FROM_EMAIL=noreply@manjula.at
# or
RESEND_FROM_EMAIL=booking@manjula.at
# or
RESEND_FROM_EMAIL=notifications@manjula.at
```

### Step 6: Test Email Sending

After verification:

1. Restart your application
2. Make a test booking with any email address
3. Check if the confirmation email is received

### Troubleshooting DNS Setup

**If verification fails:**

1. **Check DNS propagation**: Use [dnschecker.org](https://dnschecker.org) or [whatsmydns.net](https://www.whatsmydns.net)

   - Check TXT record for `resend._domainkey.manjula.at`

2. **Wait longer**: DNS can take up to 48 hours to fully propagate

3. **Double-check records**:

   - Ensure no typos in the values
   - Verify you're adding to the correct domain
   - Check that TTL values are reasonable (300-3600)

4. **Contact support**:
   - Resend support: [resend.com/support](https://resend.com/support)
   - Your domain provider's support

### Screenshot Guide

Most DNS providers have similar interfaces:

1. **Click**: "+ Add Record" or "Add DNS Record"
2. **Select Type**: Choose TXT or MX from dropdown
3. **Enter Name**: Copy exactly as shown above
4. **Enter Value/Content**: Copy the entire value (long text for DKIM)
5. **Set TTL**: Use Auto or 3600
6. **Set Priority**: Only for MX records (10 for send, 9 for receive)
7. **Click**: "Save" or "Add Record"
8. **Repeat**: For each record above
