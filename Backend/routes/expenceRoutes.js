const express = require("express");
const {
    addExpence,
    getAllExpence,
    deleteExpence,
    downloadExpenceExcel,
} = require("../controllers/expenceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpence);
router.get("/get", protect, getAllExpence);
router.get("/downloadExcel", protect, downloadExpenceExcel);
router.delete("/:id", protect, deleteExpence);

module.exports = router