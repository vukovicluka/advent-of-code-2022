const { readFileSync } = require("fs");

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
}

function getPriority(letter) {
  if (letter.toLowerCase() === letter) {
    return letter.charCodeAt(0) - 96;
  }

  return letter.charCodeAt(0) - 38;
}

function main() {
  const input = syncReadFile("./input.txt");

  let sum = 0;
  for (let i = 0; i < input.length; i += 3) {
    const s1 = input[i];
    const s2 = input[i + 1];
    const s3 = input[i + 2];

    const s1Array = [...s1];

    const elementPresentInAllThreeGroups = s1Array.find(
      (e) => [...s2].includes(e) && [...s3].includes(e)
    );

    // const middleOfString = string.length / 2;
    // const [first, second] = [
    //   string.slice(0, middleOfString),
    //   string.slice(middleOfString),
    // ];

    // const firstArray = [...first];

    // const presentElementInSecond = firstArray.find((e) =>
    //   [...second].includes(e)
    // );

    sum += getPriority(elementPresentInAllThreeGroups);
  }

  console.log("Priority sum: ", sum);
}

main();
