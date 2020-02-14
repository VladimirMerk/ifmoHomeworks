const canvas = document.getElementById('c1');
const colorPicker = document.getElementById('color');
canvas.width = 400;
canvas.height = 200;
const ctx = canvas.getContext('2d');
let myColor = colorPicker.value;

colorPicker.addEventListener('input', (e) => {
  myColor = colorPicker.value;
})

canvas.addEventListener('mousedown', (e) => {
  canvas.addEventListener('mousemove', draw)
})

canvas.addEventListener('mouseup', (e) => {
  canvas.removeEventListener('mousemove', draw)
})


function draw(e) {
  console.log('e', e.offsetX, e.offsetY)
  ctx.fillStyle = myColor
  ctx.fillRect(e.offsetX - 5, e.offsetY - 5, 10, 10)
}
