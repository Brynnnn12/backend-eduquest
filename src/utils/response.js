/**
 * untuk mengirim response sukses
 * statusCode itu kode status http, default 200
 * message itu pesan suksesnya, default "Success"
 * data itu data yang mau dikirim, optional
 * untuk mengirim response error
 */

exports.responseSuccess = (
  res,
  statusCode = 200,
  message = "Success",
  data = null
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

/**
 * untuk mengirim response error
 * statusCode itu kode status http, default 500
 * message itu pesan errornya, default "Error"
 */
exports.responseError = (res, message = "Error", statusCode = 500) => {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};
