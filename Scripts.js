const experimentParameters = {
    dVal:0,
    reps:0,
    stoppingCriteria:0,
    independentVar:"0",
    independentVarQuantity:0,
    dependentVar:"0",
    gridSize:function(){return xDimBox.value * yDimBox.value;}
};


const independentVarValues = [];

const results = {
    totalDrops:function(){return this.c1Drops + this.c2Drops + this.c3Drops},
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
            let currentCell = document.getElementById(((i+1).toString()));
            let currentColor = window.getComputedStyle(currentCell).getPropertyValue('background-color');
            console.log(currentCell);
            console.log(currentColor);
            if (color === "white") //insert proper call to tell if square has been colored.
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
            cell.id = (i * columns + j + 1).toString(); // Assign a unique id to each cel
            console.log(cell.id);
        }
    }
// test animation coloring

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
function PAINT_ONCE(x, y, colors, stoppingCriteriaChoice){
    DrawGrid(x, y);
    experimentParameters.xVal = xDimBox.value;
    experimentParameters.yVal = yDimBox.value;
    experimentParameters.stoppingCriteria = stoppingCDropdown.value;
    console.log(experimentParameters);
    switch(stoppingCriteriaChoice) {
        case 0:
            while (!stoppingCriteria.isFull()) {
                let randomCoord = Math.floor(Math.random() * experimentParameters.gridSize());
                let color = Math.floor(Math.random()*3);
                applyAnimationToCell(randomCoord, colors[color]);
                if(color === 0)
                    results.c1Drops++;
                if(color === 1)
                    results.c2Drops++;
                if(color === 2)
                    results.c3Drops++;
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