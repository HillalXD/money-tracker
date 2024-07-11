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
