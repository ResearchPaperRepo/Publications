const AllowedUsers = require("../models/allowedUsers");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const grantPermissionToUser = async (req, res) => {
  const { email, user_email } = req.body;

  if (!email || !user_email) {
    throw new BadRequestError(
      "Please provide valid email and user email to grant permission"
    );
  }

  if (email.toLowerCase() !== "ssaikuma@ttu.edu") {
    throw new UnauthenticatedError(
      "You are not allowed to Register, Please contact Y.Liu@ttu.edu"
    );
  }

  const user = await AllowedUsers.create({ email: user_email });

  res.status(StatusCodes.CREATED).json({ user });
};

const registeredUsers = async (req, res) => {
  const { email } = req.body;

  if (email !== "ssaikuma@ttu.edu") {
    throw new UnauthenticatedError(
      "You are not allowed to Access Registered users, Please contact Y.Liu@ttu.edu"
    );
  }

  const results = await AllowedUsers.find({});
  const users = results.map((user) => {
    return user.email;
  });

  res.status(StatusCodes.OK).json({ users });
};

module.exports = { grantPermissionToUser, registeredUsers };
