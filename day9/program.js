const { syncReadFile } = require("../util/syncReadFile");

function main() {
  const input = syncReadFile("./input.txt");
  const coordSet = new Set();
  const ROPE_LENGTH = 2;
  const rope = Array.from({ length: ROPE_LENGTH }, (_) => ({ x: 0, y: 0 }));

  const dirDelta = {
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
  };

  for (const motion of input) {
    const [dir, numberOfSteps] = motion.split(" ");
    let stepsLeft = +numberOfSteps;
    const [head, tail] = [rope[0], rope.slice(-1)[0]];

    while (stepsLeft--) {
      head.x += dirDelta[dir].x;
      head.y += dirDelta[dir].y;

      for (let i = 1; i < rope.length; i++) {
        const [prev, curr] = [rope[i - 1], rope[i]];
        const delta = {
          x: prev.x - curr.x,
          y: prev.y - curr.y,
        };

        if (Math.abs(delta.x) >= 2 || Math.abs(delta.y) >= 2) {
          delta.x = delta.x === 0 ? 0 : delta.x > 0 ? 1 : -1;
          delta.y = delta.y === 0 ? 0 : delta.y > 0 ? 1 : -1;

          curr.x += delta.x;
          curr.y += delta.y;
        }
      }

      coordSet.add(`${tail.x} ${tail.y}`);
    }
  }

  const visitedPositions = coordSet.size;

  console.log("Visited:", visitedPositions);
}

main();
