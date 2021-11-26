// Import the library
const canvasSketch = require('canvas-sketch');

// specify some output params
const settings = {
  dimensions: [256, 256]
};

// start sketch
const sketch = () => {
  return (props) => {
    // destructre what we need from props
    console.log(props);
    const {context, width, height} = props;

    // fill the canvas with pink
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    // now draw a white rectangle in the middle
    context.strokeStyle = 'white';
    context.lineWidth = 4;
    context.strokeRect(width / 4, height / 4, width / 2, height / 2);
  }
}

canvasSketch(sketch, settings);