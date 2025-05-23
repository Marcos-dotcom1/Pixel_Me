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
  "Hey, you're doing better than you think. ✌️",
  "If life gives you lemons, trade them for a guitar. 🍋🎸",
  "If it works, it works. Don’t overthink it. 🛠️",
  "Failure’s just plot development. 📖",
  "You vs yesterday’s you? You’re winning. 🥇",
  "Today’s vibe: mildly chaotic but functional. 🔥",
  "You’re someone’s reason to smile today.",
  "Look at you, being awesome and stuff. 🔥",
  "Take a break before your brain melts. 🧠💥",
  "Stay weird. It suits you. 🖤",
  "Your future self is watching like 'nice one.'",
  "You’re allowed to be proud of yourself. ⚡",
  "Hey, you exist — and that’s kinda epic. ✨",
  "Normal’s boring. Be interesting. ⚡",
  "Reminder: sleep is a thing. Occasionally do that. 🌙",
  "Being normal is exhausting. Stay weird. ⚙️",
  "When in doubt, fake confidence. Works 80% of the time. 😎",
  "If this sucks, blame the universe. Or me. I can take it. 😅",
  "You’re built for cooler things than average people stuff. 🔥",
  "I don't chase vibes. I am the vibe. ⚡",
  "Some people wish they were me. I get it. ",
  "Yeah, I'm overthinking this — but at least I'm smart enough to. 🧠",
  "Another day, another flawless performance by me.",
  "Look at me go, pretending to care. Iconic. ✌️",
  "If confidence was a currency, I'd own this place. 💸",
  "This brain? Wasted on mortal tasks like this. 📱",
  "I don’t need luck. I make things happen. 🎲",
  "I’m not arrogant. I’m just aware. 👑",
  "Perfection? Nah. I'm what perfection wants to be when it grows up. 🖤",
  "Plot twist: I'm always right. 📖",
  "Normal's boring. Fortunately, I’m allergic to it. ⚙️",
  "Why fit in when you can stand above?",
  "If you don't hear from me, assume I'm busy being legendary. 📡",
  "Time isn’t real. That’s why I’m never late.",
  "Overthinking is just the brain doing parkour.",
  "Your comfort zone called. I blocked its number.",
  "Silence speaks volumes, but I’m usually too loud to hear it.",
];
setInterval(() => {
  showSpeech(messages[Math.floor(Math.random() * messages.length)]);
}, 60000);

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
