import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, to } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    const recipientEmail = to || "tharushadenuwan35@gmail.com";

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "E-Mail-Service nicht konfiguriert" },
        { status: 500 }
      );
    }

    // Get the base URL for logo
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_CLIENT_APP_URL ||
      "http://localhost:3000";
    const logoUrl = `${baseUrl}/assets/logo.png`;

    // Beautiful email template
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Neue Kontaktanfrage</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

                <!-- Header with Logo -->
                <tr>
                  <td style="background: linear-gradient(to bottom right, #D4AF37, #E6C45A); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="AYURVEDA by Manjula" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h1 style="color: #0F172A; font-size: 28px; font-weight: bold; margin: 0 0 10px 0; text-align: center;">
                      Neue Kontaktanfrage
                    </h1>
                    <div style="width: 60px; height: 3px; background: linear-gradient(to right, transparent, #D4AF37, transparent); margin: 20px auto 30px;"></div>

                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="120" style="color: #666666; font-size: 14px; font-weight: 600; vertical-align: top;">
                                Name:
                              </td>
                              <td style="color: #0F172A; font-size: 16px; font-weight: 500;">
                                ${name}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="120" style="color: #666666; font-size: 14px; font-weight: 600; vertical-align: top;">
                                E-Mail:
                              </td>
                              <td style="color: #0F172A; font-size: 16px;">
                                <a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="120" style="color: #666666; font-size: 14px; font-weight: 600; vertical-align: top;">
                                Telefon:
                              </td>
                              <td style="color: #0F172A; font-size: 16px;">
                                <a href="tel:${phone}" style="color: #D4AF37; text-decoration: none;">${phone}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Message Section -->
                    <div style="background-color: #FAF9F6; border-left: 4px solid #D4AF37; padding: 20px; border-radius: 8px; margin-top: 30px;">
                      <p style="color: #666666; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                        Nachricht:
                      </p>
                      <p style="color: #0F172A; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
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

    // Send email using Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const fromName = process.env.RESEND_FROM_NAME || "Manjula Ayurveda";
    const fromAddress =
      fromEmail.includes("@") && !fromEmail.includes("<")
        ? `${fromName} <${fromEmail}>`
        : fromEmail;

    console.log("\n📧 === SENDING CONTACT EMAIL ===");
    console.log("From:", fromAddress);
    console.log("To:", recipientEmail);
    console.log("Reply-To:", email);
    console.log("Customer:", name);

    const emailResult = await resend.emails.send({
      from: fromAddress,
      to: recipientEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: emailHtml,
      text: `
        Neue Kontaktanfrage - AYURVEDA by Manjula

        Name: ${name}
        E-Mail: ${email}
        Telefon: ${phone}

        Nachricht:
        ${message}

        ---
        Ayurveda-Massage-Praxis „Manjula"
        Großpesendorf 41, 8211 Ilztal, Österreich
        relax@manjula.at | +43 664 88 65 34 30
      `,
    });

    // Check for errors from Resend
    if (emailResult.error) {
      console.error("❌ Resend API Error:", emailResult.error);
      throw new Error(emailResult.error.message || "Email sending failed");
    }

    console.log("✅ Contact email sent successfully!");
    console.log("Email ID:", emailResult.data?.id);
    console.log("Sent to:", recipientEmail);
    console.log("=== EMAIL SENT SUCCESSFULLY ===");

    return NextResponse.json({
      success: true,
      message: "Nachricht erfolgreich gesendet",
      emailId: emailResult.data?.id,
    });
  } catch (error) {
    console.error("\n❌ === ERROR SENDING CONTACT EMAIL ===");
    console.error("Error:", error);

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }

    // Log configuration for debugging
    console.error("\n🔧 Configuration:");
    console.error(
      "- RESEND_API_KEY:",
      process.env.RESEND_API_KEY ? "✓ Set" : "✗ Missing"
    );
    console.error(
      "- RESEND_FROM_EMAIL:",
      process.env.RESEND_FROM_EMAIL || "Not set (using default)"
    );
    console.error("=== ERROR END ===");

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Fehler beim Senden der Nachricht",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
