import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import Transaction from "../models/Transaction.js";

//endpoint untuk mengambil data postingan dari database
export const transactionAdd = async (req, res) => {
  try {
    const transactionData = {
      userId: req.user.googleId,
      ...req.body,
    };
    const newRecord = await Transaction.create(transactionData);
    res.status(201).json(newRecord);
  } catch (error) {
    return res.status(501).send(error.message);
  }
};

export const transactionDelete = async (req, res) => {
  try {
    const { transactionID } = req.params;

    await Transaction.findByIdAndDelete(transactionID);
    res.status(201).send("transaction deleted");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

export const transactionGet = async (req, res) => {
  try {
    const { transactionID } = req.params;

    const transactionSelected = await Transaction.findById(transactionID);
    if (!transactionSelected)
      return res.status(401).send("transaction dont find");

    res.status(201).send(transactionSelected);
  } catch (error) {
    res.status(501).send(error.message);
  }
};
