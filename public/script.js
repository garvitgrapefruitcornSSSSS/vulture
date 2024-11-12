// Save user data and redirect to the finance plan page
function generateFinancePlan() {
    const name = document.getElementById("name").value;
    const income = parseFloat(document.getElementById("income").value);
    const expenses = parseFloat(document.getElementById("expenses").value);
    const savings = parseFloat(document.getElementById("savings").value);
    const riskTolerance = document.getElementById("riskTolerance").value;

    // Check if all inputs are filled
    if (!name || isNaN(income) || isNaN(expenses) || isNaN(savings) || !riskTolerance) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const financePlan = {
        name,
        advice: "",
        riskLevel: riskTolerance,
    };

    // Basic financial logic based on income and expenses
    if (income > expenses * 1.5) {
        financePlan.advice = "You're in a strong financial position! Consider high-growth investments.";
    } else if (income > expenses) {
        financePlan.advice = "Good financial health! Balanced investments can help you grow safely.";
    } else {
        financePlan.advice = "Try increasing savings first; low-risk investments are recommended.";
    }

    // Store financePlan in localStorage to pass it to the financeplan.html page
    localStorage.setItem("financePlan", JSON.stringify(financePlan));

    // Redirect to the finance plan page
    window.location.href = "financeplan.html"; // Updated to match the actual filename
}

// Display finance plan on the financeplan.html page
window.onload = function () {
    if (window.location.pathname.endsWith("financeplan.html")) {
        const planData = JSON.parse(localStorage.getItem("financePlan"));

        if (planData) {
            document.getElementById("planOutput").innerHTML = `
                <p><strong>Name:</strong> ${planData.name}</p>
                <p><strong>Risk Tolerance:</strong> ${planData.riskLevel}</p>
                <p><strong>Investment Advice:</strong> ${planData.advice}</p>
            `;
        } else {
            document.getElementById("planOutput").innerHTML = "<p>No finance plan data found.</p>";
        }
    }
};

