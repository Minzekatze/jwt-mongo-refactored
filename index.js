import express, { Router } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import userCollection from "./models/User.js";
import mongoose from "./db/mongooseClient.js";
import bcrypt from "bcrypt";
import jwtRoute from "./routes/JWTRoutes.js";

const app = express();
const port = process.env.PORT || 9800;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.set("view engine", "ejs");
app.use("/jwt", jwtRoute);

app.listen(port, () => {
  console.log(`Your app listening on port ${port}`);
});
