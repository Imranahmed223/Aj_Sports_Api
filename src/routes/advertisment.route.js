const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { advertismentValidation } = require("../validations/");
const { advertismentController } = require("../controllers");
const { fileUpload } = require("../utils/fileUpload");
const router = express.Router();

router
  .route("/")
  .post(
    auth("manageAdvertisments"),
    fileUpload.single("photoPath"),
    validate(advertismentValidation.createAdvertisment),
    advertismentController.createAdvertisment
  )
  .get(
    validate(advertismentValidation.queryAdvertisments),
    advertismentController.queryAdvertisments
  );

router
  .route("/:id")
  .get(
    validate(advertismentValidation.getAdvertisment),
    advertismentController.getAdvertismentById
  )
  .patch(
    auth("manageAdvertisments"),
    fileUpload.single("photoPath"),
    validate(advertismentValidation.updateAdvertisment),
    advertismentController.updateAdvertismentById
  )
  .delete(
    auth("manageAdvertisments"),
    validate(advertismentValidation.deletAdvertisment),
    advertismentController.deleteAdvertismentById
  );
module.exports = router;
