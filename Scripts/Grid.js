//based on the grid size, lets make sure it fits the page
function SetGridSize(x, y) {
    //first do the height
    let squareHeight = (window.innerHeight - 250) / y; //for the nav and extra for bottom buttons

    //now check the width
    let squareWidth = window.innerWidth / x;

    //return the smallest
    return squareHeight < squareWidth ? squareHeight : squareWidth;
}

// New and improved draw grid, using Sean's rewritten method and josh's ID
function DrawGrid(rows, columns) {
    let grid = document.getElementById("theGrid");
    let size = SetGridSize(columns, rows);
    for (let i = 0; i < rows; i++) {
        let row = grid.insertRow(i);

        for (let j = 0; j < columns; j++) {
            let cell = row.insertCell(j);
            cell.id = (i * columns + j + 1).toString(); // Assign a unique id to each cel
            cell.style.width = size.toString() + "px";
            cell.style.height = size.toString() + "px";
        }
    }
}

function applyAnimationToCell(cellNumber, AnimationColor) {
    // Create a unique animation for each cell
    let audio = document.getElementById("audio");
    audio.playbackRate=8;

    // Apply the unique animation to the specific cell
    cellID = cellNumber;
    let theCell = document.getElementById(cellID);
    let style = window.getComputedStyle(theCell);

    theCell.style.clipPath = 'circle(30%)';
    theCell.style.position = 'relative';
    let tempColor = style.getPropertyValue('background-color');
    theCell.style.backgroundColor = AnimationColor;
    let frames = 0;
    audio.play();
    let id = setInterval(frame, 3);

    function frame() {
        if (frames <= 15) {
            if (frames === 15) {
                theCell.style.backgroundColor = "color-mix(in srgb, " + AnimationColor + ", " + tempColor + ")";
            }
            let location = -15 + frames;
            theCell.style.top = location.toString() + 'vh';
            frames++;
        }
        else if (frames > 15 && frames <= 85) {
            let circle = 15 + frames;
            theCell.style.clipPath = `circle(${circle}%)`;
            frames++;
        }
        else {
            clearInterval(id);
        }
    }
}