const { readFileSync } = require("fs");

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
}

function createNumberRange(stringRange) {
  const [start, end] = stringRange.split("-");

  const startNumber = parseInt(start);
  const endNumber = parseInt(end);

  const rangeArray = [startNumber];
  for (let i = startNumber + 1; i < endNumber; i++) {
    rangeArray.push(i);
  }
  rangeArray.push(endNumber);

  return rangeArray;
}

function main() {
  const input = syncReadFile("./input.txt");

  let sumOfOverlaps = 0;
  for (let i = 0; i < input.length; i++) {
    const pair = input[i];

    const [first, second] = pair.split(",");
    const firstRange = createNumberRange(first);
    const secondRange = createNumberRange(second);

    const overlappingElementExist = firstRange.some((e) =>
      secondRange.includes(e)
    );

    if (overlappingElementExist) {
      sumOfOverlaps++;
    }

    // if (firstPairStart <= secondPairStart && firstPairEnd >= secondPairEnd) {
    //   sumOfOverlaps++;
    // } else if (
    //   secondPairStart <= firstPairStart &&
    //   secondPairEnd >= firstPairEnd
    // ) {
    //   sumOfOverlaps++;
    // }
  }

  console.log("Sum of overlaps: ", sumOfOverlaps);
}

main();
