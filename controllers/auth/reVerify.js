const { NotFound, Forbidden } = require("http-errors");
const { User } = require("../../models");
const { sendEmail, sendSuccessResponse } = require("../../utils");

const reVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required field email",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    throw new Forbidden("User already verified");
  }

  const verifyEmail = {
    to: email,
    subject: "Confirm Your Email",
    html: `<a href="http://localhost:8080/api/auth/verify/${user.verifyToken}" target="_blank">Confirm email<a>`,
  };

  await sendEmail(verifyEmail);
//   res.status(200).json({
//     status: 'success',
//     code: 200,
//     message: 'Verification email sent',
//   })

  sendSuccessResponse(res, null, 201);
};

module.exports = reVerify;