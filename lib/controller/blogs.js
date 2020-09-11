"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var router = express.Router();

var articles = require("../../models/articles");

var CheckAuth = require("../signin/middleware/check-auth"); // Getting all


router.get('/v1/blogs', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var letters;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return articles.find();

          case 3:
            letters = _context.sent;
            res.json(letters);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: _context.t0.message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Creating one

router.post('/v1/blogs', CheckAuth, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var blog;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            blog = new articles(req.body);
            blog.save(blog).then(function (data) {
              res.send(data);
            })["catch"](function (err) {
              res.status(500).send({
                message: err.message || "Same error occurred while creating an article"
              });
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // Updating One

router.patch('/v1/blogs/:id', CheckAuth, getArticles, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var updatedArticles;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (req.body.title != null) {
              res.data.title = req.body.title;
            }

            if (req.body.Author != null) {
              res.data.Author = req.body.Author;
            }

            if (req.body.date != null) {
              res.data.date = req.body.date;
            }

            if (req.body.content != null) {
              res.data.content = req.body.content;
            }

            _context3.prev = 4;
            _context3.next = 7;
            return res.data.save();

          case 7:
            updatedArticles = _context3.sent;
            res.json(updatedArticles);
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](4);
            res.status(400).json({
              message: _context3.t0.message
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Deleting One

router["delete"]('/v1/blogs/:id', CheckAuth, getArticles, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return res.data.remove();

          case 3:
            res.json({
              message: 'Deleted article'
            });
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: _context4.t0.message
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //function to get single data

function getArticles(_x9, _x10, _x11) {
  return _getArticles.apply(this, arguments);
}

function _getArticles() {
  _getArticles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return articles.findById(req.params.id);

          case 3:
            data = _context5.sent;

            if (!(data == null)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: 'There is no article'
            }));

          case 6:
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json({
              message: _context5.t0.message
            }));

          case 11:
            res.data = data;
            next();

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return _getArticles.apply(this, arguments);
}

module.exports = router;