const canvas = document.getElementById('c1');
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");
const R = 200;
const r = 140;
const d = 120;
let teta = 0;

setInterval(spiro, 50)

function spiro() {
  let x = (R - r) * Math.cos(teta) + d * Math.cos( (R-r) * teta / r );
  let y = (R - r) * Math.sin(teta) - d * Math.sin( (R-r) * teta / r );
	teta = teta + 0.1;
	ctx.fillRect(300+x, 300+y, 4, 4);
}
