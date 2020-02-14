const canvas = document.getElementById('c1');
canvas.width = 400;
canvas.height = 200;
const ctx = canvas.getContext('2d');

// Заполненный прямоугольник x, y, width, height
ctx.fillRect(50, 50, 50, 50);
ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 50, 50);
// Белый прямоугольник x, y, width, height
ctx.clearRect(75, 75, 50, 50);

ctx.strokeStyle = "green";
ctx.lineWidth = 10;
// Говорит где рисовать
ctx.rect(5, 10, 100, 100);
// До отрисовки команды стиля перекрывают друг друга
ctx.strokeStyle = "blue";
ctx.lineWidth = 5;
// 2 прямоугольника будут нарисованы синим
// шириной 5 px
ctx.rect(120, 120, 50, 50);
// Рисует
ctx.stroke();
// Заливает последние нарисованные замкнутые объекты
// Использует последний использованный ctx.fillStyle
ctx.fill();
