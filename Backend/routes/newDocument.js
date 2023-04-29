const express = require("express");

const router = express.Router();

const { uploadDoc } = require("../controllers/documents");

router.route("/").post(uploadDoc);

module.exports = router;
