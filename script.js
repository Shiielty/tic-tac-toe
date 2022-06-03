// using 'names' instead 'name' because 'name' is marked as deprecated.
const Player = (names, mark) => {
  
  let score = 0;

  const getName = () => names;
  const getMark = () => mark;
  const win = () => score++;
  const getScore = () => score;
  const resetScore = () => score = 0;

  return { getName, getMark, win, getScore, resetScore }
}

const gameMenu = (() => {
  // cached DOM && create game-menu div
  const wrapper = document.querySelector(".wrapper");
  const startMenu = document.createElement("div");
  startMenu.classList.add("start-menu");
  wrapper.appendChild(startMenu);

  const _menu = [];
  const _playerNames = [];
  const playerObjects = [];

  // create _menu for naming players
  const createMenu = () => {
    const p = document.createElement("p");
    p.textContent = "Choose Your Character";
    _menu.push(p);

    for (let i = 0; i < 2; i++) {
      const div = document.createElement("div");
      const playerBtn = document.createElement("button");
      const playerName = document.createElement("input");

      div.classList.add("choose-player");
      playerName.setAttribute("type", "text");
      if (i == 0) {
        playerBtn.textContent = "X";
        playerName.setAttribute("value", "Player 1");
      } else {
        playerBtn.textContent = "O";
        playerName.setAttribute("value", "Player 2");
      }

      div.appendChild(playerBtn);
      div.appendChild(playerName);
      _menu.push(div);
    }

    const startBtn = document.createElement("button");
    startBtn.classList.add("start-btn");
    startBtn.textContent = "START";
    _menu.push(startBtn);
  };

  // render _menu
  const render = () => {
    _menu.forEach((menu) => {
      startMenu.appendChild(menu);
    });
  };

  // start button's event: update input
  const startUpdateInput = () => {
    const startBtn = document.querySelector(".start-btn");
    const playerNameInput = document.querySelectorAll(".choose-player input");

    startBtn.addEventListener("click", () => {
      playerNameInput.forEach((input) => {
        if (playerNameInput[0].value == "") {
          playerNameInput[0].value = "Player 1";
        } else if (playerNameInput[1].value == "") {
          playerNameInput[1].value = "Player 2";
        }
      });
    });
  };

  // get both name to the _playerNames array, then invoke initBoard()
  const getNames = () => {
    const startBtn = document.querySelector(".start-btn");
    const playerNameInput = document.querySelectorAll(".choose-player input");
    
    startBtn.addEventListener("click", () => {
      _playerNames.splice(0, _playerNames.length);
      _playerNames.push(playerNameInput[0].value);
      _playerNames.push(playerNameInput[1].value);

      playerObjects[0] = Player(_playerNames[0], "x");
      playerObjects[1] = Player(_playerNames[1], "o");
    });
  }

  const getfirstPlayer = () => playerObjects[0];
  const getSecondPlayer = () => playerObjects[1];
  
  // initiate startMenu object
  const initMenu = () => {
    createMenu();
    render();
  };
  
  // hide _menu element and initiate gameBoard objects
  const initBoard = () => {
    const startBtn = document.querySelector(".start-btn");

    startBtn.addEventListener("click", () => {
      const playerNameInput = document.querySelectorAll(".choose-player input");
      
      startMenu.classList.add("display-none")
      playerNameInput[0].value = "Player 1";
      playerNameInput[1].value = "Player 2"; 
      gameBoard();
    })
  }

  // Functions immediately invoked when gameMenu object initiated
  initMenu();
  startUpdateInput();
  getNames();
  initBoard();

  return { getfirstPlayer, getSecondPlayer};
})();

