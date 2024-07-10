<<<<<<< HEAD
import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

//endpoint untuk mengambil data postingan dari database
export const transactionAdd = (req, res) => {
    try {
        const query = `INSERT INTO usertransaction (user_id, amount, transaction_time, item_name, description, is_revenue) VALUES ($1, $2, $3, $4, $5, $6);`
        const token = req.cookies.accessToken
        //menangkap detail waktu untuk dijadikan variable createdAt 
        
        //cookies verify apakah user sudah login atau belum
        if(!token) return res.status(401).json("unauthorized")

        jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
            //verify status valid dari cookies token
            if(err) return res.status(403).json("Invalid token")

            //memasukan data desc, image, userId, createdAt pada database dengan inputing user request
            db.query(query, [userInfo.id, req.body.amount, req.body.date, req.body.name, req.body.description, req.body.is_revenue], (err, data) => {
                if(err) return res.status(500).json(err)
                return res.status(200).json("success input data")
            })
        })
    } catch (error) {
        res.status(501).send(error.message)
    }
}

export const transactionDelete = (req, res) => {
    try {
        const query = `DELETE FROM usertransaction WHERE transaction_id = $1`
        const token = req.cookies.accessToken
        const { transactionID } = req.params
        
        //cookies verify apakah user sudah login atau belum
        if(!token) return res.status(401).json("unauthorized")

        jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
            //verify status valid dari cookies token
            if(err) return res.status(403).json("Invalid token")

            //memasukan data desc, image, userId, createdAt pada database dengan inputing user request
            db.query(query, [transactionID], (err, data) => {
                if(err){
                    return res.status(500).json(err)
                } else {
                    return res.status(200).json("success")
                }
            })
        })
    } catch (error) {
        res.status(501).send(error.message)
    }
}

export const transactionGet = (req, res) => {
    try {
        const query = `SELECT * FROM usertransaction WHERE transaction_id = $1 AND user_id = $2;`
        const token = req.cookies.accessToken
        const { transactionID } = req.params
        
        //cookies verify apakah user sudah login atau belum
        if(!token) return res.status(401).json("unauthorized")

        jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
            //verify status valid dari cookies token
            if(err) return res.status(403).json("Invalid token")

            //retrieve match data ( transaction_id and user_id match )
            db.query(query, [transactionID, userInfo.id], (err, data) => {
                if(err){
                    return res.status(500).json(err)
                } else {
                    return res.status(200).json(data.rows)
                }
            })
        })
    } catch (error) {
        res.status(501).send(error.message)
    }
}
=======
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
>>>>>>> d08f619 (mongodb migrate and google oauth)
