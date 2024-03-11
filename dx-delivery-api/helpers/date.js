const formatedDate = (date) => {
  const currentDate = new Date(date);
  const currentDateString = currentDate.toLocaleDateString("es-ES");
  return currentDateString;
};

const shippingDateFormat = "YYYY-MM-DDTHH:mm:ss";

module.exports = { formatedDate, shippingDateFormat };
