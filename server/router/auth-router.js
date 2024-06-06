const express = require('express');
const router = express.Router();
// import {home, login, signup} from '../controller/auth-controller';
const authController = require("../controller/auth-controller");
const { verifyToken } = require('../utils/verifyToken');

router.route("/").get(authController.home);

router.route("/addemployee").post(verifyToken, authController.AddEmployee);

router.route("/signin").post(authController.signIn);

router.route("/forgotpassword").post(authController.forgotpassword);

router.route("/resetpassword").patch(verifyToken, authController.resetPassword);

router.route("/changepassword").patch(verifyToken, authController.ChangePassword);

router.route("/addbooking").post(verifyToken, authController.AddBooking);

router.route("/bookinglist").get(verifyToken, authController.bookingList);

router.route("/deletebooking/").patch(verifyToken, authController.deleteBooking);

router.route("/userlist").get(verifyToken, authController.userList);

router.route("/deleteemployee").patch(verifyToken, authController.deleteEmployee);

router.route("/adddisableddates").post(verifyToken, authController.addDisabledDates);

router.route("/disableddates").get(verifyToken, authController.DisabledDates);

router.route("/deletedisabledate").post(authController.deleteDisableDate);

// router.route("/").get((req, res) => {
//     res.render('index', { text: 'Hey' })
// });

module.exports = router;