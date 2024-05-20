const express = require('express')

const router = express.Router()

const userSignUp = require("../controller/userSignUp")

router.post("/sign-up", userSignUp)
module.exports = router