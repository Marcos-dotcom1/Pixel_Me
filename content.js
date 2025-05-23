const buddy = document.createElement("img");
buddy.src = chrome.runtime.getURL("images/pixel_me.png");
buddy.style.position = "fixed";
buddy.style.bottom = "0px";
buddy.style.left = "0px";
buddy.style.zIndex = "99999";
buddy.style.width = "64px";
buddy.style.cursor = "pointer";
buddy.style.userSelect = "none";
document.body.appendChild(buddy);

// --- Direction Facing & Walking ---
let direction = 1;
let position = 0;
setInterval(() => {
  position += 3 * direction;
  if (position > window.innerWidth - 64 || position < 0) {
    direction *= -1;
    buddy.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";
  }
  buddy.style.left = `${position}px`;
}, 30);

// --- Cute Speech Bubble ---
function showSpeech(text) {
  const bubble = document.createElement("div");
  bubble.textContent = text;
  bubble.style.position = "fixed";
  bubble.style.bottom = "80px";
  bubble.style.left = `${position}px`;
  bubble.style.maxWidth = "200px";
  bubble.style.background = "#fff";
  bubble.style.color = "#333";
  bubble.style.border = "2px solid #555";
  bubble.style.borderRadius = "15px";
  bubble.style.padding = "8px 12px";
  bubble.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
  bubble.style.fontSize = "14px";
  bubble.style.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.2)";
  bubble.style.zIndex = "100000";
  bubble.style.transition = "opacity 0.5s";
  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.style.opacity = "0";
    setTimeout(() => bubble.remove(), 500);
  }, 3000);
}

// --- Random Quotes ---
const messages = [
  "Hey there! 👋",
  "Remember to breathe. 🌬️",
  "You're crushing it! 💪",
  "Keep it up! ⭐",
  "Pixel power! ⚡",
];
setInterval(() => {
  showSpeech(messages[Math.floor(Math.random() * messages.length)]);
}, 30000);

// --- Idle Reminder ---
let idleTimer;
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    showSpeech("You've been idle... take a stretch! 🧘");
  }, 60000);
}
["mousemove", "keydown", "scroll"].forEach((evt) =>
  document.addEventListener(evt, resetIdleTimer)
);
resetIdleTimer();

// --- Hydration Reminder ---
setInterval(() => {
  showSpeech("💧 Time to hydrate!");
}, 1000 * 60 * 20);
