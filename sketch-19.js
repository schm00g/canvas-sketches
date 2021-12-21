const canvasSketch = require("canvas-sketch");

// Import ThreeJS and assign it to global scope
// This way examples/ folder can use it too
const THREE = require("three");
global.THREE = THREE;

// Import extra THREE plugins
require("three/examples/js/controls/OrbitControls");
require("three/examples/js/geometries/RoundedBoxGeometry.js");
require("three/examples/js/loaders/GLTFLoader.js");
require("three/examples/js/loaders/RGBELoader.js");
require("three/examples/js/postprocessing/EffectComposer.js");
require("three/examples/js/postprocessing/RenderPass.js");
require("three/examples/js/postprocessing/ShaderPass.js");
require("three/examples/js/postprocessing/UnrealBloomPass.js");
require("three/examples/js/shaders/LuminosityHighPassShader.js");
require("three/examples/js/shaders/CopyShader.js");

const Stats = require("stats-js");
const { GUI } = require("dat.gui");

const settings = {
  animate: true,
  context: "webgl",
  resizeCanvas: false
};

const sketch = ({ context, canvas, width, height }) => {
  const gui = new GUI();

  const options = {
    enableSwoopingCamera: false,
    enableRotation: true,
    transmission: 1,
    thickness: 1.2,
    roughness: 0.6,
    envMapIntensity: 6,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    normalScale: 1,
    clearcoatNormalScale: 0.3,
    normalRepeat: 1,
    bloomThreshold: 0.1,
    bloomStrength: 0.1,
    bloomRadius: 0.3
  };

  // Setup
  // -----

  const renderer = new THREE.WebGLRenderer({
    context,
    antialias: false
  });
  renderer.setClearColor(0x000, 1);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(0, 0, 17);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enabled = !options.enableSwoopingCamera;

  const scene = new THREE.Scene();

  const renderPass = new THREE.RenderPass(scene, camera);
  const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(width, height),
    options.bloomStrength,
    options.bloomRadius,
    options.bloomThreshold
  );

  const composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);

  // Content
  // -------

  const textureLoader = new THREE.TextureLoader();
  //const bgTexture = textureLoader.load("src/NFT2.jpg");
  const bgTexture = textureLoader.load("assets/GBC.png");
  //const bgTexture = textureLoader.load("src/NFT1.jpg");
  //const bgTexture = textureLoader.load("src/Character.png");
  //const bgTexture = textureLoader.load("src/Character(1).png");
  const bgGeometry = new THREE.PlaneGeometry(5, 5);
  const bgMaterial = new THREE.MeshBasicMaterial({
    map: bgTexture,
    side: THREE.DoubleSide
  });
  const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  bgMesh.position.set(0, 0, 4);
  scene.add(bgMesh);

  const positions = [[0, 0, 4]];

  const geometries = [new THREE.SphereGeometry(4, 64, 32)];

  const hdrEquirect = new THREE.RGBELoader().load(
    "src/empty_warehouse_01_2k.hdr",
    () => {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
    }
  );

  const material = new THREE.MeshPhysicalMaterial({
    transmission: 0.9,
    roughness: 0,
    thickness: 6,
    clearcoat: 0,
    //6705CA
    //color: 0xff0000,
    //transparent: true,
    shading: THREE.FlatShading,
    envMap: hdrEquirect,
    envMapIntensity: 1
  });

  const meshes = geometries.map(
    (geometry) => new THREE.Mesh(geometry, material)
  );

  meshes.forEach((mesh, i) => {
    scene.add(mesh);
    mesh.position.set(...positions[i]);
  });

  // Update
  // ------

  const update = (time, deltaTime) => {
    const ROTATE_TIME = 10; // Time in seconds for a full rotation
    const yAxis = new THREE.Vector3(0, 1, 0);
    const rotateY = (deltaTime / ROTATE_TIME) * Math.PI * 0.3;

    meshes.forEach((mesh) => {
      mesh.rotateOnWorldAxis(yAxis, rotateY);
    });

    if (options.enableSwoopingCamera) {
      camera.position.x = Math.sin((time / 10) * Math.PI * 2) * 2;
      camera.position.y = Math.cos((time / 10) * Math.PI * 2) * 2;
      camera.position.z = 4;
      camera.lookAt(scene.position);
    }
  };

  // Lifecycle
  // ---------

  return {
    resize({ canvas, pixelRatio, viewportWidth, viewportHeight }) {
      const dpr = Math.min(pixelRatio, 2); // Cap DPR scaling to 2x

      canvas.width = viewportWidth * dpr;
      canvas.height = viewportHeight * dpr;
      canvas.style.width = viewportWidth + "px";
      canvas.style.height = viewportHeight + "px";

      bloomPass.resolution.set(viewportWidth, viewportHeight);

      renderer.setPixelRatio(dpr);
      renderer.setSize(viewportWidth, viewportHeight);

      composer.setSize(viewportWidth, viewportHeight);

      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    render({ time, deltaTime }) {
      controls.update();
      update(time, deltaTime);
      // renderer.render(scene, camera);
      composer.render();
    },
    unload() {
      geometries.forEach((geometry) => geometry.dispose());
      material.dispose();
      hdrEquirect.dispose();
      controls.dispose();
      renderer.dispose();
      bloomPass.dispose();
      gui.destroy();
      document.body.removeChild(stats.dom);
    }
  };
};

canvasSketch(sketch, settings);
