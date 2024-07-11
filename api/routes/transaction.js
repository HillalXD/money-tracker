import express from "express";
import {
  transactionAdd,
  transactionDelete,
  transactionGet,
} from "../controllers/transaction.js";

const router = express.Router(transactionAdd);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.send("your not authenticate");
  }
}

router.post("/add", transactionAdd);
router.delete("/delete/:transactionID", transactionDelete);
router.post("/details/:transactionID", transactionGet);
router.get("/test", checkAuthentication, (req, res) => {
  res.send("letsgoo");
});

export default router;
