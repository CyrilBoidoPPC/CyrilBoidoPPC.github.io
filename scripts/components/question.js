// Initialize all question forms to save data and redirect
export function initializeQuestionHandling() {
  // Get all forms that should be handled by this module
  const mainForm = document.querySelector(".hero-form-cta");
  const compactForms = document.querySelectorAll(".compact-cta-form");

  // Initialize the main form if it exists
  if (mainForm) {
    mainForm.addEventListener("submit", handleFormSubmit);
  }

  // Initialize all compact forms
  if (compactForms.length > 0) {
    compactForms.forEach((form) => {
      form.addEventListener("submit", handleFormSubmit);
    });
  }
}

// Handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get the question from the form
  let questionValue = "";
  if (event.target.classList.contains("hero-form-cta")) {
    // Main form with textarea
    questionValue = event.target.querySelector('textarea[name="userQuestion"]').value;
  } else {
    // Compact form with input
    questionValue = event.target.querySelector('textarea[name="userQuestion"]').value;
  }

  // Validate question
  if (!questionValue || questionValue.trim().length < 3) {
    alert("Veuillez poser une question plus détaillée.");
    return;
  }

  // Store the question in sessionStorage (or localStorage for persistence)
  sessionStorage.setItem("userQuestion", questionValue);

  // Redirect to the details page
  window.location.href = "/demande/details.html";
}
