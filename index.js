let x = 200;
let y = 200;
let vy = 0;
let pvx = 2;
let isPlaying = false;
let isOver = false;
let THEscore = 0;
let menuId;
let angle = 0;

let pipes = [
   [400, Math.floor(Math.random() * 150)],
   [500, Math.floor(Math.random() * 150)],
   [600, Math.floor(Math.random() * 150)],
   [700, Math.floor(Math.random() * 150)],
   [800, Math.floor(Math.random() * 150)]
]

let pipesChace = [];

const canv = document.getElementById("canv");
const ctx = canv.getContext("2d");

const score = document.getElementById("score");
const narrate = document.getElementById("narrate");

const jumpSfx = new Audio();
jumpSfx.src = "audio/jump.mp3";

const image = new Image();
image.src = "img/birdie2.png";

const overSfx = new Audio();
overSfx.src = "audio/over.mp3";

const levelUpSfx = new Audio();
levelUpSfx.src = "audio/levelUp.mp3";

// setInterval(game, 1000/30);

function menu() {
  ctx.fillStyle = "black";
  ctx.font = "50px Pixelify Sans";
  ctx.fillText("Flap Flap Birdie", 25, 200);

  menuId = setInterval(() => {
    ctx.font = "14px Pixelify Sans";
    ctx.fillText("Press spacebar or mouse to start...", 25, 225);
    setTimeout(() => {
      ctx.clearRect(25, 210, 400, 400);
    }, 1000)
  }, 1500)
}

// let trueScore = 0;
menu();
function game() {
  if (isOver) return;
  let scoreNums = Number(score.textContent.split(" ")[1]);
  ctx.clearRect(0, 0, canv.width, canv.height);
  vy += 0.3;
  y += vy;

  ctx.save();

  ctx.translate(200, 200);
  ctx.rotate(angle);
  ctx.drawImage(image, x - 220, y - 220, 40, 40);

  ctx.restore();

  angle += Math.PI / 180 * 1;

  for (i = 0; i < pipes.length; i++) {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(pipes[i][0], 0, 50, pipes[i][1]);
    ctx.strokeRect(pipes[i][0], 0, 50, pipes[i][1]);
    ctx.fillRect(pipes[i][0] - 10, pipes[i][1], 70, 20);
    ctx.strokeRect(pipes[i][0] - 10, pipes[i][1], 70, 20);

    ctx.fillStyle = "lightblue";
    ctx.fillRect(pipes[i][0], pipes[i][1] + 150, 50, 250 - pipes[i][1]);
    ctx.strokeRect(pipes[i][0], pipes[i][1] + 150, 50, 250 - pipes[i][1]);
    ctx.fillRect(pipes[i][0] - 10, pipes[i][1] + 150, 70, 20);
    ctx.strokeRect(pipes[i][0] - 10, pipes[i][1] + 150, 70, 20);

    if (pipes[i][0] < 240 && pipes[i][0] > 160 && (pipes[i][1] > y || pipes[i][1] + 150 <= y + 30)) {
      // alert("Birdie ded, Skill issue");
      overSfx.play();
      isOver = true;
      ctx.fillStyle = "black";
      ctx.font = "25px Pixelify Sans";
      ctx.fillText("Birdie ded, Diagnosis: Skill Issue", 0, 200);
      ctx.font = "14px Pixelify Sans";
      ctx.fillText("Press spacebar or mouse to restart...", 25, 225);
    }

    if (pipes[i][0] > (x - 17) && pipes[i][0] < x && !pipesChace.includes(pipes[i][1])) {
      pipesChace.pop();
      score.textContent = `SCORE: ${scoreNums + 1}`;
      pipesChace.push(pipes[i][1]);
    }

    if (pipes[i][0] > -50) {
      pipes[i][0] -= pvx;
    } else {
      // trueScore += 1;
      // console.log(trueScore, scoreNums, `OFFSET: ${scoreNums - trueScore}`, `SPEED: ${pvx}`);
      pipes[i][0] = 450;
      pipes[i][1] = Math.floor(Math.random() * 150);
    }
  }

  if(y > 400)
    vy =-10;

  if (scoreNums % 100 === 0 && scoreNums !== THEscore && scoreNums !== 0) {
    levelUpSfx.currentTime = 0;
    levelUpSfx.play();
    if (scoreNums < 500) narrate.textContent = "This is getting to easy huh? we shall go faster then";
    else if (scoreNums < 1500) narrate.textContent = "Bruh whattt, go get job or something. Now IT IS FASTER";
    else if (scoreNums === 1500) narrate.textContent = "Yeah idk if you are using bot or you just have a good gaming chair. Either way goodluck";
    pvx += 1;
    THEscore = scoreNums;
  } else if (scoreNums === (THEscore + 5)) {
    narrate.textContent = "";
  }

  requestAnimationFrame(game);
}

function resetGame() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  
  x = y = 200;
  vy = THEscore = angle = 0;
  pvx = 2;
  isOver = isPlaying = false;
  narrate.textContent = "";
  score.textContent = "SCORE: 0";
  score.style.display = "none";
  pipes = [
    [400, Math.floor(Math.random() * 150)],
    [500, Math.floor(Math.random() * 150)],
    [600, Math.floor(Math.random() * 150)],
    [700, Math.floor(Math.random() * 150)],
    [800, Math.floor(Math.random() * 150)]
  ]

  menu();
}

window.addEventListener("click", jump);
window.addEventListener("keydown", e => {
  if (e.code == "Space") jump();
})

function jump() {
  if (!isPlaying) {
    isPlaying = true;
    requestAnimationFrame(game);
    score.style.display = "block";
    clearInterval(menuId);
  } else if (isOver) {
    resetGame();
  } else {
    angle = 0;
    vy = -4;
    jumpSfx.currentTime = 0;
    jumpSfx.play();
  }
}