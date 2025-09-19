const { Op } = require("sequelize");

/**
 * Utility untuk pagination
 * @param {Object} query - Query params dari request (req.query)
 * @returns {Object} - { page, limit, offset }
 */
function getPagination(query) {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Utility untuk filtering
 * @param {Object} query - Query params dari request (req.query)
 * @param {Array} allowedFilters - Array of allowed filter keys (e.g., ['name', 'email'])
 * @returns {Object} - Where clause untuk Sequelize
 */
function getFiltering(query, allowedFilters = []) {
  const where = {};
  allowedFilters.forEach((key) => {
    if (query[key]) {
      where[key] = { [Op.iLike]: `%${query[key]}%` }; // Case-insensitive search, ganti jika perlu
    }
  });
  return where;
}

/**
 * Utility untuk sorting
 * @param {Object} query - Query params dari request (req.query)
 * @param {Array} allowedSorts - Array of allowed sort keys (e.g., ['name', 'created_at'])
 * @returns {Array} - Order clause untuk Sequelize
 */
function getSorting(query, allowedSorts = []) {
  const order = [];
  if (query.sort && allowedSorts.includes(query.sort)) {
    const direction = query.order === "desc" ? "DESC" : "ASC";
    order.push([query.sort, direction]);
  }
  return order;
}

module.exports = {
  getPagination,
  getFiltering,
  getSorting,
};
