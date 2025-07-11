const Income = require("../models/Income");
const Expence = require("../models/Expence");
const { Types } = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total Expence
    const totalExpence = await Expence.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Last 60 Days Income
    const last60DaysIncomeTransaction = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60days = last60DaysIncomeTransaction.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 30 Days Expence
    const last30DaysExpenceTransactions = await Expence.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenceLast30Days = last30DaysExpenceTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 5 Income + Expence Transactions
    const lastTranscation = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expence.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expence",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    // Response
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpence[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpence: totalExpence[0]?.total || 0,
      last30DaysExpence: {
        total: expenceLast30Days,
        transactions: last30DaysExpenceTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60days,
        transaction: last60DaysIncomeTransaction,
      },
      recentTransaction: lastTranscation,
    });
  } catch (err) {
    console.error("Dashboard Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
