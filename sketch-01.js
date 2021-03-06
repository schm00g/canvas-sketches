const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#FFFFFF";
    context.lineWidth = width * 0.015
    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    let ix = width * 0.17;
    let iy = height * 0.17;
    const off = width * 0.02;
    let x, y;
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++){
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
        context.beginPath();
        context.rect(x + off / 2, y + off / 2, w - off, h - off);
        if(Math.random() > 0.5){
            context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);

// canvas-sketch sketch-01.js --output=output/01