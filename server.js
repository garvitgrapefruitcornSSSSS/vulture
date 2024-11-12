require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB:", error));

// Define a Mongoose schema for storing user financial data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    dob: Date,
    monthly_income: Number,
    monthly_expenses: Number,
    savings_balance: Number,
    loan_type: String,
    loan_balance: Number,
    emi_amount: Number,
    emi_duration: Number,
    risk_tolerance: String,
    investment_goals: String,
    existing_investments: String,
    investment_value: Number,
    tax_bracket: String,
    tax_saving_instruments: String,
    financial_goals: String,
    target_date: Date,
});

// Define a Mongoose model
const UserFinancialData = mongoose.model('UserFinancialData', userSchema);

// Route to serve the HTML form at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission and save to MongoDB
app.post('/submit-form', async (req, res) => {
    try {
        // Create a new document from form data
        const userFinancialData = new UserFinancialData(req.body);

        // Save the document to MongoDB
        await userFinancialData.save();
        res.redirect('/dashboard'); // Redirect to the dashboard to see the data
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("There was an error saving your data.");
    }
});

// Route to render the dashboard page with data from MongoDB
app.get('/dashboard', async (req, res) => {
    try {
        const allUserData = await UserFinancialData.find(); // Fetch all documents
        res.render('dashboard', { users: allUserData }); // Render dashboard.ejs and pass data
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("There was an error fetching data.");
    }
});

// Route to generate AI-driven financial suggestion based on user data
app.get('/generate-plan/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserFinancialData.findById(userId);

        if (!user) {
            return res.status(404).send('User data not found');
        }

        // Generate a financial plan based on user data
        const financePlan = generateFinancePlan(user); // Custom function for AI logic

        res.render('get', { user, financePlan }); // Render get.ejs with user data and plan
    } catch (error) {
        console.error("Error generating finance plan:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Placeholder function for generating a financial plan based on user data
function generateFinancePlan(user) {
    const plan = {
        advice: "",
        riskLevel: user.risk_tolerance,
    };

    // Basic example logic for generating advice based on income and expenses
    if (user.monthly_income > user.monthly_expenses * 1.5) {
        plan.advice = "You have a good income-to-expense ratio! Consider aggressive investments.";
    } else if (user.monthly_income > user.monthly_expenses) {
        plan.advice = "You're doing well! Consider moderate investments to balance growth with security.";
    } else {
        plan.advice = "It may be best to increase savings before exploring high-risk investments.";
    }

    return plan;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



