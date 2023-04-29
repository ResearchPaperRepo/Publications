const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  // console.log(req.files.data, req.body.email, token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes

    if (req.body && req.body.email && req.body.email !== payload.email) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    req.body.email = payload.email;

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
