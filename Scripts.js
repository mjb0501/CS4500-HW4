const experimentParameters = {
    dVal:0,
    reps:0,
    stoppingCriteria:0,
    independentVar:"0",
    independentVarQuantity:0,
    dependentVar:"0",
    gridSize:function(){return xDimBox.value * yDimBox.value;}
};

const initialExperiment = {
    xVal: 0,
    yVal: 0,
    stoppingCriteria: 0,
    gridSize: function() {return this.x * this.y;},
    colors: []
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
    isFull: function(size)
    {
        let isFull = true;
        for(let i = 0; i < size; i++) {
            let currentCell = document.getElementById(((i+1).toString()));
            let currentColor = window.getComputedStyle(currentCell).getPropertyValue('background-color');
            if (currentColor === "rgb(255, 255, 255)") //insert proper call to tell if square has been colored.
                return isFull = false;
        }
        return isFull;
    }
}

//based on the grid size, lets make sure it fits the page
function SetGridSize(x, y) {
    //first do the height
    var squareHeight = (window.innerHeight - 125) / y; //for the nav and extra for bottom

    //now check the width
    var squareWidth = window.innerWidth / x;

    //return the smallest
    return squareHeight < squareWidth ? squareHeight : squareWidth;
}

// New and improved draw grid, using Sean's rewritten method and josh's ID
function DrawGrid(rows, columns) {
    var grid = document.getElementById("theGrid");
    var size = SetGridSize(columns, rows);
    for (var i = 0; i < rows; i++) {
        var row = grid.insertRow(i);

        for (var j = 0; j < columns; j++) {
            var cell = row.insertCell(j);
            cell.id = (i * columns + j + 1).toString(); // Assign a unique id to each cel
            cell.style.width = size.toString() + "px";
            cell.style.height = size.toString() + "px";
        }
    }
}

function applyAnimationToCell(cellNumber, AnimationColor) {
    // Create a unique animation for each cell
    let animationName = "paintDrop-" + cellNumber;
    let styleSheet = document.styleSheets[0];

    // Apply the unique animation to the specific cell
    cellID = cellNumber;
    let theCell = document.getElementById(cellID);
    console.log(cellNumber);
    let style = window.getComputedStyle(theCell);

    theCell.style.clipPath = 'circle(30%)';
    theCell.style.position = 'relative';
    let tempColor = style.getPropertyValue('background-color');
    console.log("color: " + tempColor);
    theCell.style.backgroundColor = AnimationColor;
    let frames = 0;
    let id = setInterval(frame, 3);

    function frame() {
        if (frames <= 15) {
            if (frames == 15) {
                theCell.style.backgroundColor = "color-mix(in srgb, " + AnimationColor + ", " + tempColor + ")";
            }
            let location = -15 + frames;
            theCell.style.top = location.toString() + 'vh';
            frames++;
            //console.log(frames);
        }
        else if (frames > 15 && frames <= 85) {
            let circle = 15 + frames;
            theCell.style.clipPath = `circle(${circle}%)`;
            frames++;
            console.log(frames);
        }
        else {
            clearInterval(id);
        }
    }



/* Old Animation way using css instead of javascript
    theCell.style.position = `relative`;
    theCell.style.clipPath = `circle(30%)`;
    styleSheet.insertRule(`@keyframes ${animationName} {
                          0% { top: -100px; }
                          50% { top: 0; background-color: ${AnimationColor}; clip-path: circle(30%); }
                          100% { background-color: color-mix(in srgb, ${AnimationColor}, ${style.getPropertyValue('background-color')}); clip-path: circle(100%); }
                        }`, styleSheet.cssRules.length);
    theCell.style.animationFillMode = `forwards`;
    theCell.style.animation = `${animationName} 3s linear forwards`;
    //theCell.style.backgroundColor = `blue`;
    theCell.animationName = 'none';
    //theCell.style.animation = 'none';
    //theCell.offsetHeight;
    //theCell.style.animation = null;
    //theCell.style.backgroundColor = `blue`;//`color-mix(in srgb, ${AnimationColor}, ${style.getPropertyValue('background-color')}`;

*/
}

function paintSingleCanvas(currentExperiment){
    let randomCoord = Math.floor(Math.random() * currentExperiment.gridSize() + 1);
    let color = Math.floor(Math.random() * 3);
    applyAnimationToCell(randomCoord, currentExperiment.colors[color]);
    if(color === 0) {
        results.c1Drops++;
    }
    if(color === 1) {
        results.c2Drops++;
    }
    if(color === 2) {
        results.c3Drops++;
    }
}


const allResults = [];

function PAINT_ONCE(currentExperiment) {
    //console.log(experimentParameters);
    let callTime = 500;
    let speed = 1.0;
    let speedButton = document.getElementById("speedUp");
    let slowButton = document.getElementById("slowDown");
    let currentSpeed = document.getElementById("speed");
    speedButton.hidden = false;
    slowButton.hidden = false;
    currentSpeed.hidden = false;

    function speedUp() {
        slowButton.disabled = false;
        slowButton.innerHTML = "Slow Down";
        speed += 0.2;
        callTime -= 50;
        currentSpeed.innerHTML = speed.toPrecision(2) + "x";
        if (speed >= 3.0) {
            speedButton.disabled = true;
            speedButton.innerHTML = "Max";
        }
    }

    function slowDown() {
        speedButton.disabled = false;
        speedButton.innerHTML = "Speed Up";
        speed -= 0.2;
        callTime += 50;
        currentSpeed.innerHTML = speed.toPrecision(2) + "x";
        if (speed <= 0.3) {
            slowButton.disabled = true;
            slowButton.innerHTML = "Max";
        }
    }

    PAINT_ONCE.speedUp = speedUp;
    PAINT_ONCE.slowDown = slowDown;

    DrawGrid(currentExperiment.y, currentExperiment.x);
    switch (currentExperiment.stoppingCriteria) {
        case 0:
            function paintLoopCriteria0() {
                setTimeout(function () {
                    let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                    randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                    let color = Math.floor(Math.random() * 3);
                    applyAnimationToCell(randomCoord, currentExperiment.colors[color]);
                    if (color === 0)
                        results.c1Drops++;
                    if (color === 1)
                        results.c2Drops++;
                    if (color === 2)
                        results.c3Drops++;
                    if (!stoppingCriteria.isFull(currentExperiment.gridSize()))
                        paintLoopCriteria0();
                }, callTime)
            }
            paintLoopCriteria0(); //run at least once, it will stay in loop as needed
            break;
        case 1:
            let isDoubleDripped = false;
            const dropTracker = [];
            function paintLoopCriteria1() {
                setTimeout(function () {
                    let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                    randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                    let color = Math.floor(Math.random() * 3);
                    applyAnimationToCell(randomCoord, currentExperiment.colors[color]);
                    console.log("Length of tracker: " + dropTracker.length);
                    for (let i = 0; i < dropTracker.length; i++) {
                        if (dropTracker[i] === randomCoord) {
                            isDoubleDripped = true;
                        }
                    }
                    dropTracker.push(randomCoord);
                    if (color === 0)
                        results.c1Drops++;
                    if (color === 1)
                        results.c2Drops++;
                    if (color === 2)
                        results.c3Drops++;
                    if (!isDoubleDripped)
                        paintLoopCriteria0();
                    }, 300)
                }
            paintLoopCriteria1(); //run at least once, it will stay in loop as needed
            break;
    }
}

function PAINT_MANY(x, y, c1, c2, c3, stoppingCriteria, reps){

}

function getStarted() {
    ShowMessage();
    introAnimation();
}