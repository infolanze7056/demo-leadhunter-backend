const express = require("express")
const router = express.Router()
const { login , statusCheck  } = require("../Auth/login")

router.route("/payment").post(login)


module.exports = router;