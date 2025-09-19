describe("Response Sukses", () => {
  const response = require("../../src/utils/response");
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Harus mengirim response sukses dengan data", () => {
    const data = { id: 1, name: "Test" };
    const statusCode = 200;
    const message = "Operasi berhasil";
    response.responseSuccess(res, statusCode, message, data);
    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message,
      data,
    });
  });
  it("Harus mengirim response sukses tanpa data", () => {
    const statusCode = 200;
    const message = "Operasi berhasil";
    response.responseSuccess(res, statusCode, message);
    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message,
      data: null,
    });
  });

  it("Harus mengirim response sukses dengan nilai default", () => {
    response.responseSuccess(res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Success",
      data: null,
    });
  });
});

describe("Response Error", () => {
  const response = require("../../src/utils/response");
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Harus mengirim response error dengan pesan dan kode status khusus", () => {
    const statusCode = 400;
    const message = "Permintaan tidak valid";
    response.responseError(res, message, statusCode);
    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message,
    });
  });
  it("Harus mengirim response error dengan nilai default", () => {
    response.responseError(res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Error",
    });
  });
});
