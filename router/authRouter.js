const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.get("/", (req, res) => {
  res.json({
    message: "Hello from Node Server, use /login or /register to register!",
  });
});

authRouter.post("/register", (req, res) => {
  // hash the password
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

authRouter.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const email = req.body.email;
  const password = req.body.password;

  // check if email exists in db
  User.findOne({ email })
    .then((user) => {
      // email found
      bcrypt.compare(password, user.password).then((pwCheck) => {
        if (!pwCheck) {
          return res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        }
        // jwt
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          {
            expiresIn: "24h",
          }
        );
        // return success
        res.status(200).send({
          message: "Login successful",
          email: user.email,
          token,
        });
      });
    })
    // catch error if password does not match
    .catch((error) => {
      res.status(400).send({
        message: "Passwords does not match",
        error,
      });
    })
    // catch error if email does not exist
    .catch((err) => {
      res.status(404).send({
        message: "Email not found",
        err,
      });
    });
});

module.exports = authRouter;
