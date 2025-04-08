export function initializeBirthdateFields() {
  const daySelect = document.getElementById("birthdate-day");
  const monthSelect = document.getElementById("birthdate-month");
  const yearSelect = document.getElementById("birthdate-year");
  const hiddenBirthdateInput = document.getElementById("birthdate");

  // Populate days (1-31)
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i < 10 ? `0${i}` : `${i}`;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // Populate months (use French month names)
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  months.forEach((month, index) => {
    const option = document.createElement("option");
    // Month values need to be 0-indexed for the Date constructor
    option.value = index < 9 ? `0${index + 1}` : `${index + 1}`;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  // Populate years (from current year - 18 down to current year - 100)
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 18;
  const endYear = currentYear - 100;

  for (let i = startYear; i >= endYear; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }

  // Update the hidden input when any select changes
  [daySelect, monthSelect, yearSelect].forEach((select) => {
    select.addEventListener("change", updateHiddenDateInput);
  });

  function updateHiddenDateInput() {
    if (daySelect.value && monthSelect.value && yearSelect.value) {
      // Format as YYYY-MM-DD for the hidden input
      hiddenBirthdateInput.value = `${yearSelect.value}-${monthSelect.value}-${daySelect.value}`;
    }
  }
}
