<<<<<<< HEAD
import express from "express"
import { homepage } from "../controllers/home.js"

const router = express.Router()


router.get("/", homepage)

export default router
=======
import express from "express";
import { homepage } from "../controllers/home.js";

const router = express.Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.status(400).send("your not authenticate");
  }
}

router.get("/", checkAuthentication, homepage);

export default router;
>>>>>>> d08f619 (mongodb migrate and google oauth)
