const express = require("express");

const { joiSchema, updateFavoriteJoiSchema } = require("../../models/contact");
// const { joiSchema } = require("../../models");
const { controllerWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
// console.log(ctrl);
//====
// const {upload, controllerWrapper} = require("../../middlewares");
//=====
const router = express.Router();
//=====
// router.post("/", upload.single("photo"), controllerWrapper(ctrl.add));
//======
// GET /api/contacts
router.get("/", controllerWrapper(ctrl.getAll));

// GET /api/contacts/3
router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(ctrl.updateContactsById)
);

router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeContactById));

module.exports = router;
