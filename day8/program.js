const { syncReadFile } = require("../util/syncReadFile");

function main1() {
  const input = syncReadFile("./input.txt");
  const grid = input.map((row) => row.split(""));

  const numberOfRows = grid.length;
  const numberOfCols = grid[0].length;

  const isEdge = (row, col) =>
    row === 0 ||
    col === 0 ||
    row === numberOfRows - 1 ||
    col === numberOfCols - 1;

  const isVisible = (row, col) => {
    if (isEdge(row, col)) {
      return true;
    }

    const isValid = (cellValue) => cellValue < grid[row][col];

    const [rowValues, colValues] = [
      grid[row],
      Array.from({ length: numberOfRows }, (_, i) => grid[i][col]),
    ];

    return [
      rowValues.slice(0, col).every(isValid),
      rowValues.slice(col + 1).every(isValid),
      colValues.slice(0, row).every(isValid),
      colValues.slice(row + 1).every(isValid),
    ].some(Boolean);
  };

  let numberOfTreesVisible = 0;
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      numberOfTreesVisible += isVisible(row, col);
    }
  }

  console.log("Number of trees visible:", numberOfTreesVisible);
}

function main2() {
  const input = syncReadFile("./input.txt");
  const grid = input.map((row) => row.split(""));

  const numberOfRows = grid.length;
  const numberOfCols = grid[0].length;

  const isEdge = (row, col) =>
    row === 0 ||
    col === 0 ||
    row === numberOfRows - 1 ||
    col === numberOfCols - 1;

  const calcScenicScore = (row, col) => {
    if (isEdge(row, col)) {
      return 0;
    }

    const scoreAccumulator = ({ count, stop }, el) => {
      if (stop) {
        return { count, stop };
      }

      stop = el >= grid[row][col];
      count += 1;

      return { count, stop };
    };

    const [rowValues, colValues] = [
      grid[row],
      Array.from({ length: numberOfRows }, (_, i) => grid[i][col]),
    ];

    const initialValue = { count: 0, stop: false };
    const treeDistanceValues = [
      rowValues.slice(0, col).reverse().reduce(scoreAccumulator, initialValue)
        .count,
      rowValues.slice(col + 1).reduce(scoreAccumulator, initialValue).count,
      colValues.slice(0, row).reverse().reduce(scoreAccumulator, initialValue)
        .count,
      colValues.slice(row + 1).reduce(scoreAccumulator, initialValue).count,
    ];

    const scenicScore = treeDistanceValues.reduce((acc, el) => (acc *= el), 1);
    return scenicScore;
  };

  let score = 0;
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      score = Math.max(score, calcScenicScore(row, col));
    }
  }

  console.log("Scenic result:", score);
}

// main1();
main2();
