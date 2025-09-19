const transporter = require("../config/mailer");

/**
 * Kirim email
 * @param {Object} options
 * @param {string} options.to - Email tujuan
 * @param {string} options.subject - Subjek email
 * @param {string} [options.text] - Isi email versi text
 * @param {string} [options.html] - Isi email versi HTML
 */
exports.sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Jika tidak ada konfigurasi email atau transporter null, hanya log saja
    if (
      !transporter ||
      !process.env.MAIL_USERNAME ||
      !process.env.MAIL_PASSWORD
    ) {
      console.log("⚠️ Email configuration not set. Email content:");
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Text: ${text}`);
      if (html) console.log(`HTML: ${html}`);
      return { messageId: "test-email-" + Date.now() };
    }

    const info = await transporter.sendMail({
      from: `"No Reply" <${process.env.MAIL_FROM || "no-reply@example.com"}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);

    // Jika error karena kredensial, log pesan yang lebih user-friendly
    if (
      error.message.includes("Invalid credentials") ||
      error.message.includes("535")
    ) {
      console.log(
        "⚠️ Email credentials invalid. Falling back to console logging:"
      );
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Text: ${text}`);
      if (html) console.log(`HTML: ${html}`);
      return { messageId: "fallback-email-" + Date.now() };
    }

    throw error;
  }
};
