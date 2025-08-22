// === AJUSTES RÁPIDOS ===
const BIRTHDAY = { month: 8, day: 27 }; // mes 1-12, día 1-31
const NAME = "Danna Sophia"; // nombre de la cumpleañera

// === LÓGICA DEL CONTADOR ===
const countdownContainer = document.getElementById("countdown-container");
const celebration = document.getElementById("celebration");
const resetBtn = document.getElementById("reset");

// 🎶 Referencia al audio (asegúrate de tener un <audio id="birthday-song"> en tu HTML)
const song = document.getElementById("birthday-song");

function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let next = new Date(year, BIRTHDAY.month - 1, BIRTHDAY.day);

  // 👉 Si HOY es el cumpleaños, devolvemos hoy
  if (
    now.getDate() === BIRTHDAY.day &&
    now.getMonth() === BIRTHDAY.month - 1
  ) {
    return now;
  }

  // 👉 Si ya pasó en este año, saltamos al siguiente
  if (next < now) {
    next = new Date(year + 1, BIRTHDAY.month - 1, BIRTHDAY.day);
  }
  return next;
}

let birthday = getNextBirthday();

function updateCountdown() {
  const now = new Date();
  const diff = birthday - now;

  if (diff <= 0) {
    showCelebration();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

function showCelebration() {
  countdownContainer.style.display = "none";
  celebration.style.display = "block";
  celebration.querySelector("h1").textContent = `⚡ ¡Feliz Cumple, ${NAME}! ⚡`;

  // 🎶 Inicia la música en bucle
  if (song) {
    song.play().catch(err => console.log("Autoplay bloqueado:", err));
  }

  startConfetti();
}

resetBtn.addEventListener("click", () => {
  birthday = getNextBirthday();
  celebration.style.display = "none";
  countdownContainer.style.display = "block";

  // 🎶 Detener música al resetear
  if (song) {
    song.pause();
    song.currentTime = 0;
  }
});

// === CONFETTI ===
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function Confetto() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.size = Math.random() * 7 + 3;
  this.speed = Math.random() * 3 + 2;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.speed;
    if (c.y > canvas.height) confetti[i] = new Confetto();
  });
  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  confetti = Array.from({ length: 150 }, () => new Confetto());
  drawConfetti();
}

setInterval(updateCountdown, 1000);
updateCountdown();
