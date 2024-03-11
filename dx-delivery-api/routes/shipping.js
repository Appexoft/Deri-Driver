const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
});
const upload = multer({ storage: storage });

const {
  listShippings,
  getShipping,
  getShippingPdf,
  listShippingFilters,
  asignShippingRider,
  updateShipping,
  listUndeliveredReasons,
  createShipping,
  getAddressGeocode,
  addImageToShipping,
  asignRiderToShippings,
  getShippingRate,
  shippingHandledByGP,
  determineDeliveryPossibilities,
  checkPostalCode,
  deleteShippings,
  deleteMultipleShippingsByArrayId,
  getSuggestedLocations,
  updateShippingsState,
  getShippingType,
} = require("../controllers/shipping.controller");

const uploadImageToS3 = require("../middlewares/uploadImageToS3");
const authorize = require("../middlewares/authorize");
const {
  newShipping,
  deleteMultipleShippingsById,
} = require("../helpers/requestValidator/shipping");
const { errorValidator } = require("../middlewares/errorValidator");
const { roles } = require("../helpers/constants");

const router = Router();

//Update shippings state
router.put(
  "/shippings/state",
  authorize([roles.ADMIN, roles.RIDER]),
  updateShippingsState,
);

// determine Delivery Possibilities
router.get(
  "/deliveryPossibilities",
  authorize(),
  determineDeliveryPossibilities,
);

// Get Shipping types
router.get("/types", authorize(), getShippingType);

//Enable handled by GP
router.post("/shippingHandledByGP", authorize(), shippingHandledByGP);

//Check postal code
router.get("/checkPostalCode", authorize(), checkPostalCode);

// Get shipping Address
router.get("/geocode", authorize([], true), getAddressGeocode);

// Get suggested locations
router.get("/suggested-locations", authorize([], true), getSuggestedLocations);

// List all shippings
router.get("/list", authorize(), listShippings);

// Get Shippiing Rate
router.get("/rate", authorize(), getShippingRate);

// Create new shipping
router.post("/new", [authorize(), newShipping, errorValidator], createShipping);

// List filters (deliveryZone, business, shippingState, shippingType)
router.get("/list-filters", authorize(), listShippingFilters);

// Get reasons of undelivered shippings
router.get("/undelivered", authorize(), listUndeliveredReasons);

// Get shipping Detail
router.get("/:shippingId", authorize(), getShipping);

router.get("/:shippingId/pdf", authorize(), getShippingPdf);

//Uplaod image to S3
router.post(
  "/:shippingId/upload-image",
  authorize(),
  upload.array("shippingPhotos", 4),
  uploadImageToS3,
  addImageToShipping,
);

// Update shipping
router.put("/:shippingId", authorize(), updateShipping);

// Remove shippings
router.delete("/delete", authorize(), deleteShippings);

// Remove multiple shippings
router.delete(
  "/delete/shippings-by-id",
  [authorize(), deleteMultipleShippingsById, errorValidator],
  deleteMultipleShippingsByArrayId,
);
// Updates shippings Riders
router.put("/riders/:riderId", authorize(roles.ADMIN), asignRiderToShippings);

// Update shipping Rider
router.put("/:shippingId/:riderId", authorize(roles.ADMIN), asignShippingRider);

module.exports = router;
