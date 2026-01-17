document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("desc");
  const fileInput = document.getElementById("image");
  const thumbsContainer = document.querySelector(".thumbs");
  const statusText = document.querySelector(".form-actions .meta-row");
  const visibilityInputs = document.querySelectorAll('input[name="visibility"]');

  let selectedFiles = [];
  let isDirty = false;

  /* ===============================
     Helpers
  =============================== */

  function setStatus(text) {
    statusText.textContent = `Status: ${text}`;
  }

  function markDirty() {
    isDirty = true;
    setStatus("Draft");
  }

  function clearPreview() {
    thumbsContainer.innerHTML = "";
  }

  function createThumb(file, index) {
    const div = document.createElement("div");
    div.className = "thumb";

    if (file.type.startsWith("image")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.onload = () => URL.revokeObjectURL(img.src);
      div.appendChild(img);
    } else {
      div.textContent = "VIDEO";
    }

    div.title = "Click to remove";
    div.addEventListener("click", () => {
      selectedFiles.splice(index, 1);
      renderPreviews();
      markDirty();
    });

    return div;
  }

  function renderPreviews() {
    clearPreview();

    if (selectedFiles.length === 0) {
      thumbsContainer.innerHTML = "<p style='opacity:0.6'>No media selected</p>";
      return;
    }

    selectedFiles.forEach((file, i) => {
      thumbsContainer.appendChild(createThumb(file, i));
    });
  }

  function validateForm() {
    if (!titleInput.value.trim()) return false;
    if (![...visibilityInputs].some(v => v.checked)) return false;
    return true;
  }

  /* ===============================
     Media Upload Handling
  =============================== */

  fileInput.addEventListener("change", () => {
    const newFiles = Array.from(fileInput.files);

        for (let file of newFiles) {
            if (selectedFiles.length >= 5) {
            alert("You can upload a maximum of 5 images.");
            break;
            }

            // Prevent duplicates (same name + size)
            const exists = selectedFiles.some(
            f => f.name === file.name && f.size === file.size
            );

            if (!exists) {
            selectedFiles.push(file);
            }
        }

        fileInput.value = ""; 
        renderPreviews();
        markDirty();
  });


  /* Drag & Drop */
  thumbsContainer.addEventListener("dragover", e => {
    e.preventDefault();
    thumbsContainer.style.borderColor = "var(--green)";
  });

  thumbsContainer.addEventListener("dragleave", () => {
    thumbsContainer.style.borderColor = "";
  });

  thumbsContainer.addEventListener("drop", e => {
    e.preventDefault();
    thumbsContainer.style.borderColor = "";

    renderPreviews();
    markDirty();
  });

  thumbsContainer.addEventListener("drop", e => {
    e.preventDefault();
    thumbsContainer.style.borderColor = "";

    const droppedFiles = Array.from(e.dataTransfer.files);

    for (let file of droppedFiles) {
        if (selectedFiles.length >= 5) {
        alert("You can upload a maximum of 5 images.");
        break;
        }

        if (!file.type.startsWith("image") && !file.type.startsWith("video")) {
        continue;
        }

        const exists = selectedFiles.some(
        f => f.name === file.name && f.size === file.size
        );

        if (!exists) {
        selectedFiles.push(file);
        }
    }

    renderPreviews();
    markDirty();
  });


  /* ===============================
     Form Interactions
  =============================== */

  titleInput.focus();

  [titleInput, descInput].forEach(el => {
    el.addEventListener("input", markDirty);
  });

  visibilityInputs.forEach(radio => {
    radio.addEventListener("change", () => {
      if (validateForm()) {
        setStatus("Ready to post");
      }
      markDirty();
    });
  });

  /* Keyboard submit */
  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "Enter") {
      form.requestSubmit();
    }
  });

  /* ===============================
     Submit
  =============================== */

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    setStatus("Posting...");

    /* Simulated async post */
    setTimeout(() => {
      alert("Post created successfully!");

      form.reset();
      selectedFiles = [];
      renderPreviews();
      setStatus("Draft");
      isDirty = false;
    }, 900);
  });

  /* ===============================
     Leave Page Protection
  =============================== */

  window.addEventListener("beforeunload", e => {
    if (!isDirty) return;
    e.preventDefault();
    e.returnValue = "";
  });

  /* Initial state */
  renderPreviews();
});
