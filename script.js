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
            console.log(tile);
            tile = null;
            console.log(tile);
        }
    }

    //render tiles
    const render = () => {
        board.forEach((tile) => {
            gameBoard.appendChild(tile);
        });
    }

    // initiate the gameBoard object's functions
    const init = () => {
        makeTiles();
        render();
    }

    const alertBtn = () => {
        btn.addEventListener("click", () => alert("Hi! Let's start this project!"))
    };

    return {init, alertBtn}
        
    
})();

gameBoard.init();


// testing does the dataset are correctly used :: problem is I can't put this variable and function in the gameBoard yet
const tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => {
    tile.addEventListener("click", () => console.log(tile.dataset.index));
});