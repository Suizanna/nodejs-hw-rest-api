const express = require("express");

const { joiSchema } = require("../../models/user");
//переименовываем auth в ctrl
const { auth: ctrl } = require("../../controllers");

const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");

const router = express.Router();

/*
1. Регистраця нового нового пользователя.
2. Аутентификациия (login) зарегистрированного пользователя.
3. Авторизация аутентифицированного (зашедшего на сайт) пользователя.
4. Выход (Logout).
*/

// api/auth/register
router.post(
  "/register",
  validation(joiSchema),
  controllerWrapper(ctrl.register)
);
// router.post("/signup")

//  POST /users/verify/
router.post("/verify", controllerWrapper(ctrl.reSend));

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));


router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
// router.post("/signin")

// PATCH /api/auth/avatars
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.avatars));
 

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));
// router.get("/signout")

router.get("/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;
