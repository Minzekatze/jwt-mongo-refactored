import { Router } from "express";
import {
  signupGET,
  signupPOST,
  loginGET,
  loginPOST,
  adminGET,
} from "../controllers/JWTController.js";
import { verifyJWTToken } from "../middleware/verifyJWTToken.js";

const jwtRoute = Router();

jwtRoute.route("/signup").get(signupGET).post(signupPOST);
jwtRoute.route("/login").get(loginGET).post(loginPOST);
jwtRoute.get("/admin", verifyJWTToken, adminGET);

export default jwtRoute;
