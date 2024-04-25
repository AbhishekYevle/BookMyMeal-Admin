const express = require('express');
const router = express.Router();
// import {home, login, signup} from '../controller/auth-controller';
const authController = require("../controller/auth-controller");

router.route("/").get(authController.home);

router.route("/signup").post(authController.signup);

router.route("/signin").post(authController.signIn);

router.route("/resetpassword").patch(authController.resetPassword);

router.route("/userlist").get(authController.userList);

// router.route("/").get((req, res) => {
//     res.render('index', { text: 'Hey' })
// });

module.exports = router;