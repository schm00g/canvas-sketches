const canvasSketch = require('canvas-sketch');
const { math, random } = require('canvas-sketch-util');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// opted for imported utility functions
// const degreeToRadian = (deg) => {
//   return deg / 180 *  Math.PI;
// };

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 1;
    const cy = height * 1;
    const w = width * 0.002;
    const h = height * 0.1;
    let x, y;

    const num = 11;
    const radius = width * 0.3;

    
    for(let i = 0; i < num; i++){
      const slice = math.degToRad(360 / num);
      const angle = slice * i;
      
      x = radius * Math.sin(angle);
      y = radius * Math.cos(angle);
      
      // to rotate around the top right corner of black square
      context.save();
      context.translate(cx, cy);
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(1, 3), 1);
  
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, 12), slice * random.range(1, 5));
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
