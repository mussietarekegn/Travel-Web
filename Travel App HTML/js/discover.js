// Highlight active nav link
const navLinks = document.querySelectorAll(".nav a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.style.color = "#00c853";
        link.style.textDecoration = "underline";
    }
});

// Search functionality
const input = document.querySelector(".search-box input");
const button = document.querySelector(".search-box button");
const trips = document.querySelectorAll(".trip-card");

function filterTrips() {
    const query = input.value.toLowerCase();

    trips.forEach((trip) => {
        const text = trip.textContent.toLowerCase();
        if (text.includes(query)) {
            trip.style.display = "block";
        } else {
            trip.style.display = "none";
        }
    });
}

input.addEventListener("input", filterTrips);
button.addEventListener("click", filterTrips);

// Animate trip cards on scroll
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

trips.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "0.6s ease";
    observer.observe(card);
});

// Allow users to mark trips as "Interested"
let savedTrips = JSON.parse(localStorage.getItem("savedTrips")) || [];

trips.forEach((card, index) => {
    const btn = document.createElement("button");
    btn.textContent = "☆ Save";
    btn.style.marginTop = "10px";
    btn.style.background = "transparent";
    btn.style.border = "1px solid #00c853";
    btn.style.color = "#00c853";
    btn.style.padding = "6px 12px";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";

    if (savedTrips.includes(index)) {
        btn.textContent = "★ Saved";
        btn.style.background = "#00c853";
        btn.style.color = "#000";
    }

    btn.addEventListener("click", () => {
        if (savedTrips.includes(index)) {
            savedTrips = savedTrips.filter((i) => i !== index);
            btn.textContent = "☆ Save";
            btn.style.background = "transparent";
            btn.style.color = "#00c853";
        } else {
            savedTrips.push(index);
            btn.textContent = "★ Saved";
            btn.style.background = "#00c853";
            btn.style.color = "#000";
        }
        localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
    });

    card.appendChild(btn);
});
