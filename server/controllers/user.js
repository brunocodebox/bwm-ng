//Section 6, Lecture 83 - Starting Register
const User = require("../models/user");
//Section 6, Lecture 85 - Mongoose Errors and Debugging
const { normalizeErrors } = require("../helpers/mongoose"); // Destructurizing MongooseHelpers
//Section 6, Lecture 87 - Decoding JWT
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

exports.auth = function(req, res) {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: [
        {
          status: 422,
          title: "Data missing!",
          detail: "Provide email and password!"
        }
      ]
    });
  }

  User.findOne({ email }, function(err, user) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (!user) {
      return res.status(422).send({
        errors: [
          {
            status: 422,
            title: "Invalid user!",
            detail: "User does not exist!"
          }
        ]
      });
    }

    if (user.hasSamePassword(password)) {
      // return JWT token;
      const token = jwt.sign(
        { userId: user.id, username: user.name },
        config.SECRET,
        { expiresIn: "1h" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          {
            status: 422,
            title: "Wrong data!",
            detail: "Wrong email or password"
          }
        ]
      });
    }
  });
};

exports.register = function(req, res) {
  //const username = req.body.username;
  //const email = req.body.email;
  //const password = req.body.password;
  //const passwordConfirmation = req.body.passwordConfirmation;

  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        {
          status: 422,
          title: "Data missing!",
          detail: "Provide email and password!"
        }
      ]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          status: 422,
          title: "Invalid password!",
          detail: "Password is not the same as the confirmation!"
        }
      ]
    });
  }

  // Look up user by email
  User.findOne({ email }, function(err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            status: 422,
            title: "Invalid email!",
            detail: "User with this email already exists!"
          }
        ]
      });
    }

    const user = new User({
      username, // shorter version of username: username
      email, // shorter version of email: email
      password // shorter version of password: password
    });

    user.save(function(err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json({ registered: true });
    });
  }); // shorter expression than User.findOne({email: email});
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  return jwt.verify(token.split(" ")[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        status: 401,
        title: "Not authorized!",
        detail: "You need to login to get access!"
      }
    ]
  });
}
