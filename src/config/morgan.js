const morgan = require("morgan");

/**
 * Custom morgan format untuk development
 * Contoh output:
 * 📅 2023-03-15 12:00:00 | ✅ 200 | 🔗 GET /api/users | ⏱️  100ms | 💻 127.0.0.1 | 🌐 Mozilla/5.0
 * 📅 2023-03-15 12:00:01 | ❌ 500 | 🔗 POST /api/login | ⏱️  250ms | 💻 127.0.0.1 | 🌐 Mozilla/5.0
 * 📅 2023-03-15 12:00:02 | ⚠️ 404 | 🔗 GET /api/unknown | ⏱️  50ms | 💻 127.0.0.1 | 🌐 Mozilla/5.0
 * 📅 2023-03-15 12:00:03 | 🔄 302 | 🔗 GET /api/redirect | ⏱️  30ms | 💻 127.0.0.1 | 🌐 Mozilla/5.0
 * 📅 2023-03-15 12:00:04 | ✅ 201 | 🔗 POST /api/users | ⏱️  120ms | 💻 127.0.0.1 | 🌐 Mozilla/5.0
 * 📅 2023-03-15 12:00:05 | ✅ 204 | 🔗 DELETE /api/users/1 | ⏱️  80ms | 💻 127.0.0.1 | 🌐 Mozilla/5.0
 */
const customFormat = (tokens, req, res) => {
  const status = tokens.status(req, res);
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const responseTime = tokens["response-time"](req, res);
  const date = tokens.date(req, res, "iso");
  const userAgent = req.headers["user-agent"] || "Unknown";

  /**
   * Pilih ikon berdasarkan status code
   * ✅ 2xx
   * ⚠️ 4xx
   * ❌ 5xx
   * 🔄 3xx
   * 🟡 1xx
   */
  let statusIcon = "✅";
  if (status >= 500) statusIcon = "❌";
  else if (status >= 400) statusIcon = "⚠️";
  else if (status >= 300) statusIcon = "🔄";

  /**
   * Potong user agent jika terlalu panjang
   * Contoh: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
   * Menjadi: "Mozilla/5.0 (Windows NT 10.0..."
   */
  const shortUA =
    userAgent.length > 30 ? userAgent.substring(0, 30) + "..." : userAgent;

  return [
    `📅 ${date.replace("T", " ").replace("Z", "")}`,
    `${statusIcon} ${status}`,
    `🔗 ${method.padEnd(4)} ${url}`,
    `⏱️  ${responseTime}ms`,
    `💻 ${req.ip}`,
    `🌐 ${shortUA}`,
  ].join(" | ");
};

/**
 * Simple format untuk production
 * Contoh output:
 * POST /api/auth/login 200 15.2 ms - ::1
 * GET /api/profile 401 3.1 ms - ::1
 * DELETE /api/users/1 204 8.5 ms - ::1
 * PUT /api/users/1 200 12.3 ms - ::1
 * GET /api/unknown 404 2.1 ms - ::1
 * POST /api/users 201 20.4 ms - ::1
 */
const simpleFormat = ":method :url :status :response-time ms - :remote-addr";

/**
 * Pilih format berdasarkan environment
 * - development: customFormat
 * - production: simpleFormat
 * - lainnya: customFormat
 * - testing: customFormat
 * - production: simpleFormat
 */
const logFormat =
  process.env.NODE_ENV === "production" ? simpleFormat : customFormat;

const morganMiddleware = morgan(logFormat);

module.exports = morganMiddleware;
