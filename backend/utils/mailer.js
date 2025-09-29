import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (to, order) => {
  try {
   
    await transporter.sendMail({
      from: `"Book Store" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Order Confirmation - Book Store",
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Your order for <strong>${order.book.name}</strong> has been confirmed.</p>
        <p><b>Price:</b> ₹${order.amount}</p>
        <p><b>Status:</b> ${order.status}</p>
        <p>We’ll send your book or provide download access shortly.</p>
      `,
    });
    console.log("✅ Confirmation email sent to", to);
    return true;
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    return false;
  }
};

export const sendFreeBookEmail = async (to, book) => {
  try {
    await transporter.sendMail({
      from: `"Book Store" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Your Free Book: ${book.name}`,
      html: `
        <h2>Enjoy your free book!</h2>
        <p>You can download <strong>${book.name}</strong> using the link below:</p>
        <p><a href="${book.downloadUrl}" target="_blank">Download your book</a></p>
        <p>Happy Reading! 📚</p>
      `,
    });
    console.log(" Free book email sent to", to);
    return true;
  } catch (err) {
    console.error(" Free book email send error:", err.message);
    return false;
  }
};
