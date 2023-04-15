import jwt from "jsonwebtoken";
import userCollection from "../models/User.js";
import bcrypt from "bcrypt";

const signupGET = (req, res) => {
  return res.render("index3");
};

const signupPOST = async (req, res) => {
  try {
    const {
      body: { name, email, pwd },
    } = req;
    console.log(`${name} ${email} ${pwd}`);
    if (!name || !email || !pwd) return res.status(400).send("Missing info");
    const checkUser = await userCollection.findOne({ email });
    if (checkUser) return res.status(400).send("User already exists");
    const hash = await bcrypt.hash(pwd, 5);
    const newuser = {
      name: name,
      email: email,
      password: hash,
    };

    const { _id } = await userCollection.create(newuser);
    const token = jwt.sign({ id: _id }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(201).setHeader("accessToken", token).send("user created");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const loginGET = (req, res) => {
  return res.render("index");
};

const loginPOST = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await userCollection
      .findOne({ email: email })
      .select("+password");
    if (!user) return res.status(500).send("User not registered");
    const match = await bcrypt.compare(pwd, user.password);
    if (!match) return res.status(500).send("wrong password");
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.setHeader("accessToken", token).send("Sucessfully loged in");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const adminGET = (req, res) => {
  return res.send(`<h1>Welcome back ${req.user.name}!</h1>`);
};

export { signupGET, signupPOST, loginGET, loginPOST, adminGET };
