const getData = (k, d) => JSON.parse(localStorage.getItem(k)) || d;
const setData = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let likes = getData("likes", {});
let comments = getData("comments", {});
let activePost = null;
let editIndex = null;

/* LIKE SYSTEM */
document.querySelectorAll(".post").forEach(post => {
  const id = post.dataset.id;
  const likeBtn = post.querySelector(".like-btn");
  const likesText = post.querySelector(".likes");
  let count = parseInt(likesText.textContent.match(/\d+/)[0]);

  if (likes[id]) {
    likeBtn.classList.add("liked");
    likesText.textContent = `❤️ ${count + 1} likes`;
  }

  likeBtn.onclick = () => {
    likes[id] = !likes[id];
    likeBtn.classList.toggle("liked");
    count += likes[id] ? 1 : -1;
    likesText.textContent = `❤️ ${count} likes`;
    setData("likes", likes);
  };
});

/* COMMENT MODAL */
const modal = document.getElementById("comment-modal");
const input = document.getElementById("comment-input");

document.querySelectorAll(".comment-btn").forEach(btn => {
  btn.onclick = () => {
    activePost = btn.closest(".post").dataset.id;
    editIndex = null;
    input.value = "";
    modal.classList.remove("hidden");
  };
});

document.getElementById("close-comment").onclick = () =>
  modal.classList.add("hidden");

document.getElementById("save-comment").onclick = () => {
  if (!input.value.trim()) return;

  comments[activePost] = comments[activePost] || [];

  if (editIndex !== null) {
    comments[activePost][editIndex] = input.value;
  } else {
    comments[activePost].push(input.value);
  }

  setData("comments", comments);
  renderComments(activePost);
  modal.classList.add("hidden");
};

/* RENDER COMMENTS */
function renderComments(postId) {
  const box = document.querySelector(`.post[data-id="${postId}"] .comments`);
  box.innerHTML = "";

  (comments[postId] || []).forEach((text, index) => {
    const p = document.createElement("p");

    p.innerHTML = `
      <strong>You:</strong> ${text}
      <span class="comment-controls">
        <button class="edit-comment" data-index="${index}">Edit</button>
        <button class="delete-comment" data-index="${index}">Delete</button>
      </span>
    `;

    box.appendChild(p);
  });

  /* EDIT */
  box.querySelectorAll(".edit-comment").forEach(btn => {
    btn.onclick = () => {
      editIndex = btn.dataset.index;
      input.value = comments[postId][editIndex];
      modal.classList.remove("hidden");
    };
  });

  /* DELETE */
  box.querySelectorAll(".delete-comment").forEach(btn => {
    btn.onclick = () => {
      const i = btn.dataset.index;
      comments[postId].splice(i, 1);
      setData("comments", comments);
      renderComments(postId);
    };
  });
}

/* LOAD SAVED COMMENTS */
Object.keys(comments).forEach(renderComments);

/* SEARCH */
document.querySelector(".search-bar input").oninput = e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".post").forEach(post => {
    post.style.display = post.innerText.toLowerCase().includes(term)
      ? "block"
      : "none";
  });
};
