const User = require("../models/User");
const AllowedUsers = require("../models/allowedUsers");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password to register");
  }

  const allowedUser = await AllowedUsers.findOne({ email });

  if (!allowedUser) {
    throw new UnauthenticatedError(
      "You are not allowed to Register, Please contact Y.Liu@ttu.edu"
    );
  }

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ email: user.email });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ email: user.email, token });
};

module.exports = {
  login,
  register,
};
