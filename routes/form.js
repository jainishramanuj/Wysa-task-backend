const express = require("express");
const router = express.Router();

const getForm = require("../controllers/form ");

router.route("/").get(getForm);

module.exports = router;