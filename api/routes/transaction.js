import express from "express"
import { transactionAdd, transactionDelete, transactionGet } from "../controllers/transaction.js"

const router = express.Router(transactionAdd)

router.post("/add", transactionAdd)
router.delete("/delete/:transactionID", transactionDelete)
router.post("/details/:transactionID", transactionGet)

export default router