export const KEY_CODES = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT"
};

export const VECTORS = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1]
};

export function updatePosition(board, direction, currentPosition) {
  let newPositionRow = currentPosition[0] + VECTORS[direction][0];
  let newPositionCol = currentPosition[1] + VECTORS[direction][1];
  let newPosition = [newPositionRow, newPositionCol];

  //checking if user went into a door
  if (board[newPositionRow][newPositionCol] === "Door") {
    return "Door";
  } else if (board[newPositionRow][newPositionCol] === "🐓") {
    board[newPositionRow][newPositionCol] = "";
    return "Caught Chicken";
  } else if (board[newPositionRow][newPositionCol] === "Wall") {
    return currentPosition;
  } else {
    //It's "" so we can move there
    return newPosition;
  }
}

export function getStartingCoordinates(board) {
  let startingChoices = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        startingChoices.push([i, j]);
      }
    }
  }

  let index = Math.floor(Math.random() * startingChoices.length);
  return [startingChoices[index][0], startingChoices[index][1]];
}
