// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navbar toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("open") ? "true" : "false"
    );
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// Fade-in on scroll (Intersection Observer)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Smooth scrolling for same-page anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Simple contact form validation
const form = document.getElementById("contact-form");
const statusEl = document.querySelector(".form-status");

function setError(name, message) {
  const el = document.querySelector(`[data-error-for="${name}"]`);
  if (el) el.textContent = message || "";
}

function validateEmail(email) {
  // Basic email format check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let valid = true;

    // Name
    if (!name || name.length < 2) {
      setError("name", "Please enter your name.");
      valid = false;
    } else {
      setError("name", "");
    }

    // Email
    if (!email || !validateEmail(email)) {
      setError("email", "Please enter a valid email.");
      valid = false;
    } else {
      setError("email", "");
    }

    // Message
    if (!message || message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      valid = false;
    } else {
      setError("message", "");
    }

    if (!valid) return;

    // Submit to API
    statusEl.textContent = "Sending...";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (res.ok) {
        statusEl.textContent = "Thanks! Your message has been sent.";
        form.reset();
        setTimeout(() => {
          statusEl.textContent = "";
        }, 3000);
      } else {
        statusEl.textContent = data.error || "Error sending message.";
      }
    } catch (err) {
      console.error("Error:", err);
      statusEl.textContent = "Error sending message. Please try again.";
    }
  });
}
