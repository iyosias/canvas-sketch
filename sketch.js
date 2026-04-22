const canvasSketch = require("canvas-sketch");
const { color } = require("canvas-sketch-util");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [2000, 2000],
  resolution: 300,
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6); // since we want from zero to 5;

  //const shuffelled = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const tanstack = ["#ebe23e", "#0c221b", "#31ee63", "#c92a2f", "#2cd5ff"];
  //const palette = ["#a44df5", "#3327d1"];
  const red_orange = ["#e63b1c", "#ff670e"];
  //const ethiopia = ["#066106", "#f4f80f", "#c50000"];
  //const white = ["#ffffff"];

  const palette = red_orange;

  const createGrid = () => {
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1); // we want the UV cordinate to from zero to one
        const v = count <= 1 ? 0.5 : y / (count - 1); // If we don't do -1, it will go from 0 - 0.8
        const radius = Math.abs(random.noise2D(u, v)) * 0.08;
        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius: radius,
          rotation: random.noise2D(u, v),
        });
      }
    }
    return points;
  };

  // random.setSeed("matt");
  const points = createGrid().filter(() => random.value() > 0.05);
  const margin = 0;

  return ({ context, width, height }) => {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { position, radius, color, rotation } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("</>", 0, 0);
      context.restore();
    });
  };
};
canvasSketch(sketch, settings);
