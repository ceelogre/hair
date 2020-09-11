"use strict";

require("dotenv").config();

var express = require("express");

var router = express.Router();

var mongoose = require("mongoose");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var User = require("../models/user");

router.post("/signup", function (req, res, next) {
  User.find({
    email: req.body.email
  }).exec().then(function (user) {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Mail exists"
      });
    } else {
      console.log(req.body);
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: 'Hash error'
          });
        } else {
          var _user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });

          _user.save().then(function (result) {
            console.log(result);
            res.status(201).json({
              message: "User created"
            });
          })["catch"](function (err) {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        }
      });
    }
  });
});
router.post("/login", function (req, res, next) {
  User.find({
    email: req.body.email
  }).exec().then(function (user) {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }

    bcrypt.compare(req.body.password, user[0].password, function (err, result) {
      if (err) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      if (result) {
        var token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        }, process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.status(200).json({
          message: "Auth successful",
          token: token
        });
      }

      res.status(401).json({
        message: "Auth failed"
      });
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
router["delete"]("/:userId", function (req, res, next) {
  User.remove({
    _id: req.params.userId
  }).exec().then(function (result) {
    res.status(200).json({
      message: "User deleted"
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
module.exports = router;