const { syncReadFile } = require("../util/syncReadFile");

function createTree(input) {
  const tree = {
    name: "/",
    isDirectory: true,
    children: [],
  };

  let currentNode = tree;
  let currentCommand = null;

  for (const row of input) {
    if (row.includes("$")) {
      const [, command, dirName] = row.split(" ");
      currentCommand = command;

      if (currentCommand === "cd") {
        if (dirName === "/") {
          currentNode = tree;
        } else if (dirName === "..") {
          currentNode = currentNode.parent;
        } else {
          currentNode = currentNode.children.find(
            (dir) => dir.isDirectory && dir.name === dirName
          );
        }
      }
    } else {
      if (currentCommand === "ls") {
        if (!row.includes("dir")) {
          const [size, name] = row.split(" ");

          const node = {
            name,
            size: parseInt(size),
            isDirectory: false,
            parent: currentNode,
          };
          currentNode.children.push(node);
        } else if (row.includes("dir")) {
          const [, name] = row.split(" ");

          const node = {
            name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          };
          currentNode.children.push(node);
        }
      }
    }
  }

  return tree;
}

function getSize(node, callback = () => {}) {
  if (!node.isDirectory) {
    return node.size;
  }

  const directorySize = node.children
    .map((child) => getSize(child, callback))
    .reduce((acc, e) => (acc += e), 0);

  callback(node.name, directorySize);

  return directorySize;
}

function main1() {
  const inputLines = syncReadFile("./input.txt");
  const tree = createTree(inputLines);

  let sum = 0;

  const callback = (_, size) => {
    if (size <= 100000) {
      sum += size;
    }
  };

  getSize(tree, callback);

  console.log("SUM:", sum);
}

function main2() {
  const totalDiskSpace = 70000000;
  const requiredSpace = 30000000;

  const input = syncReadFile("./input.txt");
  const tree = createTree(input);

  const usedSpace = getSize(tree);
  const availableSpace = totalDiskSpace - usedSpace;
  const minSize = requiredSpace - availableSpace;

  const possibleSizes = [];

  const callback = (_, size) => {
    if (size >= minSize) {
      possibleSizes.push(size);
    }
  };

  getSize(tree, callback);

  const [bestOption] = possibleSizes.sort((a, b) => a - b);

  console.log("Best option:", bestOption);
}

// main1();
main2();
