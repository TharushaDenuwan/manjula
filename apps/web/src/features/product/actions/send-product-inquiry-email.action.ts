"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendProductInquiryEmailParams {
  name: string;
  email: string;
  telephone: string;
  address: string;
  productName: string;
  productDescription?: string | null;
  price?: string | null;
  quantity: number;
}

export async function sendProductInquiryEmail(
  params: SendProductInquiryEmailParams
) {
  try {
    const {
      name,
      email,
      telephone,
      address,
      productName,
      productDescription,
      price,
      quantity,
    } = params;

    // Email to admin/shop owner
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
          Neue Produktanfrage
        </h2>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0F172A; margin-top: 0;">Produktinformationen</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Produktname:</td>
              <td style="padding: 8px 0;">${productName}</td>
            </tr>
            ${
              productDescription
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Beschreibung:</td>
              <td style="padding: 8px 0;">${productDescription}</td>
            </tr>
            `
                : ""
            }
            ${
              price
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Preis:</td>
              <td style="padding: 8px 0; color: #D4AF37; font-weight: bold;">${price}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Gewünschte Anzahl:</td>
              <td style="padding: 8px 0; font-weight: bold;">${quantity}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0F172A; margin-top: 0;">Kundenkontaktdaten</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">E-Mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Telefon:</td>
              <td style="padding: 8px 0;"><a href="tel:${telephone}" style="color: #D4AF37; text-decoration: none;">${telephone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Adresse:</td>
              <td style="padding: 8px 0;">${address}</td>
            </tr>
          </table>
        </div>

        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          Diese E-Mail wurde über das Produktanfrage-Formular auf Ihrer Website gesendet.
        </p>
      </div>
    `;

    // Email to customer (confirmation)
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
          Vielen Dank für Ihre Anfrage!
        </h2>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Liebe/r ${name},
        </p>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          vielen Dank für Ihr Interesse an unserem Produkt. Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
        </p>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0F172A; margin-top: 0;">Ihre Anfrage im Überblick</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Produkt:</td>
              <td style="padding: 8px 0;">${productName}</td>
            </tr>
            ${
              price
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Preis:</td>
              <td style="padding: 8px 0; color: #D4AF37; font-weight: bold;">${price}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Menge:</td>
              <td style="padding: 8px 0;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Lieferadresse:</td>
              <td style="padding: 8px 0;">${address}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Bei Fragen können Sie uns jederzeit kontaktieren.
        </p>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Mit freundlichen Grüßen<br>
          <strong style="color: #D4AF37;">Ihr Manjula Team</strong>
        </p>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

        <p style="color: #999; font-size: 12px; text-align: center;">
          Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
        </p>
      </div>
    `;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@manjula.cloud";
    const adminEmails = [
      "tharushadenuwan35@gmail.com",
      "noreply@manjula.cloud",
    ];

    console.log("Sending emails for product inquiry:");
    console.log("- Admin emails to:", adminEmails.join(", "));
    console.log("- Customer email to:", email);

    // Send all emails in parallel and track results
    const emailPromises = [
      // Email to all admins (using 'to' as array)
      resend.emails.send({
        from: fromEmail,
        to: adminEmails,
        subject: `Neue Produktanfrage: ${productName}`,
        html: adminEmailContent,
      }),
      // Confirmation email to customer
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Bestätigung Ihrer Produktanfrage - Manjula",
        html: customerEmailContent,
        replyTo: "tharushadenuwan35@gmail.com",
      }),
    ];

    const results = await Promise.allSettled(emailPromises);

    // Log all results
    results.forEach((result, index) => {
      const type = index === 0 ? "Admin" : "Customer";
      const recipient = index === 0 ? adminEmails.join(", ") : email;

      if (result.status === "rejected") {
        console.error(
          `❌ ${type} email to ${recipient} FAILED:`,
          result.reason
        );
      } else {
        console.log(`✓ ${type} email to ${recipient} sent successfully`);
        if (result.status === "fulfilled" && result.value) {
          const emailId = result.value.data?.id;
          console.log(`  Email ID:`, emailId);
        }
      }
    });

    // Check if customer email was sent successfully
    const customerEmailResult = results[1];
    if (customerEmailResult.status === "rejected") {
      console.error(
        "⚠️ CUSTOMER EMAIL FAILED - Customer will not receive confirmation!"
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send product inquiry email:", error);
    return {
      success: false,
      error:
        "Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.",
    };
  }
}
