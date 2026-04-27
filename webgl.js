// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
// require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  animate: true,
  dimensions: [515, 512],
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor("hsl(0, 0%, 95%)", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // Setup a material
  const material = new THREE.MeshStandardMaterial({
    color: "blue",
    wireframe: false,
  });

  const palette = random.pick(palettes);

  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: random.pick(palette),
        wireframe: false,
      }),
    );
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1),
    );
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1),
    );
    mesh.scale.setScalar(0.5);
    scene.add(mesh);
  }

  scene.add(new THREE.AmbientLight("#1917bd", 1));

  const directionalLight = new THREE.DirectionalLight("red", 1.0);
  directionalLight.position.set(0, 0, 4);
  scene.add(directionalLight);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
    },
  };
};

canvasSketch(sketch, settings);
