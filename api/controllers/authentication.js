<<<<<<< HEAD
import { db } from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


db.connect();

export const register = async (req, res) => {
    const userInput = req.body
    console.log(userInput)

    try {
        //check user existance
        //1. query untuk check data dalam database yang match dengan username user input
        const checkDatabase = await db.query("SELECT * FROM usertable WHERE username = $1", [userInput.username])
        const checkEmail = await db.query("SELECT * FROM usertable WHERE email = $1", [userInput.email])

        //2. kalo database retrieve data dari query (menemukan exist users)
        if(checkDatabase.rows[0]){
            res.status(400).json("user already exist")
        } else {

            if(checkEmail.rows[0]){
                res.status(400).json("email already used")

            } else {
                //3. kalo database ga retrieve data, masuk ke preprocessing (password hashing > querying untuk masukin data ke db dan response api)
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(userInput.password, salt)

                await db.query(
                    "INSERT INTO usertable (username, email, password) VALUES ($1, $2, $3);", 
                    [userInput.username, userInput.email, hashedPassword]
                )
                
                res.send("user created").status(200)
            }
        }


    } catch (error) {
        res.json(error.message).status(501)
    }
}

export const login = async (req, res) => {

    const userInput = req.body
    //1. check user existance in database, return error kalo gaada dan kalo ada masuk validate
    try {
        const userValidate = await db.query("SELECT * FROM usertable WHERE username = $1", [userInput.username])

        //2. kalo database query menemukan user masuk validate
        if(userValidate.rows[0]){
            const { password, ...others } = userValidate.rows[0]

            console.log(password)
            console.log(others)

            const checkPassword = bcrypt.compareSync(userInput.password, password)
            console.log(checkPassword)

            //2.2 returning wrong message if unsuccess validation
            if(!checkPassword) {
                return res.status(400).json("wrong password or username")

            //2.3 returning content and jsonwebtoken
            } else {
                const token = jwt.sign({ id: others.id }, process.env.JWT_SECRET, {
                    expiresIn: "30d"
                })
                res
                 .cookie("accessToken", token, { 
                    httpOnly: true,
                    expiresIn: "5d"
                 })
                 .status(200)
                 .json(others)
            }

        //3. tidak menemukan match username returning error
        }else{
            res.status(400).send("user not found")
        }

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const logout = (req, res) => {
    //1. ketika application access endpoint logout, maka cookies akan dihapus pada website
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User logged out")
}
=======
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
>>>>>>> d08f619 (mongodb migrate and google oauth)
