import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Userg from "../models/User.js";

export const logout = (req, res) => {
  //1. ketika application access endpoint logout, maka cookies akan dihapus pada website
  req.logout((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};
