// Country code selector functionality
export function initializeCountryCodeSelector() {
  const countryCodeButton = document.getElementById("countryCodeButton");
  const countryCodeDropdown = document.getElementById("countryCodeDropdown");
  const countrySearch = document.getElementById("countrySearch");
  const countryItems = document.querySelectorAll(".country-item");
  const selectedFlag = document.getElementById("selectedFlag");
  const selectedCountryCode = document.getElementById("selectedCountryCode");
  const countryCodeHidden = document.getElementById("countryCodeHidden");
  const phoneInput = document.getElementById("phone");

  // If country selector elements don't exist, exit
  if (!countryCodeButton || !countryCodeDropdown) return;

  // Toggle dropdown visibility
  countryCodeButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = countryCodeDropdown.classList.contains("open");

    // Close dropdown if it's open
    if (isOpen) {
      closeDropdown();
    } else {
      // Open dropdown
      countryCodeDropdown.classList.add("open");
      countryCodeButton.classList.add("active");
    }
  });

  // Close dropdown function
  function closeDropdown() {
    countryCodeDropdown.classList.remove("open");
    countryCodeButton.classList.remove("active");
  }

  // Handle country selection
  countryItems.forEach((item) => {
    item.addEventListener("click", () => {
      selectCountry(item);
    });

    // For keyboard accessibility
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCountry(item);
      }
    });
  });

  // Select country function
  function selectCountry(item) {
    const code = item.getAttribute("data-code");
    const country = item.getAttribute("data-country");
    const flagImg = item.querySelector(".country-flag").src;

    // Update the UI with selected country
    selectedFlag.src = flagImg;
    selectedCountryCode.textContent = `${country}`;

    // Update the hidden input with the country code
    if (countryCodeHidden) {
      countryCodeHidden.value = code;
    }

    // Format the placeholder based on selected country
    updatePhoneInputPlaceholder(country);

    // Close the dropdown
    closeDropdown();

    // Focus the phone input
    phoneInput.focus();
  }

  // Update phone input placeholder based on selected country
  function updatePhoneInputPlaceholder(country) {
    switch (country) {
      case "FR":
        phoneInput.placeholder = "06 XX XX XX XX";
        break;
      case "BE":
        phoneInput.placeholder = "047X XX XX XX";
        break;
      case "CH":
        phoneInput.placeholder = "076 XXX XX XX";
        break;
      case "LU":
        phoneInput.placeholder = "621 XXX XXX";
        break;
      case "CA":
        phoneInput.placeholder = "(514) XXX-XXXX";
        break;
      case "MC":
        phoneInput.placeholder = "97 XX XX XX";
        break;
      case "GP":
        phoneInput.placeholder = "690 XX XX XX";
        break;
      case "MQ":
        phoneInput.placeholder = "696 XX XX XX";
        break;
      default:
        phoneInput.placeholder = "Votre numéro";
    }
  }

  // Enable keyboard navigation between country items
  countryItems.forEach((item, index) => {
    item.setAttribute("tabindex", "0"); // Make focusable

    item.addEventListener("keydown", (event) => {
      const visibleItems = Array.from(countryItems).filter((item) => item.style.display !== "none");
      const currentIndex = visibleItems.indexOf(item);

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (currentIndex < visibleItems.length - 1) {
            visibleItems[currentIndex + 1].focus();
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (currentIndex > 0) {
            visibleItems[currentIndex - 1].focus();
          }
          break;
        case "Escape":
          event.preventDefault();
          closeDropdown();
          countryCodeButton.focus();
          break;
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (
      countryCodeDropdown.classList.contains("open") &&
      !countryCodeButton.contains(event.target) &&
      !countryCodeDropdown.contains(event.target)
    ) {
      closeDropdown();
    }
  });

  // Initialize the placeholder format based on default country
  updatePhoneInputPlaceholder("FR");
}
