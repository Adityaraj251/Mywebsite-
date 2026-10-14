/* ADI WEBDEVELOPER — edit contact and social settings here. */
const SITE_CONFIG = {
  owner: "Aditya Raj",
  whatsappNumber: "917780078796", // Country code 91 + supplied number
  email: "rajadigupta251@gmail.com",
  instagramUrl: "", // Add the verified profile URL, e.g. https://www.instagram.com/yourhandle/
  linkedinUrl: ""   // Add the verified profile URL, e.g. https://www.linkedin.com/in/your-profile/
};

const whatsappUrl = (message) =>
  `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-whatsapp='general']").forEach((link) => {
  link.href = whatsappUrl("Hello Aditya, I'm interested in getting a website for my business. Can we discuss the requirements and pricing?");
});
document.querySelectorAll("[data-wa-message]").forEach((link) => {
  link.href = whatsappUrl(link.dataset.waMessage);
});

const socialLinks = [
  { key: "linkedin", url: SITE_CONFIG.linkedinUrl },
  { key: "instagram", url: SITE_CONFIG.instagramUrl }
];
socialLinks.forEach(({ key, url }) => {
  if (!url || !/^https:\/\/(www\.)?(linkedin\.com|instagram\.com)\//i.test(url)) return;
  document.querySelectorAll(`[data-social="${key}"]`).forEach((link) => {
    link.href = url;
    link.hidden = false;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
});

// Sticky-header styling and active section navigation.
const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
function updateScrollState() {
  header?.classList.toggle("scrolled", window.scrollY > 12);
  let current = "top";
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 140) current = section.id;
  });
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

// Mobile navigation: supports keyboard use and closes after choosing a destination.
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
function closeMenu() {
  navMenu?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
}
menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navMenu?.classList.toggle("open", !isOpen);
});
navMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuToggle?.focus();
  }
});
document.addEventListener("click", (event) => {
  if (navMenu?.classList.contains("open") && !navMenu.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
});

// Reveal sections only when motion is allowed; otherwise keep everything visible.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Pointer tilt only on devices that have a fine pointer; no forced tilt on touch.
const tiltCard = document.querySelector("#tilt-card");
if (tiltCard && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  const art = tiltCard.closest(".hero-art");
  art?.addEventListener("pointermove", (event) => {
    const rect = art.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `rotateY(${-11 + x * 7}deg) rotateX(${4 - y * 5}deg) rotateZ(${-1.5 + x * 1.5}deg)`;
  });
  art?.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "";
  });
}

// Native browser validation + Netlify Forms handles the actual POST.
// Never show a success state on this page: success is only shown by thank-you.html after submission.
const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  const requiredFields = contactForm.querySelectorAll("[required]");
  let firstInvalid = null;
  requiredFields.forEach((field) => {
    const invalid = !field.checkValidity();
    field.setAttribute("aria-invalid", String(invalid));
    if (invalid && !firstInvalid) firstInvalid = field;
  });
  if (firstInvalid) {
    event.preventDefault();
    firstInvalid.reportValidity();
    firstInvalid.focus();
  }
});
contactForm?.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.checkValidity()) field.removeAttribute("aria-invalid");
  });
});
