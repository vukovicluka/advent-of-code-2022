const { readFileSync } = require("fs");

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
}

// A; //rock
// B; //paper
// C; //scissors

// X; //rock
// Y; //paper
// Z; //scissors

// X lose
// Y draw
// Z win

const playbook = {
  "A X": 3,
  "A Y": 6,
  "A Z": 0,

  "B X": 0,
  "B Y": 3,
  "B Z": 6,

  "C X": 6,
  "C Y": 0,
  "C Z": 3,
};

const getShape = {
  "A X": "Z",
  "A Y": "X",
  "A Z": "Y",

  "B X": "X",
  "B Y": "Y",
  "B Z": "Z",

  "C X": "Y",
  "C Y": "Z",
  "C Z": "X",
};

function play(component) {
  const playScore = playbook[component];
  if (playScore === undefined) {
    console.log("ERROR");
  }
  return playScore;
}

function getShapeBonus(shape) {
  switch (shape) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
    default:
      console.log("UNDEFINED SHAPE");
      break;
  }
}

function main() {
  const input = syncReadFile("./input.txt");

  let endScore = 0;
  for (let i = 0; i < input.length; i++) {
    const component = input[i];
    // console.log("component", component);

    const myShape = getShape[component];
    // console.log("myShape", myShape);

    const [opponentShape] = component.split(" ");

    const playComponent = [opponentShape, myShape].join(" ");
    // console.log("playComponent", playComponent);

    const roundScore = play(playComponent); // 6,3,0

    const shapeBonus = getShapeBonus(myShape); //1,2,3

    const totalRound = roundScore + shapeBonus;

    endScore += totalRound;
  }

  console.log("SCORE ", endScore);
}

main();
