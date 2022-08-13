const express = require("express");
const userRoute = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const cookieParser = require('cookie-parser');

//jwt token
const createToken = (id) => {
  return jwt.sign({ id }, "anv223", {
    expiresIn: "30s",
  });
};

//register routes
userRoute.post("/", async (req, res) => {
  console.log(req.body)
  const allUsers = await UserModel.find();
  if (allUsers.find((user) => user.username === req.body.username))
    return res.status(409).send("username already exist");
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = new UserModel({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
      admin: false,
    });
    const token = createToken(user.username);

    const addUser = await user.save();
    console.log("success")
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.json(addUser);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

userRoute.get("/", async (req, res) => {
  try {
    console.log(req)
    const users = await UserModel.find().select("-password");
    res.send(users);
  } catch (error) {
    res.json(error);
  }
});

userRoute.get("/:id", async (req, res) => {
  try {
    console.log(req)
    const promise = await UserModel.findById(req.params.id).select("-password");
    res.send(promise);
  } catch (error) {
    res.send(error);
  }
});

//Login
userRoute.post("/login", async (req, res) => {
  console.log(req.body)
  const allUsers = await UserModel.find();
  const user = allUsers.find((user) => user.username === req.body.username);
  //console.log(user)
  if (user === undefined){
  console.log("User not found")
  return res.send({ status: 404, data: "User not found" });}
  try {
    //console.log(bycrpt)
    //console.log(req.body.password)
    //console.log(user.password)
    

    if (await bcrypt.compare(req.body.password, user.password)){
      //if (true){
      const token = createToken(user.username);
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).send(user);
    }
    else res.send({ status: 401, data: "Login fail" });
  } catch (error) {
    res.status(500).send("Something went Wrong");
  }
});

userRoute.post("/check", async (req, res, next) => {
  //console.log(req.cookies)
  //console.log(req)
  const token = req.cookies.jwt;
  //const token =""
  //const allUsers = await UserModel.find();
 //if (allUsers.find((user) => user.username === req.body.username))
  if (token) {
    jwt.verify(
      token,
      "anv223",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const allUsers = await UserModel.find();
          //console.log(decodedToken.id)
          const user = await UserModel.find({username:decodedToken.id});
          //console.log("user")
          //console.log(user[0].username)
          if (user) res.json({ status: true, user: user[0].username });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
});


module.exports = userRoute;
