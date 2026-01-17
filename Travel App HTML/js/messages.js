document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const messagesBox = document.querySelector(".messages");
  const chatItems = document.querySelectorAll(".chat-item");

  const muteBtn = document.getElementById("muteBtn");
  const blockBtn = document.getElementById("blockBtn");
  const clearBtn = document.getElementById("clearBtn");

  function closePanels() {
    sidebar.classList.remove("open");
    details.classList.remove("open");
  }

  messagesBox.addEventListener("click", () => {
    closePanels();
  });
  
  messageInput.addEventListener("focus", () => {
    closePanels();
  });

  messageInput.addEventListener("input", () => {
    closePanels();
  });

  messagesBox.addEventListener("scroll", () => {
    closePanels();
  });


  // ===== CHAT STATE =====
  let activeChat = "John Doe";

  const chatData = {
    "John Doe": {
      messages: [
        { text: "Hey! How are you?", type: "incoming" },
        { text: "I'm good, you?", type: "outgoing" }
      ],
      muted: false,
      blocked: false
    },
    "Group Chat": {
      messages: [
        { text: "You: Sure, let's go.", type: "incoming" }
      ],
      muted: false,
      blocked: false
    },
    "Alex": {
      messages: [
        { text: "Typing...", type: "incoming" }
      ],
      muted: false,
      blocked: false
    }
  };

  // ===== FUNCTIONS =====

  function renderMessages() {
    messagesBox.innerHTML = "";

    chatData[activeChat].messages.forEach(msg => {
      const div = document.createElement("div");
      div.className = `message ${msg.type}`;
      div.textContent = msg.text;
      messagesBox.appendChild(div);
    });

    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    if (chatData[activeChat].blocked) {
      alert("You have blocked this chat.");
      return;
    }

    if (chatData[activeChat].muted) {
      alert("This chat is muted.");
      return;
    }

    chatData[activeChat].messages.push({
      text,
      type: "outgoing"
    });

    messageInput.value = "";
    renderMessages();

    closePanels();
  }

  function switchChat(chatName) {
  activeChat = chatName;

  // Highlight active chat
  chatItems.forEach(item => item.classList.remove("active"));
  document
    .querySelector(`.chat-item[data-chat="${chatName}"]`)
    .classList.add("active");

  // Update header title
  document.getElementById("chatTitle").textContent = chatName;

  // Update avatar initials
  const initials = chatName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  document.getElementById("chatAvatar").textContent = initials;

  // Update status text
  const statusEl = document.getElementById("chatStatus");
  statusEl.textContent =
    chatData[chatName].blocked
      ? "Blocked"
      : chatData[chatName].muted
      ? "Muted"
      : "Online";

  statusEl.className = "status " +
    (chatData[chatName].blocked ? "" : "online");

  document.getElementById("detailsName").textContent = chatName;
  document.getElementById("detailsAvatar").textContent = initials;

  renderMessages();

  closePanels();
}

// ===== MOBILE PANELS =====
const sidebar = document.querySelector(".sidebar");
const details = document.querySelector(".details");

document.getElementById("openSidebar").addEventListener("click", () => {
  sidebar.classList.toggle("open");
  details.classList.remove("open");
});

document.getElementById("openDetails").addEventListener("click", () => {
  details.classList.toggle("open");
  sidebar.classList.remove("open");
});

// Close sidebar after selecting chat (mobile UX)
chatItems.forEach(item => {
  item.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});

  // ===== EVENTS =====

  sendBtn.addEventListener("click", sendMessage);

  messageInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  chatItems.forEach(item => {
    item.addEventListener("click", () => {
      switchChat(item.dataset.chat);
    });
  });

  muteBtn.addEventListener("click", () => {
    chatData[activeChat].muted = !chatData[activeChat].muted;
    muteBtn.textContent = chatData[activeChat].muted
      ? "Unmute Chat"
      : "Mute Chat";
  });

  blockBtn.addEventListener("click", () => {
    chatData[activeChat].blocked = !chatData[activeChat].blocked;
    blockBtn.textContent = chatData[activeChat].blocked
      ? "Unblock User"
      : "Block User";
  });

  clearBtn.addEventListener("click", () => {
    if (!confirm("Clear all messages in this chat?")) return;
    chatData[activeChat].messages = [];
    renderMessages();
  });

  // ===== INIT =====
  renderMessages();
});
