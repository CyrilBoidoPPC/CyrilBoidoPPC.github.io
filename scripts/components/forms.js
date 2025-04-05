// Form elements functionality
export function initializeForms() {
  // Initialize main textarea form
  initializeMainForm();
  // Initialize compact forms
  initializeCompactForms();
}

function initializeMainForm() {
  const textareas = document.querySelectorAll(".hero-form-cta textarea");

  textareas.forEach((textarea) => {
    const formGroup = textarea.closest("div");
    const charCount = formGroup.querySelector(".char-counter span");
    const clearButton = formGroup.querySelector(".clear-button");

    if (!textarea || !charCount || !clearButton) return;

    // Set initial height and count
    setTimeout(function () {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      charCount.textContent = textarea.value.length;
    }, 0);

    // Update height and count on input
    textarea.addEventListener("input", function () {
      // Auto-resize
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";

      // Update character count
      charCount.textContent = this.value.length;

      // Change color when approaching limit
      if (this.value.length > 180) {
        charCount.style.color = "#DE3163";
        charCount.style.fontWeight = "bold";
        charCount.style.fontSize = "1rem";
      } else {
        charCount.style.color = "#777";
        charCount.style.fontWeight = "normal";
        charCount.style.fontSize = "0.8rem";
      }

      toggleClearButton(clearButton, this);
    });

    // Set up clear functionality
    clearButton.addEventListener("click", () => {
      textarea.value = "";
      charCount.textContent = "0";
      toggleClearButton(clearButton, textarea);
      textarea.focus();
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";

      // Reset character count styling
      charCount.style.color = "#777";
      charCount.style.fontWeight = "normal";
      charCount.style.fontSize = "0.8rem";
    });

    // Initial visibility check
    toggleClearButton(clearButton, textarea);
  });
}

function initializeCompactForms() {
  const compactForms = document.querySelectorAll(".compact-cta-form");

  compactForms.forEach((form) => {
    const inputWrapper = form.querySelector(".compact-cta-input-wrapper");
    if (!inputWrapper) return;

    const textarea = inputWrapper.querySelector("textarea");
    const clearButton = inputWrapper.querySelector(".clear-button.compact");

    if (!textarea || !clearButton) return;

    // Set initial height
    setTimeout(function () {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }, 0);

    textarea.addEventListener("input", function () {
      // Auto-resize
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";

      // Toggle clear button
      toggleClearButton(clearButton, this);
    });

    clearButton.addEventListener("click", () => {
      textarea.value = "";
      toggleClearButton(clearButton, textarea);
      textarea.focus();

      // Reset height when cleared
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });

    // Check initial state
    toggleClearButton(clearButton, textarea);
  });
}

// Helper function to toggle clear button visibility
function toggleClearButton(clearButton, inputElement) {
  if (inputElement.value.length > 0) {
    clearButton.classList.add("visible");
  } else {
    clearButton.classList.remove("visible");
  }
}
