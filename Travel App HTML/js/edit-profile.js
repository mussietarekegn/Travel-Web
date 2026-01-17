// References to form elements
const form = document.getElementById("editForm");
const nameInput = document.getElementById("name");
const locationInput = document.getElementById("location");
const bioInput = document.getElementById("bio");

// Handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Stop page reload

  // Save profile data to localStorage
  localStorage.setItem("profileName", nameInput.value);
  localStorage.setItem("profileLocation", locationInput.value);
  localStorage.setItem("profileBio", bioInput.value);

  alert("Profile updated successfully!");
});
