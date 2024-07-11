import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

import authentication from "./routes/authentication.js";
import addTransaction from "./routes/transaction.js";
import home from "./routes/home.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  session({
    secret: process.env.JWT_SECRET,
    saveUninitialized: false,
    resave: false,
    user: "test",
  })
);
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use("/authentication", authentication);
app.use("/transaction", addTransaction);
app.use("/home", home);

app.get("/", (req, res) => {
  try {
    res.send("hello world");
  } catch (error) {
    res.send(error);
  }
});

app.listen(3030, () => {
  console.log(`listening on: http://localhost:3030`);
});
