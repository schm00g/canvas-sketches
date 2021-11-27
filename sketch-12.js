const canvasSketch = require('canvas-sketch');

import { colorbrewer } from './colors.js';

const settings = {
  dimensions: [ 260, 260 ]
};


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    const gridSize = 60;
    const randomColorPalette = colorbrewer[Object.keys(colorbrewer)[Math.floor(Math.random() * Object.keys(colorbrewer).length)]];
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        console.log(randomColorPalette);
        context.fillStyle = randomColorPalette[Math.floor(Math.random() * 5)];
        context.fillRect(y * 10, x * 10, 10, 10);
      }
    };
  };
};

canvasSketch(sketch, settings);
