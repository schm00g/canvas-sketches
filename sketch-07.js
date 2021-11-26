// import lib
const canvasSketch = require('canvas-sketch');

// set output params
const settings = {
  dimensions: [256, 256]
}

// make sketch
const sketch = () => {
  return (props) => {
    // deconstruct props
    console.log(props);
    const {context, width, height} = props;

    console.log(context);
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'white';
    context.lineWidth = Math.random() * width / 8;
    context.strokeRect(width / 4, width / 4, width / 2, width / 2);

  }
}

canvasSketch(sketch, settings);
