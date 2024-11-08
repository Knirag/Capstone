const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0]; // Example: YYYY-MM-DD format
};

module.exports = { formatDate };
