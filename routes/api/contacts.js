const express = require("express");

const { joiSchema, updateFavoriteJoiSchema } = require("../../models/contact");
// const { joiSchema } = require("../../models");
const { controllerWrapper, validation, authenticate } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
// console.log(ctrl);

const router = express.Router();

// GET /api/contacts
router.get("/",  authenticate, controllerWrapper(ctrl.getAll));

// GET /api/contacts/3
router.get("/:contactId",  authenticate, controllerWrapper(ctrl.getContactById));

router.post("/",  authenticate, validation(joiSchema), ctrl.addContact);

router.put(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateContactsById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId",  authenticate, controllerWrapper(ctrl.removeContactById));

module.exports = router;
