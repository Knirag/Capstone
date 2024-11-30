const formatPhoneNumber = (phone) => {
  if (!phone.startsWith("+")) {
    phone = `${phone}`;
  }
  return phone;
};

module.exports = { formatPhoneNumber };
