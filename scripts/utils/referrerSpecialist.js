// Function to determine specialist type from referrer URL
export function initializeSpecialistType() {
  // Get the heading element that needs to be modified
  const headingElement = document.querySelector(".section-title");

  if (headingElement) {
    // Default specialist type
    let specialistType = "voyant";

    // Get the referrer URL
    const referrer = document.referrer;

    // Determine specialist type based on referrer URL
    if (referrer) {
      if (referrer.includes("/mediumnite") || referrer.includes("/medium")) {
        specialistType = "médium";
      } else if (referrer.includes("/numerologie")) {
        specialistType = "numérologue";
      } else if (referrer.includes("/tarologie") || referrer.includes("/tarot")) {
        specialistType = "tarologue";
      } else if (referrer.includes("/astrologie")) {
        specialistType = "astrologue";
      }
    } else {
      // If no referrer, check the URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const type = urlParams.get("specialist");

      if (type) {
        switch (type.toLowerCase()) {
          case "medium":
            specialistType = "médium";
            break;
          case "numerologue":
            specialistType = "numérologue";
            break;
          case "tarologue":
            specialistType = "tarologue";
            break;
          case "astrologue":
            specialistType = "astrologue";
            break;
        }
      }
    }
    const headingHTML = headingElement.innerHTML;
    headingElement.innerHTML = headingHTML.replace(/voyant/g, specialistType);

    const pageTitle = document.title;
    if (pageTitle === "Votre contact | Consultation avec un voyant | Clairvoyances.fr") {
      document.title = `Votre contact | Consultation avec un ${specialistType} | Clairvoyances.fr`;
    }
  }
}
