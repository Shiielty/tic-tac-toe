const gameBoard = (() => {

    const board = [];

    //selector
    const btn = document.querySelector("button");
    const gameBoard = document.querySelector(".game-board");
    

    //create tiles
    const makeTiles = () => {
        for (let i = 0; i < 9; i++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.index = i;
            board.push(tile);
        }
    }

    //render tiles
    const render = () => {
        board.forEach((tile) => {
            gameBoard.appendChild(tile);
        });
    }

    const consoleBtn = () => {
        console.log("Hello world!")
    }

    const checkIndex = (e) => {
        e.addEventListener("click", () => console.log(e.dataset.index));
    }

    const events = () => {
        btn.addEventListener("click", consoleBtn)
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile) => {
            checkIndex(tile);
        });
    };

    // initiate the gameBoard object's functions
    const init = () => {
        makeTiles();
        render();
        events();
    }

    return {init}
        
    
})();

gameBoard.init();

