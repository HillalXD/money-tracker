<<<<<<< HEAD
import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment/moment.js"

//endpoint untuk mengambil data postingan dari database
export const homepage = (req, res) => {
    try {
        const query = `SELECT * FROM usertransaction WHERE user_id = $1 ORDER BY transaction_time DESC`
        const token = req.cookies.accessToken
        //menangkap detail waktu untuk dijadikan variable createdAt 
        
        //cookies verify apakah user sudah login atau belum
        if(!token) return res.status(401).json("unauthorized")

        jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
            //verify status valid dari cookies token
            if(err) return res.status(403).json("Invalid token")

            //memasukan data desc, image, userId, createdAt pada database dengan inputing user request
            db.query(query, [userInfo.id], (err, data) => {
                if(err) return res.status(500).json(err)
                return res.status(200).json(data.rows)
            })
        })
    } catch (error) {
        res.status(501).send(error.message)
    }
}
=======
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import Transaction from "../models/Transaction.js";

//endpoint untuk mengambil data postingan dari database
export const homepage = async (req, res) => {
  try {
    console.log(req.user);
    const transactionRcrd = await Transaction.find({
      userId: req.user.googleId,
    });
    res.status(201).send(transactionRcrd);
  } catch (error) {
    res.status(501).send(error.message);
  }
};
>>>>>>> d08f619 (mongodb migrate and google oauth)
