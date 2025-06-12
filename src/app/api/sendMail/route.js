import nodemailer from "nodemailer";
export const runtime = "nodejs";

export async function POST(req) {
  const { email, orderId, selectedTickets, event } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"SMK Events" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Tak for din tilmelding!",
      html: `<h2>Du er tilmeldt!</h2>  <h4>Tusind tak for din tilmelding til ${event.title} d. ${event.date}! <br/> <br/> Antal tilmeldte: <strong>${selectedTickets}</strong> <br/> Billetnummer: <strong>${orderId}</strong> <br/> <br/> Vi glæder os til at se dig på ${event.location?.address}</h4>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mailfejl:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
