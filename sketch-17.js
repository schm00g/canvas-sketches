const canvasSketch = require("canvas-sketch");
const createShader = require("canvas-sketch-util/shader");
const glsl = require("glslify");
require("glsl-noise/simplex/2d.glsl");

// This shader experiment is a recreation of
// one of Judy Chicago's Early Feminist artworks.
// You can (and should) look at her work here:
// https://www.judychicago.com/gallery/early-feminist/ef-artwork/#6

// Setup our sketch
const settings = {
  context: "webgl",
  animate: false,
  dimensions: [2048, 2048]
};

// Your glsl code
const frag = glsl(/* glsl */ `
  precision highp float;
  uniform float aspect;

  varying vec2 vUv;

  #pragma glslify: noise2 = require('glsl-noise/simplex/2d');

  void main () {
    vec3 centerColor = vec3(1.0, 1.0, 0.0);
    vec3 outerColor = vec3(1.0, 0.0, 1.0);
    vec3 rimColor = vec3(0.43, 0.3, 0.47);
    vec3 centerAngleColor = vec3(0.76, 0.85, 0.69);

    vec2 pos = vUv - 0.5;
    vec2 center = vec2(0.5);

    float dist = distance(vUv, center);
    float angle = atan(pos.x, pos.y) / 6.28;
    angle += 0.01 * sin(30.0 * dist);
    angle += 0.03 * noise2(vec2(2.0 * dist, 0.0));
    float n = mod(angle * 16.0, 1.0);
    float angleMix = smoothstep(-0.7, 1.0, n);

    vec2 rim = abs(pos * 2.0);
    float square = max(rim.x, rim.y);
    float squareMask = smoothstep(0.5, 1.05, square);
    float darkRimMask = 1.0 - smoothstep(1.0, 0.95, square);

    vec3 sunColorA = mix(centerColor, outerColor, dist);
    vec3 sunColorB = mix(centerAngleColor, vec3(1.0), 3.0 * dist);
    vec3 color = mix(sunColorB, sunColorA, angleMix);
    vec3 radialColor = mix(color, rimColor, squareMask);
    vec3 radialColor2 = mix(radialColor, rimColor, darkRimMask);

    float smallCircleMask = 1.0 - smoothstep(0.0, 0.15, dist);

    vec3 finalColor = mix(radialColor2, vec3(1.0), smallCircleMask);

    gl_FragColor = vec4(finalColor, 1);
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor: "#666",
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      // time: ({ time }) => time,
      aspect: ({ width, height }) => width / height
    }
  });
};

canvasSketch(sketch, settings);
