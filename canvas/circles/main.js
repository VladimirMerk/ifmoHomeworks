const canvas = document.getElementById('c1');
canvas.width = 400;
canvas.height = 200;
const ctx = canvas.getContext('2d');
canvas.addEventListener('mousemove', (e) => {
  ctx.clearRect(0, 0, 400, 400);
  let radius = Math.pow(Math.pow(e.offsetX - 200, 2)+Math.pow(e.offsetY - 100, 2), 0.5);
  ctx.beginPath();
  ctx.arc(150, 100,  radius, 0, Math.PI * 2, false);
  ctx.arc(150, 100, 45, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
})

ctx.lineWidth = 5;
ctx.strokeStyle = "red";
ctx.fillStyle = "blue";
// Рисуем круг x центра, y центра, радиус, начальный угол в радианах (начало
// координат справа), конечный угол в радианах (начало координат справа),
// [false по часовой, true против часовой]
ctx.arc(150, 100, 75, 0, Math.PI / 2, false);
ctx.arc(150, 100, 45, 0, Math.PI / 2, true);
ctx.closePath();
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.strokeStyle = "green";
ctx.fillStyle = "pink";
ctx.arc(300, 100, 20, 0, 2 * Math.PI, false);
ctx.stroke();
ctx.fill();

ctx.beginPath();
