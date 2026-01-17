// Load saved profile data from localStorage
const storedName = localStorage.getItem("profileName");
const storedLocation = localStorage.getItem("profileLocation");
const storedBio = localStorage.getItem("profileBio");
const storedPic = localStorage.getItem("profilePic");

if (storedName) {
  document.querySelector(".profile-info h1").textContent = storedName;
}

if (storedBio) {
  document.querySelector(".profile-info p:nth-of-type(1)").textContent = storedBio;
}

if (storedLocation) {
  document.querySelector(".profile-info p:nth-of-type(2)").innerHTML = `<strong>Location:</strong> ${storedLocation}`;
}

if (storedPic) {
  const img = document.createElement("img");
  img.src = storedPic;
  img.alt = "Profile Image";
  img.style.width = "150px";
  img.style.height = "150px";
  img.style.borderRadius = "50%";
  img.style.display = "block";
  img.style.marginBottom = "15px";

  // Add image to top of profile-info
  document.querySelector(".profile-info").prepend(img);
}