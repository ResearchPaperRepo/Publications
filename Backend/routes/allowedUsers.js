const express = require("express");

const router = express.Router();

const {
  grantPermissionToUser,
  registeredUsers,
} = require("../controllers/allowedUsers");

router.post("/addUser", grantPermissionToUser);
router.get("/registeredUsers", registeredUsers);

module.exports = router;
