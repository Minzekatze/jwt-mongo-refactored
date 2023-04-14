import express, { Router } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import userCollection from "./models/User.js";
import mongoose from "./db/mongooseClient.js";

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

const jwtRoute = Router();
app.use("/jwt", jwtRoute);

jwtRoute.get("/hello", async (req, res) => {
  const users = await userCollection.find({});
  res.json(users);
});
jwtRoute.post("/hello", async (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  const newuser = {
    name: name,
    email: email,
    password: password,
  };

  const student = await Student.create(newStudent);
  res.status(201).json(student);
});

jwtRoute.get("/login", (req, res) => {
  return res.render("index");
});

jwtRoute.post("/connect", (req, res) => {
  const { login, pwd } = req.body;

  if (pwd === "doe" && login === "john") {
    const user = { login: login, password: pwd };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res
      .setHeader("accessToken", accessToken)
      .render("index2", { myAccessToken: accessToken });
  } else {
    return res.redirect("/jwt/login");
  }
});

jwtRoute.post("/checkJWT", (req, res) => {
  const { mytoken } = req.body;
  if (mytoken == null) return res.redirect("/jwt/login");
  jwt.verify(mytoken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect("/jwt/login");
    if (user.login === "john" && user.password === "doe") {
      return res.redirect("/jwt/admin");
    }
  });
});

jwtRoute.get("/admin", (req, res) => {
  return res.send("you are an admin!");
});

app.listen(port, () => {
  console.log(`Your app listening on port ${port}`);
});
