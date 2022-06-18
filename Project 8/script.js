const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

// Set some line drawing related properties
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 4;

// Declare few variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // This function stops running fn when they are not mouse down
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  //   Start from
  ctx.moveTo(lastX, lastY);
  //   Go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  //   It changes the color of line like rainbow as we draw
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  //   This below logic only for changing lineWidth as draw

  //   if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
  //     direction = !direction;
  //   }

  //   if (direction) {
  //     ctx.lineWidth++;
  //   } else {
  //     ctx.lineWidth--;
  //   }
}

// Add EventListener to draw
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