const gameBoard = (() => {
  // cached DOM
  const wrapper = document.querySelector(".wrapper");

  const info = [];
  const board = [];

  const firstPlayer = gameMenu.getfirstPlayer();
  const secondPlayer = gameMenu.getSecondPlayer();

  // create infos section: players name, reset button & gameBoard div
  const createInfo = () => {
    const gameInfo = document.createElement("div");
    const firstPlayerName = document.createElement("span");
    const secondPlayerName = document.createElement("span");
    const firstPlayerScore = document.createElement("span");
    const secondPlayerScore = document.createElement("span");
    const boardMenu = document.createElement("div");
    const menuBtn = document.createElement("button");
    const resetBtn = document.createElement("button");
    const gameBoard = document.createElement("div");

    gameInfo.classList.add("game-info");
    firstPlayerName.classList.add("first-player-name")
    secondPlayerName.classList.add("second-player-name")
    firstPlayerScore.classList.add("player-score")
    secondPlayerScore.classList.add("player-score")

    boardMenu.classList.add("board-menu");
    menuBtn.classList.add("board-menu-btn", "menu-btn");
    resetBtn.classList.add("board-menu-btn", "reset-btn")
    gameBoard.classList.add("game-board");
    
    firstPlayerName.textContent = `${firstPlayer.getName()} v`;
    secondPlayerName.textContent = `s ${secondPlayer.getName()}`;
    firstPlayerScore.textContent = `${firstPlayer.getScore()}`
    secondPlayerScore.textContent = `${secondPlayer.getScore()}`
    menuBtn.textContent = "◀ MENU"
    resetBtn.textContent = "RESET"
    
    gameInfo.appendChild(firstPlayerScore)
    gameInfo.appendChild(firstPlayerName);
    gameInfo.appendChild(secondPlayerName);
    gameInfo.appendChild(secondPlayerScore)
    
    boardMenu.appendChild(menuBtn);
    boardMenu.appendChild(resetBtn);
    info.push(gameInfo);
    info.push(boardMenu);
    info.push(gameBoard);
  }

  //create tiles for the gameBoard
  const makeTiles = () => {
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.index = i;
      tile.dataset.status = 0;

      const X = document.createElement("span");
      X.classList.add("x", "display-none");
      X.dataset.index = i;
      X.textContent = firstPlayer.getMark().toUpperCase();

      const O = document.createElement("span");
      O.classList.add("o", "display-none");
      O.dataset.index = i;
      O.textContent = secondPlayer.getMark().toUpperCase();

      tile.appendChild(X);
      tile.appendChild(O);
      board.push(tile);
    }
  };

  //render infos & tiles in gameBoard div
  const render = () => {

    info.forEach((info) => wrapper.appendChild(info));

    const gameBoard = document.querySelector(".game-board");

    board.forEach((tile) => {
      gameBoard.appendChild(tile);
    });
  };

  // initiate gameBoard object
  const init = () => {
    createInfo();
    makeTiles();
    render();
    gameController();
  };

  init();
});

