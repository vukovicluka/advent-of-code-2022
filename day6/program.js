const { syncReadFile } = require("../util/syncReadFile");

function main() {
  const [element] = syncReadFile("./input.txt");

  const buffer = [...element];

  let routine = "";
  let helper = "";
  let start = 0;

  for (let i = 0; i < buffer.length; i++) {
    const l = buffer[i];

    helper += l;
    routine += l;

    if (routine.length === 14) {
      // === 4 for 1st solution
      const allSame = new Set([...routine]).size === 14;

      if (allSame) {
        start = helper.length;
        break;
      } else {
        routine = routine.substring(1);
      }
    }
  }

  console.log("Start", start);
}

main();
