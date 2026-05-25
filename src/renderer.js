let selectedDuration = 60000; // default 1m
let countdownInterval;
let endTime;

const homeView = document.getElementById('home-view');
const lockView = document.getElementById('lock-view');
const timeBtns = document.querySelectorAll('.time-btn');
const lockBtn = document.getElementById('lock-btn');
const unlockBtn = document.getElementById('unlock-btn');
const countdownText = document.getElementById('countdown-text');
const circle = document.querySelector('.progress-ring__circle');

// Setup progress ring
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}

// Duration selection
timeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    timeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDuration = parseInt(btn.getAttribute('data-time'));
  });
});

// Lock action
lockBtn.addEventListener('click', async () => {
  // Switch UI to lock view
  homeView.classList.remove('active');
  lockView.classList.add('active');
  
  // Start countdown visual
  startCountdown(selectedDuration);
  
  // Tell main process to lock keyboard
  await window.keyshield.lock(selectedDuration);
});

// Unlock action
unlockBtn.addEventListener('click', async () => {
  await window.keyshield.unlock();
  handleUnlock();
});

// Main process tells us it was unlocked (e.g. by timer expiring)
window.keyshield.onUnlocked(() => {
  handleUnlock();
});

function handleUnlock() {
  clearInterval(countdownInterval);
  lockView.classList.remove('active');
  homeView.classList.add('active');
}

function startCountdown(durationMs) {
  endTime = Date.now() + durationMs;
  
  // Initial update
  updateCountdownDisplay(durationMs, durationMs);
  
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const remaining = endTime - Date.now();
    
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      updateCountdownDisplay(0, durationMs);
      return;
    }
    
    updateCountdownDisplay(remaining, durationMs);
  }, 100);
}

function updateCountdownDisplay(remaining, total) {
  // Format time (MM:SS)
  const secondsLeft = Math.ceil(remaining / 1000);
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');
  
  countdownText.textContent = `${m}:${s}`;
  
  // Update circle progress
  const percent = (remaining / total) * 100;
  setProgress(percent);
}
