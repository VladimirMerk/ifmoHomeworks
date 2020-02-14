const canvas = document.getElementById('c1');
canvas.width = 400;
canvas.height = 200;
const ctx = canvas.getContext('2d');
let stepCount = 0;
let direction = 0;
let x = 200;
let y = 100;
let mouseX = 0;
let mouseY = 0;

setInterval(drawDot, 50);

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.offsetX
  mouseY = e.offsetY
})

function drawDot () {
  ctx.clearRect(0, 0, 400, 200);
  if (stepCount === 0) {
    stepCount = Math.floor(15 * Math.random());
    direction = Math.floor(8 * Math.random());
  } else {
    stepCount--;
  }

  switch (direction) {
    case 0: // верх
      y = y - 1;
      break;
    case 1: // вправо
      x = x + 1;
      break;
    case 2: // вниз
      y = y + 1;
      break;
    case 3: // влево
      x = x - 1;
      break;
    case 4: // вправо вверх
      x = x + 1;
      y = y - 1;
      break;
    case 5: // вправо вниз
      x = x + 1;
      y = y + 1;
      break;
    case 6: // влево вверх
      x = x - 1;
      y = y + 1;
      break;
    case 7: // влево вниз
      x = x - 1;
      y = y - 1;
      break;
  }

  if (x < 0 || x > 400 || y < 0 || y > 200) {
    stepCount = 0
  }
  ctx.fillRect(x-3, y-3, 6, 6)
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
}
