// user.js
import express from "express";
import passport from "passport";
import { auth } from "../middlewares/auth.js";
import multer from "../middlewares/multerConfig.js";
import axios from "axios";
import {updateProfile, logout, VerifyAnswers, registerGitHubUser, createUser, getUser, updateUser, deleteUser, addAdmin, login, ChangePasswordForgot, SendCodeForgot, VerifCodeForgot, refreshAccessToken,getAllUsers,getAllAdminUsers,registerGoogleUser,exportXls, getAllChallenged, getAllAdmin, getAllCompany, getAllAdminUserss,checkGoogleUserExistence} from "../controllers/user.js";

const router = express.Router();

router.route("/").post(multer,createUser);
router.route("/login").post(login);
router.route("/:user").put(auth, updateUser);
router.route("/deleteUser").post(deleteUser);

router.post("/addAdmin", auth, addAdmin);
router.route("/forget").post(SendCodeForgot);
router.route("/reset").post(VerifCodeForgot);
router.route("/change").post(ChangePasswordForgot);
router.route("/register-google").post(registerGoogleUser);
router.route("/check-google-existence").get(checkGoogleUserExistence);
router.route('/register-github').post(registerGitHubUser);
router.route("/Answers").post(VerifyAnswers);
router.post('/logout', auth, logout);
// Nouvelle route pour le rafraîchissement du token
router.route("/refresh-token").post(auth, refreshAccessToken);
router.route("/profile").put(auth,multer,updateProfile);

router.route("/getallsuperadmin").get(getAllChallenged);
router.route("/xls").get(exportXls);
router.route("/getalladmin").get(getAllAdmin);
router.route("/getallcompany").get(getAllCompany);
router.route("/getallthenya").get(getAllAdminUserss);


export default router;
