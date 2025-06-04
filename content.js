const buddy = document.createElement("img");
buddy.src = chrome.runtime.getURL("images/pixel_me.png");
buddy.style.position = "fixed";
buddy.style.bottom = "0px";
buddy.style.left = "0px";
buddy.style.zIndex = "99999";
buddy.style.width = "64px";
buddy.style.cursor = "pointer";
buddy.style.userSelect = "none";
buddy.style.transition = "none"; // Disable transitions for smooth animation control
document.body.appendChild(buddy);

// --- Animation State ---
let direction = 1;
let position = 0;
let isFalling = false;
let fallPosition = 0;
let walkingInterval;
let fallingInterval;

// --- Walking Animation ---
function startWalking() {
  if (walkingInterval) return; // Already walking

  walkingInterval = setInterval(() => {
    if (isFalling) return;

    position += 3 * direction;
    if (position > window.innerWidth - 64 || position < 0) {
      direction *= -1;
      buddy.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";
    }
    buddy.style.left = `${position}px`;
  }, 30);
}

function stopWalking() {
  if (walkingInterval) {
    clearInterval(walkingInterval);
    walkingInterval = null;
  }
}

// --- Falling Animation ---
function startFalling() {
  if (isFalling) return; // Already falling

  isFalling = true;
  stopWalking();

  // Get current position to fall from
  const currentBottom = parseInt(buddy.style.bottom) || 0;
  fallPosition = currentBottom;

  // Falling animation frames
  const fallingFrames = [
    chrome.runtime.getURL("images/pixel_me_fall1.png"),
    chrome.runtime.getURL("images/pixel_me_fall2.png"),
    chrome.runtime.getURL("images/pixel_me_fall3.png"),
  ];

  let frameIndex = 0;
  let fallSpeed = 0;
  const gravity = 0.8;
  const maxFallSpeed = 15;

  // Pre-load images to avoid loading issues during animation
  const preloadedImages = [];
  let imagesLoaded = 0;

  // Try to preload images, but don't wait for them
  fallingFrames.forEach((src, index) => {
    const img = new Image();
    img.onload = () => {
      preloadedImages[index] = src;
      imagesLoaded++;
      console.log(`Loaded falling frame ${index}: ${src}`);
    };
    img.onerror = () => {
      preloadedImages[index] = null; // Mark as failed
      imagesLoaded++;
      console.log(`Failed to load falling frame ${index}: ${src}`);
    };
    img.src = src;
  });

  fallingInterval = setInterval(() => {
    // Update fall physics
    fallSpeed += gravity;
    if (fallSpeed > maxFallSpeed) fallSpeed = maxFallSpeed;

    fallPosition -= fallSpeed;

    // Calculate frame index
    frameIndex =
      Math.floor((currentBottom - fallPosition) / 20) % fallingFrames.length;

    // Try to use preloaded image, fallback to CSS animation
    if (preloadedImages[frameIndex]) {
      // Image is available, use it
      buddy.src = preloadedImages[frameIndex];
      buddy.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";
    } else {
      // Image not available, use CSS rotation fallback
      const rotation = ((currentBottom - fallPosition) * 5) % 360;
      buddy.style.transform = `${
        direction === 1 ? "scaleX(1)" : "scaleX(-1)"
      } rotate(${rotation}deg)`;
    }

    // Update position
    buddy.style.bottom = `${Math.max(fallPosition, 0)}px`;

    // Check if hit ground
    if (fallPosition <= 0) {
      // Impact effect
      buddy.style.bottom = "0px";
      buddy.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";

      // Bounce effect
      buddy.style.transition = "transform 0.2s ease-out";
      buddy.style.transform += " scaleY(0.8)";

      setTimeout(() => {
        buddy.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";
        buddy.style.transition = "none";

        // Reset to normal sprite
        buddy.src = chrome.runtime.getURL("images/pixel_me.png");

        // Reset falling state and resume walking
        isFalling = false;
        clearInterval(fallingInterval);
        fallingInterval = null;

        // Resume walking after a short delay
        setTimeout(() => {
          startWalking();
        }, 1000);
      }, 200);
    }
  }, 80);
}

// --- Click Handler ---
buddy.addEventListener("click", (e) => {
  e.preventDefault();
  startFalling();
});

// Start initial walking
startWalking();

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
  "If it works, it works. Don't overthink it. 🛠️",
  "Failure's just plot development. 📖",
  "You vs yesterday's you? You're winning. 🥇",
  "Today's vibe: mildly chaotic but functional. 🔥",
  "You're someone's reason to smile today.",
  "Look at you, being awesome and stuff. 🔥",
  "Take a break before your brain melts. 🧠💥",
  "Stay weird. It suits you. 🖤",
  "Your future self is watching like 'nice one.'",
  "You're allowed to be proud of yourself. ⚡",
  "Hey, you exist — and that's kinda epic. ✨",
  "Normal's boring. Be interesting. ⚡",
  "Reminder: sleep is a thing. Occasionally do that. 🌙",
  "Being normal is exhausting. Stay weird. ⚙️",
  "When in doubt, fake confidence. Works 80% of the time. 😎",
  "If this sucks, blame the universe. Or me. I can take it. 😅",
  "You're built for cooler things than average people stuff. 🔥",
  "I don't chase vibes. I am the vibe. ⚡",
  "Some people wish they were me. I get it. ",
  "Yeah, I'm overthinking this — but at least I'm smart enough to. 🧠",
  "Another day, another flawless performance by me.",
  "Look at me go, pretending to care. Iconic. ✌️",
  "If confidence was a currency, I'd own this place. 💸",
  "This brain? Wasted on mortal tasks like this. 📱",
  "I don't need luck. I make things happen. 🎲",
  "I'm not arrogant. I'm just aware. 👑",
  "Perfection? Nah. I'm what perfection wants to be when it grows up. 🖤",
  "Plot twist: I'm always right. 📖",
  "Normal's boring. Fortunately, I'm allergic to it. ⚙️",
  "Why fit in when you can stand above?",
  "If you don't hear from me, assume I'm busy being legendary. 📡",
  "Time isn't real. That's why I'm never late.",
  "Overthinking is just the brain doing parkour.",
  "Your comfort zone called. I blocked its number.",
  "Silence speaks volumes, but I'm usually too loud to hear it.",
  "Gravity is just a suggestion. 🚀",
  "Watch this! *does something cool* ⭐",
];

// Only show random messages when not falling
setInterval(() => {
  if (!isFalling) {
    showSpeech(messages[Math.floor(Math.random() * messages.length)]);
  }
}, 30000);

// --- Idle Reminder ---
let idleTimer;
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (!isFalling) {
      showSpeech("You've been idle... Watcha doin?");
    }
  }, 240000);
}
["mousemove", "keydown", "scroll"].forEach((evt) =>
  document.addEventListener(evt, resetIdleTimer)
);
resetIdleTimer();

// --- Hydration Reminder ---
setInterval(() => {
  if (!isFalling) {
    showSpeech("💧 Time to hydrate!");
  }
}, 1000 * 60 * 20);
