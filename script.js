const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const angleSlider = document.getElementById("angle");
const radiusSlider = document.getElementById("radius");
const angleVal = document.getElementById("angleVal");
const radiusVal = document.getElementById("radiusVal");

const CENTER = canvas.width / 2;
const SCALE = 120; // pixels per unit length

function degToRad(d) {
  return d * Math.PI / 180;
}

function rotate(x, y, angle) {
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle)
  };
}

function drawPolarGrid() {
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 1;

  // Circles
  for (let r = 0.5; r <= 3; r += 0.5) {
    ctx.beginPath();
    ctx.arc(CENTER, CENTER, r * SCALE, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Radial lines
  for (let a = 0; a < 360; a += 30) {
    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.lineTo(
      CENTER + 3 * SCALE * Math.cos(degToRad(a)),
      CENTER + 3 * SCALE * Math.sin(degToRad(a))
    );
    ctx.stroke();
  }
}

function drawMirror(angle) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;

  // First mirror (0°)
  ctx.beginPath();
  ctx.moveTo(CENTER, CENTER);
  ctx.lineTo(CENTER + 3 * SCALE, CENTER);
  ctx.stroke();

  // Second mirror (θ)
  ctx.beginPath();
  ctx.moveTo(CENTER, CENTER);
  ctx.lineTo(
    CENTER + 3 * SCALE * Math.cos(angle),
    CENTER + 3 * SCALE * Math.sin(angle)
  );
  ctx.stroke();
}

function drawObject(r, theta) {
  const angle = theta / 2;

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    CENTER + r * SCALE * Math.cos(angle),
    CENTER + r * SCALE * Math.sin(angle),
    6,
    0,
    2 * Math.PI
  );
  ctx.fill();
}


function drawImages(r, theta) {
  ctx.fillStyle = "blue";
  const step = 2 * theta;
  const baseAngle = theta / 2;

  for (let n = -20; n <= 20; n++) {
    const angle = baseAngle + n * step;

    ctx.beginPath();
    ctx.arc(
      CENTER + r * SCALE * Math.cos(angle),
      CENTER + r * SCALE * Math.sin(angle),
      4,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}


function update() {
  const thetaDeg = Number(angleSlider.value);
  const r = Number(radiusSlider.value);
  const theta = degToRad(thetaDeg);

  angleVal.textContent = thetaDeg;
  radiusVal.textContent = r;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPolarGrid();
  drawMirror(theta);
  drawObject(r, theta);
  drawImages(r, theta);
}

angleSlider.oninput = update;
radiusSlider.oninput = update;

update();
