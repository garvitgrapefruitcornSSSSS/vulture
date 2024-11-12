const express = require('express');
const router = express.Router();
const UserFinancialData = require('../models/UserFinancialData');  // Assuming you have this model file

// Route to generate finance plan based on user ID
router.get('/generate-plan/:userId', async (req, res) => {
    try {
        const user = await UserFinancialData.findById(req.params.userId); // Fetch user by ID
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Render the 'get.ejs' page with user data
        res.render('get', { user: user });
    } catch (error) {
        console.error("Error generating finance plan:", error);
        res.status(500).send("Error generating finance plan.");
    }
});

// Other routes related to finance can be added here

module.exports = router;  // Export routes to be used in server.js
