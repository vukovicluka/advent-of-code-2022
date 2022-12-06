const { syncReadFile } = require("../util/syncReadFile");

function main() {
  const inputArray = syncReadFile("./input.txt");

  const sumArray = [];
  let sum = 0;

  for (let i = 0; i < inputArray.length; i++) {
    const e = inputArray[i];
    if (e) {
      const eInt = parseInt(inputArray[i]);
      sum += eInt;

      if (i === inputArray.length - 1) {
        sumArray.push(sum);
      }
    } else {
      sumArray.push(sum);
      sum = 0;
    }
  }

  // console.log(Math.max(...sumArray)); // 1st solution

  const sortedSumArray = sumArray.sort((x, y) => x - y);
  const top3 = sortedSumArray.slice(-3);
  const top3Sum = top3.reduce((e, acc) => (acc += e), 0);
  console.log("SUM: ", top3Sum);
}

main();
