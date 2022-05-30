const gameBoard = (() => {
  const board = [];

  //create tiles
  const makeTiles = () => {
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.index = i;
      tile.dataset.status = 0;

      const X = document.createElement("span");
      X.classList.add("x", "display-none");
      X.dataset.index = i;
      X.textContent = "X";

      const O = document.createElement("span");
      O.classList.add("o", "display-none");
      O.dataset.index = i;
      O.textContent = "O";

      tile.appendChild(X);
      tile.appendChild(O);
      board.push(tile);
    }
  };

  //render tiles
  const render = () => {
    const gameBoard = document.querySelector(".game-board");

    if (!gameBoard.hasChildNodes()) {
      board.forEach((tile) => {
        gameBoard.appendChild(tile);
      });
    }
  };

  // initiate the gameBoard object's functions
  const init = () => {
    makeTiles();
    render();
  };

  return { init };
})();

const gameController = (() => {
  const firstPlayer = "Player 1";
  const secondPlayer = "Player 2";
  let firstPlayerScores = 0;
  let secondPlayerScores = 0; 

  let currentPlayer = firstPlayer;

  //reset board
  const reset = () => {
    console.log("Reset the board...");
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      const X = tile.childNodes[0];
      const O = tile.childNodes[1];

      X.classList.add("display-none");
      O.classList.add("display-none");

      tile.dataset.status = 0;
    });

    currentPlayer = firstPlayer;
  };

  // event when user click the board
  const turn = (e) => {
    const index = e.dataset.index;

    e.addEventListener("click", () => {
      const X = e.childNodes[0];
      const O = e.childNodes[1];

      if (currentPlayer === firstPlayer && e.dataset.status == 0) {
        X.classList.toggle("display-none");
        currentPlayer = secondPlayer;
        e.dataset.status = "x";
      } else if (currentPlayer === secondPlayer && e.dataset.status == 0) {
        O.classList.toggle("display-none");
        currentPlayer = firstPlayer;
        e.dataset.status = "o";
      }

      let whoWin = checkWin();

      if (whoWin === firstPlayer) {
        console.log(`${firstPlayer} Win!`)
        reset();
      } else if (whoWin === secondPlayer) {
        console.log(`${secondPlayer} Win!`)
        reset();
      }
    });
  };
  
  // checking if a player win the game
  const checkWin = () => {
    console.log("Checking winning status...")
    const tiles = document.querySelectorAll(".tile");

    // check tile status and put it in the tileValue array
    const tileValue = [];
    tiles.forEach((tile) => {
      tileNumber = tile.dataset.index;
      tileStatus = tile.dataset.status;

      tileValue[tileNumber] = tileStatus;
    });

    if ((tileValue[0] == "o" && tileValue[1] == "o" && tileValue[2] == "o") ||
        (tileValue[3] == "o" && tileValue[4] == "o" && tileValue[5] == "o") || 
        (tileValue[6] == "o" && tileValue[7] == "o" && tileValue[8] == "o") ||
        (tileValue[0] == "o" && tileValue[3] == "o" && tileValue[6] == "o") ||
        (tileValue[1] == "o" && tileValue[4] == "o" && tileValue[7] == "o") || 
        (tileValue[2] == "o" && tileValue[5] == "o" && tileValue[8] == "o") ||
        (tileValue[0] == "o" && tileValue[4] == "o" && tileValue[8] == "o") ||
        (tileValue[2] == "o" && tileValue[4] == "o" && tileValue[8] == "o")) {
      return secondPlayer;
      // console.log(`${secondPlayer} Win!`)
    } else if ((tileValue[0] == "x" && tileValue[1] == "x" && tileValue[2] == "x") ||
               (tileValue[3] == "x" && tileValue[4] == "x" && tileValue[5] == "x") || 
               (tileValue[6] == "x" && tileValue[7] == "x" && tileValue[8] == "x") ||
               (tileValue[0] == "x" && tileValue[3] == "x" && tileValue[6] == "x") ||
               (tileValue[1] == "x" && tileValue[4] == "x" && tileValue[7] == "x") || 
               (tileValue[2] == "x" && tileValue[5] == "x" && tileValue[8] == "x") ||
               (tileValue[0] == "x" && tileValue[4] == "x" && tileValue[8] == "x") ||
               (tileValue[2] == "x" && tileValue[4] == "x" && tileValue[8] == "x")) 
               {
                 return firstPlayer;
                //  console.log(`${firstPlayer} Win!`)
               };
    
  };

  // list of events
  const events = () => {
    const resetBtn = document.querySelector("button");
    const tiles = document.querySelectorAll(".tile");

    resetBtn.addEventListener("click", reset);
    tiles.forEach((tile) => {
      turn(tile);
    });
  };

  // initiate the gameController objects' functions
  const init = () => {
    events();
  };

  return { init };
})();

gameBoard.init();
gameController.init();
