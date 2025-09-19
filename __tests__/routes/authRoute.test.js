const request = require("supertest");
const express = require("express");

// Mock authController
jest.mock("../../src/controllers/authController", () => ({
  register: jest.fn((req, res) =>
    res
      .status(201)
      .json({ status: "success", message: "User registered successfully" })
  ),
  login: jest.fn((req, res) =>
    res.status(200).json({ status: "success", message: "Login successful" })
  ),
  verifyEmail: jest.fn((req, res) =>
    res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" })
  ),
  logout: jest.fn((req, res) =>
    res.status(200).json({ status: "success", message: "Logout successful" })
  ),
  forgotPassword: jest.fn((req, res) =>
    res
      .status(200)
      .json({ status: "success", message: "Reset password email sent" })
  ),
  resetPassword: jest.fn((req, res) =>
    res
      .status(200)
      .json({ status: "success", message: "Password reset successful" })
  ),
  refreshToken: jest.fn((req, res) =>
    res.status(200).json({ status: "success", message: "Token refreshed" })
  ),
}));

// Mock authValidate
jest.mock("../../src/validators/authValidate", () => ({
  validateRegistration: [jest.fn((req, res, next) => next())],
  validateLogin: [jest.fn((req, res, next) => next())],
  validateForgotPassword: [jest.fn((req, res, next) => next())],
  validateResetPassword: [jest.fn((req, res, next) => next())],
  validateRefreshToken: [jest.fn((req, res, next) => next())],
}));

const authRoute = require("../../src/routes/authRoute");

const app = express();
app.use(express.json());
app.use("/auth", authRoute);

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "password123",
      };

      const response = await request(app).post("/auth/register").send(userData);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("User registered successfully");
    });
  });

  describe("POST /auth/login", () => {
    it("should login user successfully", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app).post("/auth/login").send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Login successful");
    });
  });

  describe("GET /auth/verify-email", () => {
    it("should verify email successfully", async () => {
      const response = await request(app)
        .get("/auth/verify-email")
        .query({ token: "verification-token" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Email verified successfully");
    });
  });

  describe("POST /auth/forgot-password", () => {
    it("should send forgot password email successfully", async () => {
      const forgotData = {
        email: "test@example.com",
      };

      const response = await request(app)
        .post("/auth/forgot-password")
        .send(forgotData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Reset password email sent");
    });
  });

  describe("POST /auth/reset-password", () => {
    it("should reset password successfully", async () => {
      const resetData = {
        token: "reset-token",
        password: "newpassword123",
        passwordConfirmation: "newpassword123",
      };

      const response = await request(app)
        .post("/auth/reset-password")
        .send(resetData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Password reset successful");
    });
  });

  describe("POST /auth/refresh-token", () => {
    it("should refresh token successfully", async () => {
      const refreshData = {
        refreshToken: "valid-refresh-token",
      };

      const response = await request(app)
        .post("/auth/refresh-token")
        .send(refreshData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Token refreshed");
    });
  });

  describe("POST /auth/logout", () => {
    it("should logout user successfully", async () => {
      const response = await request(app).post("/auth/logout");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Logout successful");
    });
  });
});
