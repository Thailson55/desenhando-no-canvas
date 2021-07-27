// Initial data
let currentColor = 'black'; 
let podeDesenhar = false;
let mouseX = 0;
let mouseY = 0;
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// Events
const colors = document.querySelectorAll('.colorArea .color').forEach((item) => {
  item.addEventListener('click', colorClick);
});

/*
Passo a passo para desenhar no canvas:
- Quando o mouse estiver clicado, ative o modo desenho.
- Se o mouse mover, e o modo desenho estiver ativado, desenhe
- quando o click for solto, desative o modo desnho
*/
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

// Functions
function colorClick(e) {
  let color = e.target.getAttribute('data-color');
  currentColor = color;

  document.querySelector('.color.active').classList.remove('active');
  e.target.classList.add('active')
}

function mouseDownEvent(e) {
  podeDesenhar = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
  if(podeDesenhar) {
    draw(e.pageX, e.pageY);
  }
}

function mouseUpEvent() {
  podeDesenhar = false;
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
