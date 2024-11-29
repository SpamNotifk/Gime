// script.js
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const startBtn = document.getElementById("start-btn");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let speed = 2000; // السرعة الابتدائية

// إضافة الأحداث للنقر أو اللمس
function setupJumpEvents() {
  document.addEventListener("click", handleJump); // لأجهزة الكمبيوتر
  document.addEventListener("touchstart", handleJump); // لأجهزة اللمس
}

// وظيفة القفز
function handleJump() {
  if (!isJumping) {
    jump();
  }
}

function jump() {
  isJumping = true;
  let jumpHeight = 0;
  const upInterval = setInterval(() => {
    if (jumpHeight >= 150) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        jumpHeight -= 5;
        player.style.bottom = `${jumpHeight + 100}px`;
      }, 20);
    }
    jumpHeight += 5;
    player.style.bottom = `${jumpHeight + 100}px`;
  }, 20);
}

// التحقق من الاصطدام
let collisionCheck;
function startCollisionCheck() {
  collisionCheck = setInterval(() => {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      playerRect.right > obstacleRect.left &&
      playerRect.left < obstacleRect.right &&
      playerRect.bottom > obstacleRect.top
    ) {
      alert(`لقد خسرت! نقاطك: ${score}`);
      location.reload();
    }
  }, 10);
}

// زيادة السرعة مع الوقت
function increaseSpeed() {
  setInterval(() => {
    if (speed > 500) {
      speed -= 100; // تقليل مدة الحركة لزيادة السرعة
      obstacle.style.animationDuration = `${speed / 1000}s`;
    }
  }, 5000); // كل 5 ثوانٍ تزداد السرعة
}

// زيادة النقاط
function increaseScore() {
  setInterval(() => {
    score++;
    scoreDisplay.textContent = `النقاط: ${score}`;
  }, 1000); // النقاط تزيد كل ثانية
}

// بدء اللعبة
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  obstacle.style.display = "block";
  obstacle.style.animationDuration = `${speed / 1000}s`; // تعيين مدة الحركة
  setupJumpEvents(); // تفعيل أحداث القفز
  startCollisionCheck();
  increaseSpeed();
  increaseScore();
});
