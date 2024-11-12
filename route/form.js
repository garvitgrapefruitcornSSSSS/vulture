// form.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    // Basic validation before submitting the form
    form.addEventListener('submit', function (e) {
        // Example validation check: ensure monthly income is a positive number
        const monthlyIncome = document.getElementById('monthly_income');
        const savingsBalance = document.getElementById('savings_balance');

        if (monthlyIncome.value <= 0) {
            alert('Monthly Income must be a positive number.');
            e.preventDefault(); // Prevent form submission
            return;
        }

        if (savingsBalance.value < 0) {
            alert('Savings Balance cannot be negative.');
            e.preventDefault(); // Prevent form submission
            return;
        }

        // Add additional validations as necessary
    });
});



