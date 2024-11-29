
const questions = document.querySelectorAll('.question'); // All question elements
const steps = document.querySelectorAll('.circle'); // Step indicators
const nextButton = document.querySelector('#next-btn'); // Next button
const prevButton = document.querySelector('#previous-btn'); // Previous button

let currentStep = 0;


function initQuiz() {
    updateUI();
    prevButton.disabled = true; // Disable "Previous" button at the start
}

// Update UI for current step
function updateUI() {
    // Show the current question and hide others
    questions.forEach((question, index) => {
        question.classList.toggle('active-question', index === currentStep);
    });

    // Smooth scroll to the active question
    const activeQuestion = document.querySelector('.active-question');
    if (activeQuestion) {
        activeQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Update step indicators
    steps.forEach((step, index) => {
        step.classList.toggle('active', index <= currentStep);
    });

    // Update button visibility and text
    prevButton.style.visibility = currentStep === 0 ? 'hidden' : 'visible'; // Hide previous button on the first step
    nextButton.textContent = currentStep === questions.length - 1 ? 'Finish' : 'Next Question'; // Change next button text on last step
    prevButton.disabled = currentStep === 0; // Disable "Previous" button on the first question
}

// Validate the current step
function validateStep() {
    const currentInputs = questions[currentStep].querySelectorAll('input[type="radio"]');
    return Array.from(currentInputs).some(input => input.checked);
}

// Event Listeners for Buttons
nextButton.addEventListener('click', () => {
    if (!validateStep()) {
        alert('Please select an answer before proceeding.');
        return;
    }
    if (currentStep < questions.length - 1) {
        currentStep++;
        updateUI();
    } else {
        alert('Quiz completed! Submitting...');
        // Add form submission logic here
    }
});

prevButton.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Initialize the quiz on page load
initQuiz();