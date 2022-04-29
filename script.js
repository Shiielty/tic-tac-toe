const gameBoard = (() => {

    const board = [];
    
    //create tiles
    const makeTiles = () => {
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.index = i;
            
            const X = document.createElement("span");
            X.classList.add("x");
            X.dataset.index = i;
            X.textContent = "X";
            
            const O = document.createElement("span");
            O.classList.add("o");
            O.dataset.index = i;
            O.textContent = "O";
            
            tile.appendChild(X);
            tile.appendChild(O);
            board.push(tile);
        }
    }

    //render tiles
    const render = () => {
        const gameBoard = document.querySelector(".game-board");
        
        board.forEach((tile) => {
            gameBoard.appendChild(tile);
        });
    }

    // initiate the gameBoard object's functions
    const init = () => {
        makeTiles();
        render();
    }
    
    return {init}  
})();

const gameController = (() => {

    const consoleBtn = () => {
        console.log("Hello world!");
    }

    const checkIndex = (e) => {
        e.addEventListener("click", () => console.log(e.dataset.index));
    }

    const events = () => {
        const btn = document.querySelector("button");
        const test = document.querySelectorAll(".tile");

        btn.addEventListener("click", consoleBtn);
        test.forEach((tile) => {
            checkIndex(tile);
        });
    };

    const init = () => {
        events();
    }

    return{init};
})();


gameBoard.init();
gameController.init();