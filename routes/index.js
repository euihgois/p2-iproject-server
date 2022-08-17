const express = require("express");
const router = express.Router();

router.use("/", require("./credential"));

router.use(require("../middlewares/error-handler"));

module.exports = router;
