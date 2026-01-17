document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM ELEMENTS =====
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const messagesBox = document.querySelector(".messages");
  const chatItems = document.querySelectorAll(".chat-item");

  const muteBtn = document.getElementById("muteBtn");
  const blockBtn = document.getElementById("blockBtn");
  const clearBtn = document.getElementById("clearBtn");

  const sidebar = document.querySelector(".sidebar");
  const details = document.querySelector(".details");

  const STORAGE_KEY = "chatAppData";

  // ===== CHAT DATA =====
  let chatData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
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

  let activeChat = "John Doe"; // ✅ MUST come before using it

  function saveChatData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatData));
  }

  // ===== PANEL FUNCTIONS =====
  function closePanels() {
    sidebar.classList.remove("open");
    details.classList.remove("open");
  }

  // ===== RENDER FUNCTIONS =====
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

  function updateChatStatus() {
    const statusEl = document.getElementById("chatStatus");
    statusEl.textContent = chatData[activeChat].blocked
      ? "Blocked"
      : chatData[activeChat].muted
      ? "Muted"
      : "Online";

    statusEl.className = "status " + (chatData[activeChat].blocked ? "" : "online");
  }

  function switchChat(chatName) {
    activeChat = chatName;

    // Highlight active chat
    chatItems.forEach(item => item.classList.remove("active"));
    document.querySelector(`.chat-item[data-chat="${chatName}"]`).classList.add("active");

    // Update header
    document.getElementById("chatTitle").textContent = chatName;
    const initials = chatName.split(" ").map(w => w[0]).join("").toUpperCase();
    document.getElementById("chatAvatar").textContent = initials;
    document.getElementById("detailsName").textContent = chatName;
    document.getElementById("detailsAvatar").textContent = initials;

    updateChatStatus();
    renderMessages();
    closePanels();
  }

  // ===== SEND MESSAGE =====
  function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    if (chatData[activeChat].blocked) {
      alert("You have blocked this chat.");
      return;
    }

    chatData[activeChat].messages.push({ text, type: "outgoing" });
    messageInput.value = "";
    renderMessages();
    saveChatData();
    closePanels();
  }

  // ===== EVENTS =====
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  chatItems.forEach(item => {
    item.addEventListener("click", () => switchChat(item.dataset.chat));
  });

  muteBtn.addEventListener("click", () => {
    chatData[activeChat].muted = !chatData[activeChat].muted;
    muteBtn.textContent = chatData[activeChat].muted ? "Unmute Chat" : "Mute Chat";
    updateChatStatus();
    saveChatData();
  });

  blockBtn.addEventListener("click", () => {
    chatData[activeChat].blocked = !chatData[activeChat].blocked;
    blockBtn.textContent = chatData[activeChat].blocked ? "Unblock User" : "Block User";
    updateChatStatus();
    saveChatData();
  });

  clearBtn.addEventListener("click", () => {
    if (!confirm("Clear all messages in this chat?")) return;
    chatData[activeChat].messages = [];
    renderMessages();
    saveChatData();
  });

  // ===== MOBILE PANELS =====
  document.getElementById("openSidebar").addEventListener("click", () => {
    sidebar.classList.toggle("open");
    details.classList.remove("open");
  });

  document.getElementById("openDetails").addEventListener("click", () => {
    details.classList.toggle("open");
    sidebar.classList.remove("open");
  });

  messagesBox.addEventListener("click", closePanels);
  messageInput.addEventListener("focus", closePanels);
  messageInput.addEventListener("input", closePanels);
  messagesBox.addEventListener("scroll", closePanels);

  // ===== INITIAL RENDER =====
  renderMessages();
  updateChatStatus();
});
