const xlsx = require("xlsx")
const Expence = require("../models/Expence")

//Add Expence sourse
exports.addExpence = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, category, amount, date} = req.body;

        // validation: Check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpence = new Expence ({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpence.save();
        res.status(200).json(newExpence)
    }
    catch (err) {
        res.status(500).json({message: "Server Error"})
    }
}

//Get All expence sourse
exports.getAllExpence = async (req, res) => {
    const userId = req.user.id

    try{
        const expence = await Expence.find({ userId }).sort({date: -1});
        res.json(expence);
    }
    catch (err) {
        res.status(500).json({message: "Serve Error"});
    }
};

//Delete Expence source
exports.deleteExpence = async (req, res) => {
    try{
        await Expence.findByIdAndDelete(req.params.id);
        res.json({message: "Expence Deleted successfully"})
    }
    catch (err) {
        res.status(500).json({message: "Server error"});
    }
}

//Download Excel
exports.downloadExpenceExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expence = await Expence.find({ userId }).sort({ date: -1 });

        //Prepare date for excel
        const data = expence.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expence")
        xlsx.writeFile(wb, "expence_details_xlsx")
        res.download("expence_details.xlsx")
    }
    catch{
        req.status(500).json({message: "Server error"})
    }
}
