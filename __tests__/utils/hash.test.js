const hash = require("../../src/utils/hashing");

describe("Layanan Hashing", () => {
  const password = "passwordRahasia";
  let hashedPassword;

  it("Harus meng-hash password", async () => {
    hashedPassword = await hash.hashPassword(password);
    expect(typeof hashedPassword).toBe("string");
    expect(hashedPassword).not.toBe(password);
  });

  it("Harus membandingkan password dengan hash yang benar", async () => {
    const isMatch = await hash.comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it("Harus mengembalikan false untuk password yang salah", async () => {
    const isMatch = await hash.comparePassword("passwordSalah", hashedPassword);
    expect(isMatch).toBe(false);
  });
});
