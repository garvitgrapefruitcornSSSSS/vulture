const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userMessage = document.getElementById("userMessage");

// Questions and keys to store responses
const botQuestions = [
    { question: "Are you interested in saving, investing, or tax planning?", key: "interest" },
    { question: "What’s your current monthly savings or investment amount?", key: "monthlyAmount" },
    { question: "Do you have any specific financial goals, like buying a home or saving for retirement?", key: "goal" },
    { question: "When would you like to achieve this goal? (e.g., 5 years)", key: "timeframe" },
    { question: "What's your preferred level of risk: low, medium, or high?", key: "riskLevel" }
];

// Store user responses
let userResponses = {};
let currentQuestionIndex = 0;

// Add message to chat box
function addMessage(content, isBot = true) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(isBot ? "bot-message" : "user-message");
    messageDiv.innerHTML = `<p>${content}</p>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Generate a basic financial plan based on user responses
function generateFinancialPlan() {
    const { interest, monthlyAmount, goal, timeframe, riskLevel } = userResponses;

    let planMessage = "Here’s a simple financial plan based on your responses:<br>";

    // Example plan generation based on inputs
    if (interest === "saving") {
        planMessage += `- **Savings Plan**: Aim to save at least ${monthlyAmount} per month.<br>`;
        planMessage += `- **Goal**: ${goal} within ${timeframe} years. Consider opening a high-yield savings account.<br>`;
    } else if (interest === "investing") {
        planMessage += `- **Investment Strategy**: With a ${riskLevel} risk tolerance, you can allocate ${monthlyAmount} monthly to a mix of stocks and bonds.<br>`;
        planMessage += `- **Goal**: ${goal} in ${timeframe} years. Review investment options like mutual funds, ETFs, or stocks.<br>`;
    } else if (interest === "tax planning") {
        planMessage += `- **Tax Planning Advice**: Based on your monthly contributions of ${monthlyAmount}, explore tax-saving instruments like PPF, ELSS, or NPS.<br>`;
        planMessage += `- **Goal**: Maximize tax benefits while achieving ${goal} within ${timeframe} years.<br>`;
    }

    planMessage += `<br>For more personalized advice, consider consulting a financial advisor or exploring advanced planning tools.`;

    addMessage(planMessage);
}

// Ask the next question or generate the financial plan
function askNextQuestion() {
    if (currentQuestionIndex < botQuestions.length) {
        const { question } = botQuestions[currentQuestionIndex];
        addMessage(question);
    } else {
        // All questions answered, generate the financial plan
        generateFinancialPlan();
    }
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const userText = userMessage.value.trim();
    if (userText === "") return;

    // Display user's response
    addMessage(userText, false);

    // Save the response to the respective key
    const currentQuestion = botQuestions[currentQuestionIndex];
    userResponses[currentQuestion.key] = userText;

    // Move to the next question
    currentQuestionIndex++;
    askNextQuestion();

    // Clear input
    userMessage.value = "";
});

// Start chatbot with the first question
askNextQuestion();

