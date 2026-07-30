import nodemailer from "nodemailer";

// Reads SMTP credentials from environment variables (see .env.local.example)
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for 587/25
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr) {
  try {
    const [h, m] = timeStr.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${m} ${suffix}`;
  } catch {
    return timeStr;
  }
}

// Email sent to the clinic/admin when a new appointment comes in
export async function sendAdminNotification(appointment) {
  const transporter = createTransporter();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #E1EBF2; border-radius: 12px;">
      <h2 style="color: #0B2E4E; margin-bottom: 4px;">New Appointment Request</h2>
      <p style="color: #4A5A6A; font-size: 14px; margin-top: 0;">A new appointment was just booked on SK Healthcare.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tbody>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Name</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${appointment.name}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Email</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${appointment.email}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Phone</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${appointment.phone}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Date</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${formatDate(appointment.date)}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Time</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${formatTime(appointment.time)}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A;">City / State</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${appointment.city}, ${appointment.state}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A; vertical-align:top;">Concern</td><td style="padding:8px 0; color:#0B2E4E;">${appointment.disease}</td></tr>
        </tbody>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"SK Healthcare Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: appointment.email,
    subject: `New Appointment: ${appointment.name} - ${formatDate(appointment.date)}`,
    html,
  });
}

// Confirmation email sent to the customer after a successful order payment
export async function sendOrderConfirmation(order) {
  const transporter = createTransporter();

  const itemsHtml = order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0; color:#0B2E4E;">${i.name} × ${i.qty}</td>
        <td style="padding:8px 0; text-align:right; color:#0B2E4E;">₹${i.price * i.qty}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; border: 1px solid #E1EBF2; border-radius: 12px;">
      <h2 style="color: #0B2E4E; margin-bottom: 4px;">Order Confirmed</h2>
      <p style="color: #4A5A6A; font-size: 14px;">Hi ${order.customer.name}, thank you for your order from SK Healthcare.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr><td style="padding-top:10px; color:#4A5A6A;">Subtotal</td><td style="padding-top:10px; text-align:right; color:#0B2E4E;">₹${order.subtotal}</td></tr>
          <tr><td style="color:#4A5A6A;">Delivery Charge</td><td style="text-align:right; color:#0B2E4E;">₹${order.deliveryCharge}</td></tr>
          <tr><td style="font-weight:700; padding-top:6px; color:#0B2E4E;">Total Paid</td><td style="font-weight:700; text-align:right; padding-top:6px; color:#0B2E4E;">₹${order.total}</td></tr>
        </tfoot>
      </table>
      <p style="color: #4A5A6A; font-size: 13.5px;">Delivery Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}</p>
      <p style="color: #9AAAB8; font-size: 12px; margin-top: 20px;">Order ID: ${order._id}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"SK Healthcare" <${process.env.SMTP_USER}>`,
    to: order.customer.email,
    subject: "Your SK Healthcare Order is Confirmed",
    html,
  });
}

// Notification sent to the clinic/admin about a new paid order
export async function sendAdminOrderNotification(order) {
  const transporter = createTransporter();

  const itemsText = order.items.map((i) => `${i.name} × ${i.qty}`).join(", ");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #E1EBF2; border-radius: 12px;">
      <h2 style="color: #0B2E4E;">New Paid Order</h2>
      <p style="color:#4A5A6A; font-size:14px;">${order.customer.name} — ${order.customer.phone}</p>
      <p style="color:#0B2E4E; font-size:14px;">${itemsText}</p>
      <p style="color:#0B2E4E; font-weight:700;">Total: ₹${order.total}</p>
      <p style="color:#4A5A6A; font-size:13px;">${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"SK Healthcare Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order: ₹${order.total} from ${order.customer.name}`,
    html,
  });
}
export async function sendPatientConfirmation(appointment) {
  const transporter = createTransporter();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; border: 1px solid #E1EBF2; border-radius: 12px;">
      <h2 style="color: #0B2E4E; margin-bottom: 4px;">Your Appointment Request is Received</h2>
      <p style="color: #4A5A6A; font-size: 14px; line-height: 1.6;">
        Hi ${appointment.name}, thank you for booking with SK Healthcare. Here are your requested details:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Date</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${formatDate(appointment.date)}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Time</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">${formatTime(appointment.time)}</td></tr>
          <tr><td style="padding:8px 0; color:#4A5A6A;">Location</td><td style="padding:8px 0; font-weight:600; color:#0B2E4E;">Dharuhera, Haryana</td></tr>
        </tbody>
      </table>
      <p style="color: #4A5A6A; font-size: 14px; line-height: 1.6;">
        Our team will contact you shortly on <strong>${appointment.phone}</strong> to confirm your slot.
        All information you've shared is kept strictly confidential.
      </p>
      <p style="color: #9AAAB8; font-size: 12.5px; margin-top: 24px;">
        If you didn't request this appointment, you can safely ignore this email.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"SK Healthcare" <${process.env.SMTP_USER}>`,
    to: appointment.email,
    subject: "Your SK Healthcare Appointment Request",
    html,
  });
}