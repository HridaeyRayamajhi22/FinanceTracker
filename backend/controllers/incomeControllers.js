import User from "../models/User.js"
import Income from "../models/Income.js"

// Add Income Sources 
export const addIncome = async (req, res) => {
   const userId = req.user.id;

   try {
       const { icon, source, amount, date } = req.body;

       // Validation
       if (!source || !amount) {
           return res.status(400).json({ message: "All fields are required" });
       }

       const newIncome = new Income({
           userId,
           icon,
           source,
           amount,
           date: date ? new Date(date) : Date.now()
       });

       await newIncome.save();

       res.status(200).json(newIncome);
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Server error" });
   }
}

// Get all income Sources
export const getAllIncome = async (req, res) => {

}


// Delete all Income Sources
export const deleteIncome = async (req, res) => {

}



// Download  
export const downloadExcelIncome = async (req, res) => {

}