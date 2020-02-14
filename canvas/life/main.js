const canvas = document.getElementById('c1');
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext('2d');
let gridX = canvas.width / 10;
let gridY = canvas.height / 10;
let grid = [];
let count = 0;

canvas.addEventListener('click', (e) => {
  var x = event.offsetX;
	var y = event.offsetY;
	console.log(x);
	console.log(y);
	x = Math.floor(x/10); //800 /10 = 80
	y = Math.floor(y/10); //800 /10 =
	grid[y][x]=1;
	draw();
});

goLive();
document.getElementById('start').onclick = () => {
  setInterval(startLive, 100)
};

function goLive() {
  for (let i=0; i < gridX; i++) {
    grid[i] = [];
    for (let j=0; j < gridY; j++) {
      grid[i][j] = 0;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i=0; i<gridX; i++){
		for (var j=0; j<gridY; j++){
			if (grid[i][j]==1){
				ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}
}
function startLive() {
  let grid2 = [];
  for (let i=0; i < gridX; i++) {
    grid2[i] = [];
    for (let j=0; j < gridY; j++) {
      let neighbors = 0;
      if (grid[fpm(i)-1][j]==1) neighbors++;//up
			if (grid[i][fpp(j)+1]==1) neighbors++;//right
			if (grid[fpp(i)+1][j]==1) neighbors++;//bottom
			if (grid[i][fpm(j)-1]==1) neighbors++;//left
			if (grid[fpm(i)-1][fpp(j)+1]==1) neighbors++;
			if (grid[fpp(i)+1][fpp(j)+1]==1) neighbors++;
			if (grid[fpp(i)+1][fpm(j)-1]==1) neighbors++;
			if (grid[fpm(i)-1][fpm(j)-1]==1) neighbors++;
			(neighbors==2 || neighbors==3) ? grid2[i][j]=1 : grid2[i][j]==0;
    }
  }
  grid = grid2;
  draw();
  count++;
  document.getElementById('count').innerHTML = count;
}
function fpm(i) {
  if (i===0) return gridX
  else return i
}
function fpp(i) {
  if (i===gridX-1) return -1
  else return i
}
