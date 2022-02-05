const processBingoData = (input) => {
  const data = input.split('\n\n');
  let [numbers, ...inpBoards] = data;

  const nums = numbers.split(',').map((num) => parseInt(num));

  const boards = inpBoards.map((board) => {
    const lines = board.split('\n');
    const b = lines.map((line) => {
      const items = line.split(' ');
      return items.filter((str) => str.length > 0).map((str) => parseInt(str));
    });
    return b;
  });

  return { nums: nums, boards: boards };
};

const checkBoard = (board) => {
  // check rows
  for (let row of board) {
    let count = 0;
    for (let item of row) {
      if (item === -1) ++count;
    }
    if (count === 5) return true;
  }

  // check columns

  for (let col = 0; col < board[0].length; ++col) {
    let count = 0;
    for (let row of board) {
      if (row[col] === -1) ++count;
    }
    if (count === 5) return true;
  }

  return false;
};

// returns index of winning board or false if no boards have won
// ERROR: returns before filling all boards case
const fillBoards = (num, boards) => {
  for (let board in boards) {
    for (let row in boards[board]) {
      for (let col in boards[board][row]) {
        if (boards[board][row][col] === num) {
          boards[board][row][col] = -1; // mark with -1 - can also use true or some other value
        }
      }
    }
  }
  let winningBoards = [];
  for (let board in boards) {
    if (checkBoard(boards[board])) {
      winningBoards.push(board);
      return board;
    }
  }
  return winningBoards;
};

const bingo1 = (input) => {
  const { nums, boards } = processBingoData(input);

  let winningBoard, winningBoardCopy, finalNum;
  for (let num of nums) {
    const winners = fillBoards(num, boards);
    if (winners.length > 0) {
      winningBoard = boards[winners[0]];
      finalNum = num;
      break;
    }
  }
  let sum = 0;
  for (let row in winningBoard)
    for (let col in winningBoard[row])
      if (winningBoard[row][col] !== -1) sum += winningBoard[row][col];
  return sum * finalNum;
}; // 10680

const bingo2 = (input) => {
  let { nums, boards } = processBingoData(input);

  let finalNum;
  for (let num of nums) {
    if (boards.length < 2 && fillBoards(num, boards).length > 0) {
      finalNum = num;
      break;
    }
    const winners = fillBoards(num, boards);
    if (winners.length > 0) {
      for (let winner of winners) boards.splice(winner, 1);
    }
  }

  const losingBoard = boards[0];
  let sum = 0;
  for (let row in losingBoard)
    for (let col in losingBoard[row])
      if (losingBoard[row][col] !== -1) sum += losingBoard[row][col];
  return sum * finalNum;
}; // 31892
