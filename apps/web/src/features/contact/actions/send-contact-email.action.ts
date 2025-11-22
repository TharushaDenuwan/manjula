"use server";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // For now, we'll send an email using a fetch to an API route
    // This will need to be configured with your email service
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'tharushadenuwan35@gmail.com',
        subject: `Neue Kontaktanfrage von ${data.name}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>E-Mail:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
          Neue Kontaktanfrage

          Name: ${data.name}
          E-Mail: ${data.email}
          Telefon: ${data.phone}

          Nachricht:
          ${data.message}
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email. Please try again.');
  }
}
