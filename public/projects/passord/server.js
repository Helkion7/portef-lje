const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const zxcvbn = require("zxcvbn");
const User = require("./schemas/user");
require("dotenv").config();

const app = express();

let secretKey = process.env.secretKey

const url = "mongodb://localhost:27017";

mongoose
  .connect(url, { dbName: "userDatabase" })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

// statiske filer for puplic folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// logger http requests
app.use(morgan("dev"));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", loggedIn, (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

app.get("/welcome", (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("/");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.redirect("/");
    } else {
      res.render("welcome", { title: "Welcome" });
    }
  });
});

app.get("/admin", checkAdminRole, (req, res) => {
  res.render("admin", { title: "Admin" });
});

function checkAdminRole(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("/");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.redirect("/");
    }
    console.log("DECODED", decoded);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  });
}

function loggedIn(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.redirect("/");
      }
      if (decoded.role === "admin") {
        return res.redirect("/admin");
      }
      return res.redirect("/welcome");
    });
  } else {
    next();
  }
}

app.post("/register", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const passwordResult = zxcvbn(password);

  if (passwordResult.score < 3) {
    return res.render("register", {
      title: "Register",
      error:
        "Password is not strong enough. Please choose a stronger password.",
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.render("register", {
      title: "Register",
      error: "Passwords do not match.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", {
        title: "Register",
        error: "Email already exists. Please choose a different email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      role: "kunde",
      email,
      password: hash,
    });

    await user.save();
    res.redirect("/");
  } catch (err) {
    res.render("register", {
      title: "Register",
      error: "An error occurred while creating the user.",
    });
  }
});

app.post("/", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.render("login", {
          title: "Login",
          error: "Incorrect email or password. Please try again.",
        });
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.render("login", {
          title: "Login",
          error: "Incorrect email or password. Please try again.",
        });
      }

      const token = jwt.sign(
        { email: user.email, role: user.role },
        secretKey,
        { expiresIn: "24h" }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      if (user.role === "admin") {
        return res.redirect("/admin");
      } else {
        return res.redirect("/welcome");
      }
    })
    .catch((err) => {
      res.render("login", {
        title: "Login",
        error: "Internal server error.",
      });
    });
});

app.post("/logout", (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.render("404", { title: "404" });
});
