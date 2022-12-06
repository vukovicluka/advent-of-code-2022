const { syncReadFile } = require("../util/syncReadFile");

function convertInputArrayToMeasurementsArray(array) {
  const measurementArray = [];
  for (let i = 0; i < array.length; i++) {
    const e1 = parseInt(array[i]);
    const e2 = parseInt(array[i + 1]);
    const e3 = parseInt(array[i + 2]);
    const sum = e1 + e2 + e3;

    measurementArray.push(sum);
  }

  return measurementArray;
}

function main() {
  const inputArray = syncReadFile("./input.txt");
  const measurementArray = convertInputArrayToMeasurementsArray(inputArray);

  let counter = 0;

  for (let i = 1; i <= measurementArray.length; i++) {
    const ePrevious = parseInt(measurementArray[i - 1]);
    const eCurrent = parseInt(measurementArray[i]);

    if (eCurrent > ePrevious) {
      counter++;
    }
  }

  console.log("Counter", counter);
}

main();
