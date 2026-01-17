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