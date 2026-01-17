// Highlight active navigation link based on current page
const navLinks = document.querySelectorAll(".nav a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.style.color = "#00c853";
        link.style.textDecoration = "underline";
    }
});

// Typewriter effect for the main heading
const heading = document.querySelector("section h2");
const text = heading.textContent;
heading.textContent = "";

let i = 0;
function typeEffect() {
    if (i < text.length) {
        heading.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 40);
    }
}
typeEffect();

// Animate feature cards on hover
const cards = document.querySelectorAll(".feature-card");

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-6px) scale(1.02)";
        card.style.transition = "0.3s ease";
        card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.6)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
        card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.4)";
    });
});

// Reveal cards when they enter the viewport
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.2 },
);

cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "0.6s ease";
    observer.observe(card);
});

// Simple welcome toast
function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#00c853";
    toast.style.color = "#000";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "6px";
    toast.style.fontWeight = "bold";
    toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
    toast.style.zIndex = "1000";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

window.addEventListener("load", () => {
    showToast("Welcome to Guzo! Start your journey 🌍");
});
