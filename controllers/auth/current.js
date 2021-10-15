const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const { sendSuccessResponse } = require("../../utils");

const current = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id, "_id email subscription");
  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  sendSuccessResponse(res, { user }, 200);
};

module.exports = current;
