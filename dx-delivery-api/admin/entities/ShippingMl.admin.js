const { ShippingMl } = require("../../models");

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    baseCostMl: {
      isRequired: true,
      isVisible: true,
      isTitle: true,
    },
    flex: {
      isVisible: true,
    },
    idMl: {
      isVisible: true,
    },
    deliveryTypeMl: {
      isVisible: true,
    },
    estimatedDeliveryMl: {
      isVisible: true,
    },
    estimatedDeliveryLimitMl: {
      isVisible: true,
    },
    shippingMethodMl: {
      isVisible: true,
    },
    logisticTypeMl: {
      isVisible: true,
    },
    statusMl: {
      isVisible: true,
    },
    subStatusMl: {
      isVisible: true,
    },
    siteMl: {
      isVisible: true,
    },
    modeMl: {
      isVisible: true,
    },
    clientMl: {
      isVisible: true,
    },
    createdAt: {
      isVisible: true
    }
  },
  filterProperties: ["baseCostMl", "flex"],
  listProperties: ["id", "baseCostMl", "flex", "statusMl", "clientMl", "createdAt"],
  sort: { direction: "desc", sortBy: "createdAt" },
  actions: {
    list: {
      showResourceActions: false,
      hideActionHeader: true
    },
    show: {
      hideActionHeader: true,
    },
    new: {
      isVisible: false,
      isAccesible: false,
    },
    edit: {
      isVisible: false,
      isAccesible: false,
    },
    delete: {
      isVisible: false,
      isAccesible: false,
    }
  },
};

module.exports = {
  options,
  resource: ShippingMl,
};
