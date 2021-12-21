const canvasSketch = require("canvas-sketch");
const Random = require("canvas-sketch-util/random");
const { linspace, lerp } = require("canvas-sketch-util/math");
const palettes = require("nice-color-palettes");

const defaultSeed = "";
Random.setSeed(defaultSeed || Random.getRandomSeed());
// console.log("Random Seed:", Random.getSeed());

const settings = {
  hotkeys: false,
  suffix: Random.getSeed(),
  animate: true,
  dimensions: [512, 512]
};

const sketch = ({ width, height }) => {
  const margin = width * 0.1;

  const x = v => lerp(margin, width - margin, v);
  const y = v => lerp(margin, height - margin, v);

  const step = 0.01;
  const matrix = [];
  for (let y = 0; y < 1; y += step) {
    const row = [];
    for (let x = 0; x < 1; x += step) {
      row.push([
        x + Random.range(-step, step),
        y + Random.range(-step, step),
        Random.range(0.7, 1), // for hair length
        Random.range(0.9, 1), // for rotation
        Random.value() // for hair width
      ]);
    }
    matrix.push(row);
  }

  return ({ context, width, height, time }) => {
    time = time || 0;
    context.fillStyle = "hsl(0, 0%, 98%)";
    context.fillRect(0, 0, width, height);

    for (const row of matrix) {
      for (const p of row) {
        const rI = Random.noise2D(p[0] + time / 5, p[1], 1.5) / 2 + 0.5;
        const rotateF = rI * Math.PI * 2 * p[3];
        const lineWidth = width * 0.05 * p[2];
        context.beginPath();
        context.lineWidth =
          (20 + rI * 20) * width * 0.000005 * (p[4] > 0.5 ? 1 : 1.18);

        context.moveTo(x(p[0]), y(p[1]));
        context.lineTo(
          x(p[0]) + Math.cos(rotateF) * lineWidth,
          y(p[1]) + Math.sin(rotateF) * lineWidth
        );
        context.stroke();
      }
    }
  };
};

canvasSketch(sketch, settings);
