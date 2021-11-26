const canvasSketch = require('canvas-sketch');

const settings = {
  animate: true,
  duration: 3,
  dimensions: [ 500, 500 ],
  fps: 30,
  // The file name without extension, defaults to current time stamp
  name: 'rotating_rectangle',
  // Optional prefix applied to the file name
  prefix: 'artwork',
  // Optional suffix applied to the file name
  suffix: '.draft'
};

// Start the sketch
canvasSketch(() => {
  return (props) => {
    const { context, width, height, playhead } = props;

    // console.log(props);
  
    // Fill the canvas with pink
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    // Get a seamless 0..1 value for our loop
    // playhead loops around from 0...1
    const t = Math.sin(playhead * Math.PI);

    // Animate the thickness with 'playhead' prop
    const thickness = Math.max(5, Math.pow(t, 0.55) * width * 0.5);

    // Rotate with PI to create a seamless animation
    const rotation = playhead * Math.PI;

    // Draw a rotating white rectangle around the center
    const cx = width / 2;
    const cy = height / 2;
    const length = height * 0.5;
    context.fillStyle = 'rgb(0, 120, 200)';
    context.save();
    context.translate(cx, cy);
    context.rotate(rotation);
    context.fillRect(-thickness / 2, -length / 2, thickness, length);
    // restore? 
    context.restore();
  };
}, settings);
