const canvas = document.getElementById('c1');
canvas.width = 400;
canvas.height = 200;
const ctx = canvas.getContext('2d');

ctx.strokeStyle = "red";
ctx.lineWidth = 5;
ctx.moveTo(100, 50);
ctx.lineTo(150, 150);
ctx.stroke();

ctx.moveTo(100, 50);
// Эти настройки применятся и к первой линии тоже
ctx.lineWidth = 2;
ctx.strokeStyle = "green";
// Потому что canvas считает эти линии одним путём
ctx.lineTo(300, 50);
ctx.stroke();
// Чтобы разорвать путь нужно начать новый путь
ctx.beginPath();
ctx.strokeStyle = "red";
ctx.lineWidth = 20;
//lineCap позволяет менять окночания линий
// ctx.lineCap = "round"
// ctx.lineCap = "square"
// ctx.lineCap = "butt"

ctx.moveTo(300, 50);
ctx.lineTo(150, 150);
ctx.lineTo(200, 150);
ctx.lineTo(200, 200);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 10;
ctx.strokeStyle = "blue";
ctx.fillStyle = "yellow";
ctx.lineCap = "round"
// ctx.lineCap = "square"
// ctx.lineCap = "butt"
ctx.moveTo(50, 150);
ctx.lineTo(150, 50);
ctx.lineTo(200, 150);
// Последнюю линию рисовать не нужно
// ctx.lineTo(50, 150);
// соединяет последнюю и первую точки
// замыкая кривую
ctx.closePath();
ctx.fill();
ctx.stroke();
