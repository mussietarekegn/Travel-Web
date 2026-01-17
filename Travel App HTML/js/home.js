// =============================
// HOME PAGE JAVASCRIPT
// =============================

document.addEventListener("DOMContentLoaded", () => {
  likePost();
  commentPost();
  searchPosts();
  navigation();
});

// =============================
// LIKE BUTTON FUNCTIONALITY
// =============================
function likePost() {
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const post = btn.closest(".post");
      const likesDiv = post.querySelector(".likes");

      let likes = parseInt(likesDiv.textContent.match(/\d+/)[0]);

      if (btn.classList.contains("liked")) {
        likes--;
        btn.classList.remove("liked");
        btn.textContent = "Like";
      } else {
        likes++;
        btn.classList.add("liked");
        btn.textContent = "Liked ❤️";
      }

      likesDiv.textContent = `❤️ ${likes} likes`;
    });
  });
}

// =============================
// COMMENT BUTTON FUNCTIONALITY
// =============================
function commentPost() {
  const commentButtons = document.querySelectorAll(".comment-btn");

  commentButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const post = btn.closest(".post");
      const commentsDiv = post.querySelector(".comments");

      const commentText = prompt("Enter your comment:");
      if (commentText && commentText.trim() !== "") {
        const p = document.createElement("p");
        p.innerHTML = `<strong>You:</strong> ${commentText}`;
        commentsDiv.appendChild(p);
      }
    });
  });
}

// =============================
// SEARCH POSTS
// =============================
function searchPosts() {
  const searchInput = document.querySelector(".search-bar input");

  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {
      const username = post.querySelector(".username").textContent.toLowerCase();
      const text = post.textContent.toLowerCase();

      if (username.includes(filter) || text.includes(filter)) {
        post.style.display = "flex";
      } else {
        post.style.display = "none";
      }
    });
  });
}