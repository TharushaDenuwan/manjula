import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingDetails {
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  paymentSlip?: string;
}

export async function sendBookingConfirmation({
  customerName,
  customerEmail,
  bookingDate,
  startTime,
  endTime,
}: BookingDetails) {
  if (!customerEmail) return;

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const fromName = process.env.RESEND_FROM_NAME || 'Manjula Ayurveda';
    const fromAddress = fromEmail.includes('@') && !fromEmail.includes('<')
      ? `${fromName} <${fromEmail}>`
      : fromEmail;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_CLIENT_APP_URL || 'http://localhost:3000';
    const logoUrl = `${baseUrl}/assets/logo.png`;

    // Format date for display
    const formattedDate = new Date(bookingDate).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Buchungsbestätigung</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(to bottom right, #D4AF37, #E6C45A); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="AYURVEDA by Manjula" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h1 style="color: #0F172A; font-size: 28px; font-weight: bold; margin: 0 0 10px 0; text-align: center;">
                      Buchungsbestätigung
                    </h1>
                    <div style="width: 60px; height: 3px; background: linear-gradient(to right, transparent, #D4AF37, transparent); margin: 20px auto 30px;"></div>

                    <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                      Hallo ${customerName},
                    </p>

                    <div style="background-color: #F0FDF4; border-left: 4px solid #22C55E; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                      <p style="color: #166534; font-size: 16px; font-weight: 600; margin: 0;">
                        Ihre erste Zahlung wurde erfolgreich empfangen und Ihr Termin wurde fest für Sie gebucht.
                      </p>
                    </div>

                    <div style="background-color: #FAF9F6; border: 1px solid #E5E7EB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                      <h2 style="color: #0F172A; font-size: 18px; font-weight: 700; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                        Termindetails
                      </h2>

                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="100" style="color: #64748B; font-size: 14px; padding-bottom: 8px;">Datum:</td>
                          <td style="color: #0F172A; font-size: 16px; font-weight: 600; padding-bottom: 8px;">${formattedDate}</td>
                        </tr>
                        <tr>
                          <td style="color: #64748B; font-size: 14px; padding-bottom: 8px;">Zeit:</td>
                          <td style="color: #0F172A; font-size: 16px; font-weight: 600; padding-bottom: 8px;">${startTime} - ${endTime} Uhr</td>
                        </tr>
                      </table>
                    </div>

                    <p style="color: #64748B; font-size: 14px; line-height: 1.6; margin-top: 30px;">
                      Bitte beachten Sie unsere Stornierungsbedingungen. Wir freuen uns darauf, Sie bald begrüßen zu dürfen!
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #0F172A; padding: 30px 40px; text-align: center;">
                    <p style="color: #D4AF37; font-size: 14px; font-weight: 600; margin: 0 0 10px 0;">
                      Ayurveda-Massage-Praxis „Manjula"
                    </p>
                    <p style="color: #999999; font-size: 12px; margin: 5px 0;">
                      Großpesendorf 41, 8211 Ilztal, Österreich
                    </p>
                    <p style="color: #999999; font-size: 12px; margin: 5px 0;">
                      <a href="mailto:relax@manjula.at" style="color: #D4AF37; text-decoration: none;">relax@manjula.at</a> |
                      <a href="tel:+4366488653430" style="color: #D4AF37; text-decoration: none;">+43 664 88 65 34 30</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: fromAddress,
      to: customerEmail,
      subject: "Buchungsbestätigung - Ayurveda by Manjula",
      html: emailHtml,
      text: `
        Hallo ${customerName},

        Ihre erste Zahlung wurde erfolgreich empfangen und Ihr Termin wurde fest für Sie gebucht.

        Termindetails:
        Datum: ${formattedDate}
        Zeit: ${startTime} - ${endTime} Uhr

        Wir freuen uns darauf, Sie bald begrüßen zu dürfen!

        Ayurveda-Massage-Praxis „Manjula"
        Großpesendorf 41, 8211 Ilztal, Österreich
        relax@manjula.at | +43 664 88 65 34 30
      `,
    });
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
  }
}
