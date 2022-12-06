const { syncReadFile } = require("../util/syncReadFile");

function createInputMatrix(input) {
  const multiArray = [];

  const arrayIndexRow = input.find((r) => r.trim().startsWith("1"));
  const indexes = arrayIndexRow
    .trim()
    .split(" ")
    .filter((e) => e);

  for (let i = 0; i < indexes.length; i++) {
    const array = new Array();
    multiArray.push(array);
  }

  const inputReversed = input.reverse().slice(2);

  for (const row of inputReversed) {
    const elements = row.match(/.{1,4}/g);

    for (let i = 0; i < elements.length; i++) {
      const e = elements[i];
      if (e.trim().length === 3) {
        const array = multiArray[i];
        array.push(e.trim());
      }
    }
  }

  return multiArray;
}

function main() {
  const input = syncReadFile("./input.txt");

  const values = input.filter((e) => !e.startsWith("move"));
  const moves = input.filter((e) => e.startsWith("move"));

  const matrix = createInputMatrix(values);

  for (const move of moves) {
    const [, count, , from, , to] = move.split(" ");

    const moveArray = matrix[from - 1];
    const movingElements = moveArray.splice(moveArray.length - count);

    const reversed = [...movingElements];
    matrix[to - 1].push(...reversed);
  }

  console.log("End matrix: ");
  console.table(matrix);
}

main();
