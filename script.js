const floatingDecor = document.getElementById("floatingDecor");
const petalLayer = document.getElementById("petalLayer");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const questionZone = document.getElementById("questionZone");
const questionResponse = document.getElementById("questionResponse");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseReveal = document.getElementById("surpriseReveal");
const heartBurst = document.getElementById("heartBurst");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const volumeControl = document.getElementById("volumeControl");
const musicStatus = document.getElementById("musicStatus");
const typingText = document.getElementById("typingText");
const daysValue = document.getElementById("daysValue");
const hoursValue = document.getElementById("hoursValue");
const minutesValue = document.getElementById("minutesValue");
const secondsValue = document.getElementById("secondsValue");
const countdownNote = document.getElementById("countdownNote");
const slidePrev = document.getElementById("slidePrev");
const slideNext = document.getElementById("slideNext");
const slidesTrack = document.getElementById("slidesTrack");
const slideDots = document.getElementById("slideDots");

let musicPlaying = false;
let typingLineIndex = 0;
let typingCharIndex = 0;
let deletingText = false;
let currentSlideIndex = 0;

const typingLines = [
  "I'm lucky to have you, Neha ❤️",
  "You are my happiness 🌸",
  "Forever grateful for you 💖",
];
const birthdayMonthIndex = 6;
const birthdayDay = 20;
const slideItems = slidesTrack ? Array.from(slidesTrack.children) : [];

function createFloatingDecor() {
  const symbols = ["❤", "✨", "♡", "💖", "•"];

  for (let i = 0; i < 24; i += 1) {
    const item = document.createElement("span");
    item.className = "float-item";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.fontSize = `${Math.random() * 18 + 14}px`;
    item.style.animationDuration = `${Math.random() * 10 + 10}s`;
    item.style.animationDelay = `${Math.random() * 8}s`;
    floatingDecor.appendChild(item);
  }
}

function createFallingPetals() {
  if (!petalLayer) {
    return;
  }

  const petalSymbols = ["❀", "✿", "❁"];

  for (let i = 0; i < 18; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.fontSize = `${Math.random() * 14 + 12}px`;
    petal.style.animationDuration = `${Math.random() * 8 + 10}s`;
    petal.style.animationDelay = `${Math.random() * 8}s`;
    petal.style.setProperty("--petal-drift", `${Math.random() * 160 - 80}px`);
    petalLayer.appendChild(petal);
  }
}

