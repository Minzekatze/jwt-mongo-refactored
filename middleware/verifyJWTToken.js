import jwt from "jsonwebtoken";
import userCollection from "../models/User.js";
import bcrypt from "bcrypt";

const verifyJWTToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) return res.status(401).json({ error: "please login" });

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userCollection.findById(id);
    if (!user) return res.status(401).json({ error: "user doesn't exist" });

    req.user = user;
    next();
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export { verifyJWTToken };
