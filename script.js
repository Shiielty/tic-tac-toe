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

    board.forEach((tile) => {
      gameBoard.appendChild(tile);
    });
  };

  // initiate the gameBoard object's functions
  const init = () => {
    makeTiles();
    render();
  };

  return { init };
})();

const gameController = (() => {
  const player1 = "Player 1";
  const player2 = "Player 2";

  let currentPlayer = player1;

  const reset = () => {
    console.log("Hello, world!");
    const test = document.querySelectorAll(".tile");

    test.forEach((tile) => {
      const X = tile.childNodes[0];
      const O = tile.childNodes[1];

      X.classList.add("display-none");
      O.classList.add("display-none");

      tile.dataset.status = 0;
    });

    currentPlayer = player1;
  };

  const turn = (e) => {
    const index = e.dataset.index;

    e.addEventListener("click", () => {
      const X = e.childNodes[0];
      const O = e.childNodes[1];

      if (currentPlayer === player1 && e.dataset.status == 0) {
        console.log(currentPlayer);
        X.classList.toggle("display-none");
        currentPlayer = player2;
        e.dataset.status = 1;
        console.log(e.dataset.status);
      } else if (currentPlayer === player2 && e.dataset.status == 0) {
        console.log(currentPlayer);
        O.classList.toggle("display-none");
        currentPlayer = player1;
        e.dataset.status = 1;
        console.log(e.dataset.status);
      }
    });
  };

  const events = () => {
    const btn = document.querySelector("button");
    const test = document.querySelectorAll(".tile");

    btn.addEventListener("click", reset);
    test.forEach((tile) => {
      turn(tile);
    });
  };

  const init = () => {
    events();
  };

  return { init };
})();

gameBoard.init();
gameController.init();
