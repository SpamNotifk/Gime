// script.js

const playerDefaultImage = "https://thef2l-51c302fdbd2c.herokuapp.com/dl/6748a927f9729cc228605556";
const policeDefaultImage = "https://thef2l-51c302fdbd2c.herokuapp.com/dl/6748a962f9729cc228605558";
const obstacleDefaultImage = "https://thef2l-51c302fdbd2c.herokuapp.com/dl/6748a956f9729cc228605557";

let playerImg = new Image();
playerImg.src = playerDefaultImage;

let policeImg = new Image();
policeImg.src = policeDefaultImage;

let obstacleImg = new Image();
obstacleImg.src = obstacleDefaultImage;

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let gameInterval;
let player = { x: 50, y: 300, width: 50, height: 50, dy: 0, jumping: false };
let police = { x: 0, y: 300, width: 50, height: 50 };
let obstacles = [];
let score = 0;

// إعداد اللعبة
function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  player.y = 300;
  player.dy = 0;
  player.jumping = false;
  police.x = 0;
  obstacles = [{ x: canvas.width, y: 300, width: 50, height: 50 }];
  score = 0;

  gameInterval = setInterval(updateGame, 20);
}

// تحديث اللعبة
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // تحديث اللاعب
  player.y += player.dy;
  if (player.y >= 300) {
    player.y = 300;
    player.jumping = false;
  } else {
    player.dy += 1; // الجاذبية
  }

  // رسم اللاعب
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // تحديث الشرطي
  police.x += 2;
  ctx.drawImage(policeImg, police.x, police.y, police.width, police.height);

  // تحديث العوائق
  obstacles.forEach((obstacle, index) => {
    obstacle.x -= 5;
    ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // إعادة ضبط العائق
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1);
      obstacles.push({ x: canvas.width, y: 300, width: 50, height: 50 });
      score++;
    }

    // التصادم
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    ) {
      endGame();
    }
  });

  // الشرطي يلحق باللاعب
  if (police.x > player.x) {
    endGame();
  }

  // تحديث النقاط
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// إنهاء اللعبة
function endGame() {
  clearInterval(gameInterval);
  document.getElementById("restart-game-btn").classList.remove("hidden");
}

// القفز
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !player.jumping) {
    player.jumping = true;
    player.dy = -15;
  }
});

// إعادة التشغيل
document.getElementById("restart-game-btn").addEventListener("click", () => {
  document.getElementById("restart-game-btn").classList.add("hidden");
  startGame();
});

// إضافة الصور
document.getElementById("add-player-image").addEventListener("click", () => {
  const file = document.getElementById("player-image-input").files[0];
  if (file) playerImg.src = URL.createObjectURL(file);
});

document.getElementById("add-police-image").addEventListener("click", () => {
  const file = document.getElementById("police-image-input").files[0];
  if (file) policeImg.src = URL.createObjectURL(file);
});

// بدء اللعبة
document.getElementById("start-game-btn").addEventListener("click", startGame);
