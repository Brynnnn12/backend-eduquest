const jwtService = require("../../src/utils/generateToken");
const { access, refresh } = require("../../src/config/jwt");

describe("Layanan JWT", () => {
  const payload = { id: 1, email: "test@example.com" };
  let accessToken, refreshToken;

  it("Harus menghasilkan access token", () => {
    accessToken = jwtService.generateAccessToken(payload);
    expect(typeof accessToken).toBe("string");
    expect(accessToken.length).toBeGreaterThan(0);
  });

  it("Harus memverifikasi access token yang valid", () => {
    const decoded = jwtService.verifyAccessToken(accessToken);
    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
  });

  it("Harus mengembalikan null untuk access token yang salah", () => {
    const decoded = jwtService.verifyAccessToken("token_salah");
    expect(decoded).toBeNull();
  });

  it("Harus menghasilkan refresh token", () => {
    refreshToken = jwtService.generateRefreshToken(payload.id);
    expect(typeof refreshToken).toBe("string");
    expect(refreshToken.length).toBeGreaterThan(0);
  });

  it("Harus memverifikasi refresh token yang valid", () => {
    const decoded = jwtService.verifyRefreshToken(refreshToken);
    expect(decoded.userId).toBe(payload.id);
  });

  it("Harus mengembalikan null untuk refresh token yang salah ", () => {
    const decoded = jwtService.verifyRefreshToken("token_salah");
    expect(decoded).toBeNull();
  });

  it("Harus bisa decode token tanpa verifikasi", () => {
    const decoded = jwtService.decodeToken(accessToken);
    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
  });
});
