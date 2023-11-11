const experimentParameters = {
    xVal:0,
    yVal:0,
    dVal:0,
    reps:0,
    c1:"0",
    c2:"0",
    c3:"0",
    stoppingCriteria:0,
    independentVar:"0",
    independentVarQuantity:0,
    dependentVar:"0",
    gridSize:function(){return this.x * this.y;}
};

const independentVarValues = [];

const results = {
    totalDrops:0,
    c1Drops:0,
    c2Drops:0,
    c3Drops:0,
    maxDrops:0,
    averageDrops:0,
};

const stoppingCriteria = {
    //isFull should be sent as 0.
    isFull: function()
    {
        let isFull = true;
        for(let i = 0; i < experimentParameters.gridSize(); i++) {
            if (!square[i]) //insert proper call to tell if square has been colored.
                return isFull = false;
        }
        return isFull;
    },

    //isDoubleDropped should be sent as 1
    isDoubleDropped:function(){
        let isDoubleDropped = false;
        for(let i = 0; i < experimentParameters.gridSize(); i++) {
            if(square[i].drops > 1) //insert proper check for number of drops
                return isDoubleDropped = true;
        }
        return isDoubleDropped;
    },
}

// New and improved draw grid, using Sean's rewritten method and josh's ID
function DrawGrid(rows, columns) {
    var grid = document.getElementById("theGrid");

    for (var i = 0; i < rows; i++) {
        var row = grid.insertRow(i);

        for (var j = 0; j < columns; j++) {
            var cell = row.insertCell(j);
            cell.id = (i * columns + j + 1).toString(); // Assign a unique class to each cel
        }
    }
// test animation coloring
    applyAnimationToCell(1, "green");
    applyAnimationToCell(2, "blue" );
    applyAnimationToCell(7, "red");
    applyAnimationToCell(50, "purple");
    applyAnimationToCell(1, "blue");
}

function applyAnimationToCell(cellNumber, AnimationColor) {
    // Create a unique animation for each cell
    var animationName = "paintDrop-" + cellNumber;
    var styleSheet = document.styleSheets[0];

    // Apply the unique animation to the specific cell
    var cellID = cellNumber;
    var theCell = document.getElementById(cellID);
    var style = window.getComputedStyle(theCell);

    theCell.style.position = `relative`;
    theCell.style.clipPath = `circle(30%)`;
    styleSheet.insertRule(`@keyframes ${animationName} {
                          0% { top: -50vh; }
                          50% { top: 0; background-color: ${AnimationColor}; clip-path: circle(30%); }
                          100% { background-color: color-mix(in srgb, ${AnimationColor}, ${style.getPropertyValue('background-color')}); clip-path: circle(100%); }
                        }`, styleSheet.cssRules.length);
    theCell.style.animationFillMode = `forwards`;
    theCell.style.animation = `${animationName} 10s linear forwards`;
    //cells[0].style.backgroundColor = 'blue';//`color-mix(in srgb, ${AnimationColor}, ${style.getPropertyValue('background-color')}`;
}

const allResults = [];
function PAINT_ONCE(x, y, c1, c2, c3, stoppingCriteriaChoice){
    DrawGrid(x, y);
    switch(stoppingCriteriaChoice) {
        case 0:
            while (!stoppingCriteria.isFull()) {
                let randomCoord = Math.floor(Math.random() * experimentParameters.gridSize());
                let color = Math.floor(Math.random() /*times however we quantify colors*/)
                // Insert logic that initiates paint animation
                grid[randomCoord].color++;
            }
            break;
        case 1:
            while (!stoppingCriteria.isDoubleDropped()){
                let randomCoord = Math.floor(Math.random() * experimentParameters.gridSize());
                let color = Math.floor(Math.random() /*times however we quantify colors*/)
                // Insert logic that initiates paint animation
                grid[randomCoord].color++;
            }
    }
}

function PAINT_MANY(x, y, c1, c2, c3, stoppingCriteria, reps){

}