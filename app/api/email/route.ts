import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define the expected shape of the request data
interface ContactFormData {
  email: string;
  name: string;
  message: string;
  subject?: string;
}

export async function POST(request: Request) {
  try {
    // Log the raw request
    console.log("Raw request received");

    const body = await request.json();
    console.log("Parsed request body:", body);

    // Validate that body is an object
    if (Array.isArray(body)) {
      console.error("Received array instead of object:", body);
      return Response.json(
        { error: "Invalid data format. Expected an object." },
        { status: 400 }
      );
    }

    // Type check the body
    const formData = body as ContactFormData;

    // Validate required fields
    if (!formData.email || !formData.name || !formData.message) {
      console.error("Missing required fields in:", formData);
      return Response.json(
        {
          error: "Missing required fields",
          received: formData,
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!formData.email.includes("@")) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    console.log("Processing email with data:", formData);

    const recipient = process.env.CONTACT_TO_EMAIL || "tahaslco@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [recipient],
      replyTo: formData.email,
      subject: `New contact from ${formData.name}${
        formData.subject ? ` — ${formData.subject}` : ""
      }`,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 8px;">New Contact Form Submission</h2>
          <p style="margin: 0 0 6px;"><strong>Name:</strong> ${
            formData.name
          }</p>
          <p style="margin: 0 0 6px;"><strong>Email:</strong> ${
            formData.email
          }</p>
          <p style="margin: 0 0 12px;"><strong>Subject:</strong> ${
            formData.subject ?? "—"
          }</p>
          <p style="margin: 0 0 4px;"><strong>Message:</strong></p>
          <div style="white-space: pre-wrap;">${formData.message}</div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Request processing error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
