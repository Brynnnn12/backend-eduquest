jest.mock("../../src/config/mailer", () => ({
  sendMail: jest.fn().mockResolvedValue({ messageId: "test-message-id" }),
}));

const sendEmail = require("../../src/utils/sendEmail");

describe("sendEmail", () => {
  it("Harus mengirim email dengan benar jika konfigurasi tersedia", async () => {
    process.env.MAIL_USERNAME = "user";
    process.env.MAIL_PASSWORD = "pass";
    process.env.MAIL_FROM = "no-reply@example.com";

    const result = await sendEmail.sendEmail({
      to: "test@example.com",
      subject: "Test Subject",
      text: "Test Text",
      html: "<b>Test HTML</b>",
    });

    expect(result).toHaveProperty("messageId", "test-message-id");
  });

  it("Harus fallback ke log jika konfigurasi tidak tersedia", async () => {
    process.env.MAIL_USERNAME = "";
    process.env.MAIL_PASSWORD = "";

    const result = await sendEmail.sendEmail({
      to: "test@example.com",
      subject: "Test Subject",
      text: "Test Text",
    });

    expect(result.messageId).toMatch(/^test-email-/);
  });
});
