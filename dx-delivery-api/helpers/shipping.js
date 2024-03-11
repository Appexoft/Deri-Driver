const moment = require("moment");
const { shippingType } = require("../helpers/constants");

module.exports = {
  getShippingDates: (_shippingType, startDate) => {
    let _startDate = startDate || moment();
    if (_shippingType === shippingType.COMMON) {
      return {
        startDate: _startDate.toDate(),
        limitDate: _startDate.add(5, "days").toDate(),
      };
    } else {
      if (
        _shippingType === shippingType.EXPRESS ||
        _shippingType === shippingType.FLASH
      ) {
        return {
          startDate: _startDate.toDate(),
          limitDate: _startDate.add(1, "days").toDate(),
        };
      } else {
        return { startDate: _startDate.toDate(), limitDate: null };
      }
    }
  },
};
