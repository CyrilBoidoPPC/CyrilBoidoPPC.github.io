export function initializeHeader() {
  // Get all interactive elements
  const toggles = document.querySelectorAll(".dropdown-toggle");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navbarMenu = document.querySelector(".navbar-menu");
  const dropdowns = document.querySelectorAll(".dropdown");
  const menuItems = document.querySelectorAll(".dropdown-menu a[role='menuitem']");

  // Toggle dropdown menus
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      const parentDropdown = toggle.closest(".dropdown");
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      // Toggle the current dropdown
      toggle.setAttribute("aria-expanded", !isExpanded);
      parentDropdown.classList.toggle("open");

      // Close other dropdowns
      toggles.forEach((otherToggle) => {
        if (otherToggle !== toggle && otherToggle.getAttribute("aria-expanded") === "true") {
          otherToggle.setAttribute("aria-expanded", "false");
          otherToggle.closest(".dropdown").classList.remove("open");
        }
      });

      // Prevent the click from bubbling to document
      event.stopPropagation();
    });

    // Add keyboard support for dropdown toggles
    toggle.addEventListener("keydown", (event) => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      const dropdownMenu = toggle.nextElementSibling;
      const firstMenuItem = dropdownMenu.querySelector("[role='menuitem']");

      switch (event.key) {
        case "Enter":
        case " ":
          // Toggle dropdown
          event.preventDefault();
          toggle.click();

          // If opening the dropdown, focus the first menu item
          if (!isExpanded && firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
          }
          break;

        case "Escape":
          // Close dropdown
          if (isExpanded) {
            event.preventDefault();
            toggle.setAttribute("aria-expanded", "false");
            toggle.closest(".dropdown").classList.remove("open");
            toggle.focus();
          }
          break;

        case "ArrowDown":
          // Open dropdown and focus first item
          if (!isExpanded && firstMenuItem) {
            event.preventDefault();
            toggle.click();
            setTimeout(() => firstMenuItem.focus(), 100);
          }
          break;
      }
    });
  });

  // Toggle mobile menu
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
      const isExpanded = hamburgerMenu.getAttribute("aria-expanded") === "true";
      hamburgerMenu.setAttribute("aria-expanded", !isExpanded);
      navbarMenu.classList.toggle("open");
      hamburgerMenu.classList.toggle("active");

      if (isExpanded) {
        // Close all dropdowns when closing the hamburger menu
        toggles.forEach((toggle) => {
          toggle.setAttribute("aria-expanded", "false");
          toggle.closest(".dropdown").classList.remove("open");
        });
      }

      // If opening the menu, trap focus within it
      if (!isExpanded) {
        // Optional: focus the first element in the mobile menu
        const firstInteractive = navbarMenu.querySelector("button, a");
        if (firstInteractive) setTimeout(() => firstInteractive.focus(), 100);
      }
    });

    // Add keyboard support to hamburger menu
    hamburgerMenu.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        hamburgerMenu.click();
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    // Check if click was outside nav area
    const isOutsideNav = !event.target.closest(".navbar");

    if (isOutsideNav) {
      // Close all dropdowns
      toggles.forEach((toggle) => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.closest(".dropdown").classList.remove("open");
      });

      // Close mobile menu if open
      if (hamburgerMenu && hamburgerMenu.getAttribute("aria-expanded") === "true") {
        hamburgerMenu.setAttribute("aria-expanded", "false");
        navbarMenu.classList.remove("open");
        hamburgerMenu.classList.remove("active");
      }
    }
  });

  // Stop propagation on menu clicks to prevent immediate closure
  navbarMenu.addEventListener("click", (event) => {
    // Only stop propagation if clicking within the menu (not the toggle)
    if (!event.target.closest(".dropdown-toggle")) {
      event.stopPropagation();
    }
  });

  // Add keyboard navigation within dropdown menus
  menuItems.forEach((item) => {
    item.addEventListener("keydown", (event) => {
      const parentMenu = item.closest(".dropdown-menu");
      const menuItemsList = Array.from(parentMenu.querySelectorAll("[role='menuitem']"));
      const currentIndex = menuItemsList.indexOf(item);
      const parentToggle = item.closest(".dropdown").querySelector(".dropdown-toggle");

      switch (event.key) {
        case "ArrowDown":
          // Move to next item, or loop to first
          event.preventDefault();
          const nextItem = menuItemsList[currentIndex + 1] || menuItemsList[0];
          nextItem.focus();
          break;

        case "ArrowUp":
          // Move to previous item, or loop to last
          event.preventDefault();
          const prevItem = menuItemsList[currentIndex - 1] || menuItemsList[menuItemsList.length - 1];
          prevItem.focus();
          break;

        case "Escape":
          // Close dropdown and return focus to toggle
          event.preventDefault();
          parentToggle.setAttribute("aria-expanded", "false");
          parentToggle.closest(".dropdown").classList.remove("open");
          parentToggle.focus();
          break;

        case "Tab":
          // If tabbing from last item, close dropdown
          if (!event.shiftKey && currentIndex === menuItemsList.length - 1) {
            parentToggle.setAttribute("aria-expanded", "false");
            parentToggle.closest(".dropdown").classList.remove("open");
          }
          break;

        case "Home":
          // Jump to first menu item
          event.preventDefault();
          menuItemsList[0].focus();
          break;

        case "End":
          // Jump to last menu item
          event.preventDefault();
          menuItemsList[menuItemsList.length - 1].focus();
          break;
      }
    });
  });

  // Optional: Add click handler for menu items to close parent dropdown after selection
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const parentToggle = item.closest(".dropdown").querySelector(".dropdown-toggle");
      parentToggle.setAttribute("aria-expanded", "false");
      parentToggle.closest(".dropdown").classList.remove("open");
    });
  });

  // Handle window resize - close mobile menu on desktop size
  window.addEventListener("resize", () => {
    // Close mobile menu if window is resized to desktop width
    const isDesktop = window.innerWidth >= 1026; // Same breakpoint as your CSS

    if (isDesktop && hamburgerMenu && hamburgerMenu.getAttribute("aria-expanded") === "true") {
      hamburgerMenu.setAttribute("aria-expanded", "false");
      navbarMenu.classList.remove("open");
      hamburgerMenu.classList.remove("active");
    }
  });

  // Initialize all aria-expanded attributes to ensure they match the initial state
  toggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
  });

  if (hamburgerMenu) {
    hamburgerMenu.setAttribute("aria-expanded", "false");
  }
}
