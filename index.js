let y = 200;
let x = 200;
let vy = 0;
const pvx = 2;
let isPlaying = false;

pipes = [
   [400, Math.floor(Math.random() * 150)],
   [500, Math.floor(Math.random() * 150)],
   [600, Math.floor(Math.random() * 150)],
   [700, Math.floor(Math.random() * 150)],
   [800, Math.floor(Math.random() * 150)]
]

const canv = document.getElementById("canv");
const ctx = canv.getContext("2d");

const score = document.getElementById("score");

const jumpSfx = new Audio();
jumpSfx.src = "audio/jump.mp3";

const image = new Image();
image.src="img/birdie2.png";

const overSfx = new Audio();
overSfx.src = "audio/over.mp3"

// setInterval(game, 1000/30);

function game() {
  ctx.clearRect(0,0,canv.width,canv.height);
  vy += 0.3;
  y += vy;

  ctx.drawImage(image, x, y, 40, 40);

  for (i = 0; i < pipes.length; i++) {
    ctx.strokeStyle = "black";
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
      overSfx.play();
      alert("Birdie ded, Skill issue");
      window.location.reload();
      return;
    }

    if (pipes[i][0] == x) {
      score.textContent = `SCORE: ${Number(score.textContent.split(" ")[1]) + 1}`;
    }

    if (pipes[i][0] > -50) {
      pipes[i][0] -= pvx;
    } else {
      pipes[i][0] = 450;
      pipes[i][1] = Math.floor(Math.random() * 150);
    }
  }

  if(y > 400)
    vy = -10;

  requestAnimationFrame(game);
}

window.addEventListener("click", jump);
window.addEventListener("keydown", e => {
  if (e.code == "Space") jump();
})

function jump() {
  if (!isPlaying) {
    isPlaying = true;
    requestAnimationFrame(game);
  }
  vy = -5;
  jumpSfx.currentTime = 0;
  jumpSfx.play();
}