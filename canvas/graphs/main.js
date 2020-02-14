const canvas = document.getElementById('c1');
canvas.width = 400;
canvas.height = 200;
const ctx = canvas.getContext('2d');
let x = 0;

setInterval(drawSin, 100);

function drawSin() {
    let y = Math.sin(x);
    if (x >= 400) {
      x = 0;
    }
    x = x + 0.3;
    ctx.fillRect(5 * x, 100 + 20 * y, 2, 2);
}
