// DOM Elements
const clockFace = document.getElementById("clockFace");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const digitalTime = document.getElementById("digitalTime");
const digitalDate = document.getElementById("digitalDate");
const themeToggle = document.getElementById("themeToggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const particlesContainer = document.getElementById("particles");

// Create tick marks and hour numbers
function createClockMarkings() {
  // Create hour numbers
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement("div");
    number.className = "hour-number";
    number.textContent = i;

    // Position numbers around the clock
    const angle = i * 30 * (Math.PI / 180);
    const radius = clockFace.offsetWidth / 2 - 40;
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;

    number.style.left = `calc(50% + ${x}px)`;
    number.style.top = `calc(50% + ${y}px)`;
    number.style.transform = "translate(-50%, -50%)";

    clockFace.appendChild(number);
  }

  // Create tick marks
  for (let i = 0; i < 60; i++) {
    const tick = document.createElement("div");

    if (i % 5 === 0) {
      tick.className = "tick main";
    } else {
      tick.className = "tick";
    }

    const angle = i * 6;
    tick.style.transform = `rotate(${angle}deg) translateY(-${
      clockFace.offsetWidth / 2 - 10
    }px)`;

    clockFace.appendChild(tick);
  }
}

// Update clock hands
function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Calculate angles with smooth transitions for seconds and minutes
  const secondAngle = (seconds + milliseconds / 1000) * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = (hours + minutes / 60) * 30;

  // Apply rotations
  secondHand.style.transform = `rotate(${secondAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  hourHand.style.transform = `rotate(${hourAngle}deg)`;

  // Update digital time
  const timeString = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  digitalTime.textContent = timeString;

  // Update digital date
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  digitalDate.textContent = dateString;

  // Continue animation
  requestAnimationFrame(updateClock);
}

// Create animated background particles
function createParticles() {
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;

    // Random animation delay and duration
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }
}

// Theme toggle functionality
function setupThemeToggle() {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");

    if (currentTheme === "light") {
      document.body.removeAttribute("data-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.body.setAttribute("data-theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // Neon theme buttons
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      themeButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      // Apply selected theme
      const theme = button.getAttribute("data-theme");
      applyNeonTheme(theme);
    });
  });
}

// Apply neon theme colors
function applyNeonTheme(theme) {
  const root = document.documentElement;

  switch (theme) {
    case "default":
      root.style.setProperty("--second-hand", "#00ffff");
      root.style.setProperty("--hour-hand", "#9b59b6");
      root.style.setProperty("--glow-color", "rgba(0, 255, 255, 0.7)");
      break;
    case "purple":
      root.style.setProperty("--second-hand", "#bf00ff");
      root.style.setProperty("--hour-hand", "#ff00ff");
      root.style.setProperty("--glow-color", "rgba(191, 0, 255, 0.7)");
      break;
    case "cyan":
      root.style.setProperty("--second-hand", "#00ffff");
      root.style.setProperty("--hour-hand", "#00bfff");
      root.style.setProperty("--glow-color", "rgba(0, 255, 255, 0.7)");
      break;
    case "amber":
      root.style.setProperty("--second-hand", "#ff9900");
      root.style.setProperty("--hour-hand", "#ff3300");
      root.style.setProperty("--glow-color", "rgba(255, 153, 0, 0.7)");
      break;
  }
}

// Initialize the clock
function initClock() {
  createClockMarkings();
  createParticles();
  setupThemeToggle();
  updateClock();
}

// Start when DOM is loaded
document.addEventListener("DOMContentLoaded", initClock);
