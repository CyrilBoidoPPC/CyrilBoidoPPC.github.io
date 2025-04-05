// Form elements functionality
export function initializeForms() {
  const textarea = document.getElementById("userQuestion");
  const charCount = document.getElementById("charCount");
  const clearButton = document.querySelector(".clear-button");
  const compactInput = document.getElementById("compactQuestion");
  const compactClearButton = document.querySelector(".clear-button.compact");

  // Textarea functionality
  if (textarea && charCount) {
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

      toggleClearButton();
    });
  }

  // Clear button functionality for main form
  function toggleClearButton() {
    if (textarea && textarea.value.length > 0) {
      clearButton.classList.add("visible");
    } else if (textarea) {
      clearButton.classList.remove("visible");
    }
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (textarea) {
        textarea.value = "";
        if (charCount) charCount.textContent = "0";
        toggleClearButton();
        textarea.focus();
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    });
  }

  // Initial visibility check
  if (textarea) toggleClearButton();

  // Compact form clear button functionality
  if (compactInput && compactClearButton) {
    compactInput.addEventListener("input", function () {
      if (this.value.length > 0) {
        compactClearButton.classList.add("visible");
      } else {
        compactClearButton.classList.remove("visible");
      }
    });

    compactClearButton.addEventListener("click", () => {
      compactInput.value = "";
      compactClearButton.classList.remove("visible");
      compactInput.focus();
    });

    // Check initial state
    if (compactInput.value.length > 0) {
      compactClearButton.classList.add("visible");
    }
  }
}