const gameController = (() => {
  // cached DOM
  const startMenu = document.querySelector(".start-menu");
  const gameInfo = document.querySelector(".game-info");
  const boardMenu = document.querySelector(".board-menu");
  const gameBoard = document.querySelector(".game-board");
  const firstPlayerScore = document.querySelector("span:first-of-type");
  const secondPlayerScore = document.querySelector("span:last-of-type");
  const menuBtn = document.querySelector(".menu-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const tiles = document.querySelectorAll(".tile");

  const firstPlayer = gameMenu.getfirstPlayer();
  const secondPlayer = gameMenu.getSecondPlayer();
  
  let result = "";

  let currentPlayer = firstPlayer;

  
  // event triggered when user click the board
  const turn = (e) => {
    e.addEventListener("click", () => {
      if (result === "") {
        const X = e.childNodes[0];
        const O = e.childNodes[1];

        if (currentPlayer === firstPlayer && e.dataset.status == 0) {
          X.classList.toggle("display-none");
          e.dataset.status = firstPlayer.getMark();
          currentPlayer = secondPlayer;
        } else if (currentPlayer === secondPlayer && e.dataset.status == 0) {
          O.classList.toggle("display-none");
          e.dataset.status = secondPlayer.getMark();
          currentPlayer = firstPlayer;
        }
        
        result = checkWin();
        
        if (result === firstPlayer) {
          resultMessage(result);
          firstPlayer.win();
          firstPlayerScore.textContent = firstPlayer.getScore();
        } else if (result === secondPlayer) {
          resultMessage(result);
          secondPlayer.win();
          secondPlayerScore.textContent = secondPlayer.getScore();
        } else if (result === "draw") {
          resultMessage(result);
        }
      }
    });
  };

  // checking if a player win the game
  const checkWin = () => {
    const tiles = document.querySelectorAll(".tile");
    
    // check tile status and put it in the tileValue array
    const tileValue = [];
    tiles.forEach((tile) => {
      tileNumber = tile.dataset.index;
      tileStatus = tile.dataset.status;
      
      tileValue[tileNumber] = tileStatus;
    });
    
    if (
      (tileValue[0] == "o" && tileValue[1] == "o" && tileValue[2] == "o") ||
      (tileValue[3] == "o" && tileValue[4] == "o" && tileValue[5] == "o") ||
      (tileValue[6] == "o" && tileValue[7] == "o" && tileValue[8] == "o") ||
      (tileValue[0] == "o" && tileValue[3] == "o" && tileValue[6] == "o") ||
      (tileValue[1] == "o" && tileValue[4] == "o" && tileValue[7] == "o") ||
      (tileValue[2] == "o" && tileValue[5] == "o" && tileValue[8] == "o") ||
      (tileValue[0] == "o" && tileValue[4] == "o" && tileValue[8] == "o") ||
      (tileValue[2] == "o" && tileValue[4] == "o" && tileValue[6] == "o")
      ) {
        return secondPlayer;
      } else if (
        (tileValue[0] == "x" && tileValue[1] == "x" && tileValue[2] == "x") ||
        (tileValue[3] == "x" && tileValue[4] == "x" && tileValue[5] == "x") ||
        (tileValue[6] == "x" && tileValue[7] == "x" && tileValue[8] == "x") ||
        (tileValue[0] == "x" && tileValue[3] == "x" && tileValue[6] == "x") ||
        (tileValue[1] == "x" && tileValue[4] == "x" && tileValue[7] == "x") ||
        (tileValue[2] == "x" && tileValue[5] == "x" && tileValue[8] == "x") ||
        (tileValue[0] == "x" && tileValue[4] == "x" && tileValue[8] == "x") ||
        (tileValue[2] == "x" && tileValue[4] == "x" && tileValue[6] == "x")
        ) {
      return firstPlayer;
    } else if (
      tileValue[0] != 0 &&
      tileValue[1] != 0 &&
      tileValue[2] != 0 &&
      tileValue[3] != 0 &&
      tileValue[4] != 0 &&
      tileValue[5] != 0 &&
      tileValue[6] != 0 &&
      tileValue[7] != 0 &&
      tileValue[8] != 0 &&
      tileValue[0] != 0 &&
      tileValue[3] != 0 &&
      tileValue[6] != 0 &&
      tileValue[1] != 0 &&
      tileValue[4] != 0 &&
      tileValue[7] != 0 &&
      tileValue[2] != 0 &&
      tileValue[5] != 0 &&
      tileValue[8] != 0 &&
      tileValue[0] != 0 &&
      tileValue[4] != 0 &&
      tileValue[8] != 0 &&
      tileValue[2] != 0 &&
      tileValue[4] != 0 &&
      tileValue[6] != 0
      ) {
        return "draw";
      } else return "";
    };

  const resultMessage = (e) => {
    const resultBg = document.createElement("div");
    const resultMsg = document.createElement("p");
    const playAgainBtn = document.createElement("button");
    
    resultBg.classList.add("result-bg");
    resultMsg.classList.add("result-msg");
    playAgainBtn.classList.add("board-menu-btn", "play-again")
    
    playAgainBtn.textContent = "⟲"
    
    if (e === "draw") {
      resultMsg.textContent = "DRAW!";
    } else {
      resultMsg.textContent = `${e.getName()} WIN THE GAME!`;
    }

    gameBoard.insertBefore(resultBg, gameBoard.firstChild);
    resultBg.appendChild(resultMsg);
    resultBg.appendChild(playAgainBtn);
    
    playAgainBtn.addEventListener("click", resetBoard)
  };
  
  const backToMenu = () => {
    resetBoard();
    gameInfo.remove();
    boardMenu.remove();
    gameBoard.remove();
    startMenu.classList.remove("display-none");
  }
  
  // reset the board
  const resetBoard = () => {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      const X = tile.childNodes[0];
      const O = tile.childNodes[1];

      X.classList.add("display-none");
      O.classList.add("display-none");

      tile.dataset.status = 0;
    });

    currentPlayer = firstPlayer;
    result = "";
    if (gameBoard.firstChild.classList.value === "result-bg") {
      const resultElement = document.querySelector(".result-bg");
      resultElement.remove();
    }
  };

  // reset the board AND the score
  const reset = () => {
    resetBoard();
    firstPlayer.resetScore();
    secondPlayer.resetScore();
    firstPlayerScore.textContent = firstPlayer.getScore();
    secondPlayerScore.textContent = secondPlayer.getScore();
  }

  // list of events
  const events = () => {
    menuBtn.addEventListener("click", backToMenu);
    resetBtn.addEventListener("click", reset);
    tiles.forEach((tile) => {
      turn(tile);
    });
  };

  // initiate the gameController objects' functions
  const init = () => {
    events();
  };

  init();
});

