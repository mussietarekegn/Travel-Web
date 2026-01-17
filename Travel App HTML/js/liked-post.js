document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".post");

  // Load liked posts from localStorage
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");

  posts.forEach(post => {
    const postId = post.dataset.id;
    const likeBtn = post.querySelector(".like-btn");

    // Check if this post is already liked
    if (likedPosts.includes(postId)) {
      likeBtn.style.color = "#66ff66"; // Green heart
      likeBtn.textContent = "❤️ Liked";
    }

    // Toggle like/unlike on click
    likeBtn.addEventListener("click", () => {
      if (likedPosts.includes(postId)) {
        // Remove from liked
        const index = likedPosts.indexOf(postId);
        likedPosts.splice(index, 1);
        likeBtn.style.color = "#fff";
        likeBtn.textContent = "❤️ Like";
      } else {
        // Add to liked
        likedPosts.push(postId);
        likeBtn.style.color = "#66ff66";
        likeBtn.textContent = "❤️ Liked";
      }

      // Save back to localStorage
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    });
  });
});
