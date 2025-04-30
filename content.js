const buddy = document.createElement("img");
buddy.src = chrome.runtime.getURL("images/pixel_me.png");
buddy.style.position = "fixed";
buddy.style.bottom = "0px";
buddy.style.left = "0px";
buddy.style.zIndex = "99999";
buddy.style.width = "64px";
buddy.style.cursor = "pointer";
document.body.appendChild(buddy);

let direction = 1;
setInterval(() => {
  let left = parseInt(buddy.style.left);
  left += 3 * direction;
  if (left > window.innerWidth - 64 || left < 0) direction *= -1;
  buddy.style.left = `${left}px`;
}, 30);

buddy.addEventListener("click", () => {
  alert("Yo, I'm Pixel Marcos!");
});
