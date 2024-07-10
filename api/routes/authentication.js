<<<<<<< HEAD
import express from "express"
import { login, register, logout } from "../controllers/authentication.js"

const router = express.Router()


router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)

export default router
=======
import express from "express";
import { logout } from "../controllers/authentication.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Userg from "../models/Userg.js";

import dotenv from "dotenv";
dotenv.config();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.send("your not authenticate");
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3030/authentication/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log(profile);
        const { name, email } = profile._json;

        const oldUsers = await Userg.findOne({ googleId: profile.id });

        if (oldUsers) {
          return cb(null, profile);
        } else {
          const newUsers = await Userg.create({
            googleId: profile.id,
            email: email,
            name: name,
          });

          return cb(null, profile);
        }
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get("/profile", checkAuthentication, (req, res) => {
  res.send(req.user);
});

router.get("/test/users", checkAuthentication, (req, res) => {
  console.log(req.user);
  res.send("ok");
});

router.post("/logout", logout);

export default router;
>>>>>>> d08f619 (mongodb migrate and google oauth)