function moveNoButton() {
  const zoneRect = questionZone.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const maxX = Math.max(0, zoneRect.width - buttonRect.width);
  const maxY = Math.max(0, zoneRect.height - buttonRect.height);

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noButton.style.position = "absolute";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

function celebrateYes() {
  questionResponse.textContent = "Yay! That’s the best birthday gift for me ❤️";
  questionResponse.style.opacity = "1";
  yesButton.textContent = "Always ❤️";
}

function createHeartBurst() {
  heartBurst.innerHTML = "";

  for (let i = 0; i < 12; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = i % 2 === 0 ? "❤" : "✨";
    heart.style.setProperty("--x-shift", `${Math.random() * 180 - 90}px`);
    heart.style.setProperty("--y-shift", `${Math.random() * 45}px`);
    heart.style.animationDelay = `${i * 0.08}s`;
    heartBurst.appendChild(heart);
  }
}

function launchConfetti() {
  const layer = document.createElement("div");
  layer.className = "confetti-layer";

  const colors = ["#ffd166", "#ff7aa2", "#ffffff", "#ffc6e0", "#f3a712"];

  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.opacity = `${Math.random() * 0.4 + 0.55}`;
    piece.style.animationDuration = `${Math.random() * 2 + 2.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    layer.appendChild(piece);
  }

  document.body.appendChild(layer);

  window.setTimeout(() => {
    layer.remove();
  }, 4200);
}

async function toggleMusic() {
  try {
    if (!musicPlaying) {
      await bgMusic.play();
      musicPlaying = true;
      musicToggle.textContent = "Pause Music 🎵";
      musicToggle.setAttribute("aria-pressed", "true");
      if (musicStatus) {
        musicStatus.textContent = "Now playing a sweet song for Neha. 🎶";
      }
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicToggle.textContent = "Play Music 🎵";
      musicToggle.setAttribute("aria-pressed", "false");
      if (musicStatus) {
        musicStatus.textContent = "Music paused, but the love is still playing. ✨";
      }
    }
  } catch (error) {
    musicToggle.textContent = "Tap Again for Music 🎵";
    if (musicStatus) {
      musicStatus.textContent = "Your browser blocked autoplay, tap once more for the music.";
    }
    console.error("Audio playback failed:", error);
  }
}

function openSurprise() {
  surpriseReveal.classList.remove("hidden");
  createHeartBurst();
  launchConfetti();
  surpriseButton.textContent = "Surprise Opened ❤️";
  surpriseButton.disabled = true;
  surpriseButton.style.opacity = "0.88";
}

function startTypingEffect() {
  if (!typingText) {
    return;
  }

  const currentLine = typingLines[typingLineIndex];

  if (!deletingText) {
    typingText.textContent = currentLine.slice(0, typingCharIndex + 1);
    typingCharIndex += 1;

    if (typingCharIndex === currentLine.length) {
      deletingText = true;
      window.setTimeout(startTypingEffect, 1600);
      return;
    }

    window.setTimeout(startTypingEffect, 85);
    return;
  }

  typingText.textContent = currentLine.slice(0, typingCharIndex - 1);
  typingCharIndex -= 1;

  if (typingCharIndex === 0) {
    deletingText = false;
    typingLineIndex = (typingLineIndex + 1) % typingLines.length;
  }

  window.setTimeout(startTypingEffect, deletingText ? 45 : 130);
}

function getNextBirthdayDate(now = new Date()) {
  let nextBirthday = new Date(now.getFullYear(), birthdayMonthIndex, birthdayDay, 0, 0, 0, 0);

  if (now > nextBirthday) {
    nextBirthday = new Date(now.getFullYear() + 1, birthdayMonthIndex, birthdayDay, 0, 0, 0, 0);
  }

  return nextBirthday;
}

function formatCountdownUnit(value) {
  return String(value).padStart(2, "0");
}

function updateBirthdayCountdown() {
  if (!daysValue || !hoursValue || !minutesValue || !secondsValue || !countdownNote) {
    return;
  }

  const now = new Date();
  const targetDate = getNextBirthdayDate(now);
  const timeLeft = targetDate.getTime() - now.getTime();

  if (timeLeft <= 0) {
    daysValue.textContent = "00";
    hoursValue.textContent = "00";
    minutesValue.textContent = "00";
    secondsValue.textContent = "00";
    countdownNote.textContent = "It's Neha's birthday today. Celebrate her with all your heart! ❤️";
    return;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysValue.textContent = formatCountdownUnit(days);
  hoursValue.textContent = formatCountdownUnit(hours);
  minutesValue.textContent = formatCountdownUnit(minutes);
  secondsValue.textContent = formatCountdownUnit(seconds);
  countdownNote.textContent = `Counting down to 20 July ${targetDate.getFullYear()} for Neha. ✨`;
}

function buildSlideDots() {
  if (!slideDots || slideItems.length === 0) {
    return;
  }

  slideDots.innerHTML = "";

  slideItems.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    slideDots.appendChild(dot);
  });
}

function updateSlideDots() {
  if (!slideDots) {
    return;
  }

  Array.from(slideDots.children).forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlideIndex);
  });
}

function goToSlide(index) {
  if (!slidesTrack || slideItems.length === 0) {
    return;
  }

  currentSlideIndex = (index + slideItems.length) % slideItems.length;
  slidesTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  updateSlideDots();
}

function nextSlide() {
  goToSlide(currentSlideIndex + 1);
}

function previousSlide() {
  goToSlide(currentSlideIndex - 1);
}

createFloatingDecor();
createFallingPetals();
startTypingEffect();
updateBirthdayCountdown();
if (bgMusic) {
  bgMusic.volume = 0.6;
}
window.setInterval(updateBirthdayCountdown, 1000);
buildSlideDots();
goToSlide(0);

yesButton.addEventListener("click", celebrateYes);

// Move the No button on hover for desktop and on touch/click for mobile.
["mouseenter", "click", "touchstart"].forEach((eventName) => {
  noButton.addEventListener(eventName, (event) => {
    event.preventDefault();
    moveNoButton();
  });
});

surpriseButton.addEventListener("click", openSurprise);
musicToggle.addEventListener("click", toggleMusic);
if (volumeControl && bgMusic) {
  volumeControl.addEventListener("input", (event) => {
    bgMusic.volume = Number(event.target.value);
    if (musicStatus) {
      musicStatus.textContent = `Volume set to ${Math.round(bgMusic.volume * 100)}% for Neha's song.`;
    }
  });
}
if (slidePrev) {
  slidePrev.addEventListener("click", () => {
    previousSlide();
  });
}

if (slideNext) {
  slideNext.addEventListener("click", () => {
    nextSlide();
  });
}

window.addEventListener("resize", () => {
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.position = "relative";
});
