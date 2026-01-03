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

   - Add the provided DNS records to your domain registrar:
     - SPF record
     - DKIM record
     - DMARC record (optional but recommended)

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
