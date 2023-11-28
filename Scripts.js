const experimentParameters = {
    dVal:null,
    xVal:null,
    yVal:null,
    reps:null,
    stoppingCriteria:null,
    independentVar:null,
    independentVarValues:[],
    dependentVar:null,
    colors: [],
    gridSize:function(){return (this.xVal * this.yVal)}
};

const singleExperiment = {
    xVal: 0,
    yVal: 0,
    stoppingCriteria: 0,
    gridSize: function() {return (this.xVal * this.yVal)},
    colors: []
};

const results = {
    totalDrops:function(){return this.c1Drops + this.c2Drops + this.c3Drops},
    c1Drops:0,
    c2Drops:0,
    c3Drops:0,
    maxDrops1Square:0,
    averageDrops:0,
};

let allResults = [];

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
    var squareHeight = (window.innerHeight - 250) / y; //for the nav and extra for bottom buttons

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
    let style = window.getComputedStyle(theCell);

    theCell.style.clipPath = 'circle(30%)';
    theCell.style.position = 'relative';
    let tempColor = style.getPropertyValue('background-color');
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

function secondAnimation() {
    let container = document.getElementById("animationStaging");
    let text = document.getElementById("animationText2");
    let submit = document.getElementById("submit2");
    let increment = document.getElementById("increment2");
    let decrement = document.getElementById("decrement2");
    let page2 = 1;

    let frames = 0;

    let id = setInterval(animate, 2);

    function incrementPage() {
        page2++;
    }

    function decrementPage() {
        page2--;
    }

    secondAnimation.incrementPage = incrementPage;
    secondAnimation.decrementPage = decrementPage;
    function animate() {
        if (page2 == 1) {
            decrement.hidden = true;
            text.innerHTML = "Now you can conduct experiments based on the paintings by choosing independent and dependent variables.";
        }
        if (page2 == 2) {
            decrement.hidden = false;
            text.innerHTML = "First you will be asked to choose an independent variable in the experiment and the number of independent variables you would like.";
        }
        if (page2 == 3) {
            text.innerHTML = "After that you will be asked to provide the values of the independent variables in a comma seperated list like this: 3, 4, 5, 6";
        }
        if (page2 == 4) {
            text.innerHTML = "After that you will be asked to provide values for either the number of repetitions, x and y dimensions, or y dimension and number of repetitions depending on your choice of independent variables.";
        }
        if (page2 == 5) {
            text.innerHTML = "After providing those values you will be prompted for colors and stopping criteria like you just did for the painting.";
        }
        if (page2 == 6) {
            text.innerHTML = "After submitting colors and stopping criteria the experiment will run after which a variety of dependent variable values will be shown in a table format and you will have to choose one or two dependent variables.";
        }
        if (page2 == 7) {
            text.innerHTML = "After choosing dependent variables, graphs will be shown corresponding to the dependent variables you have chosen.";
        }
        if (page2 == 8) {
            increment.hidden = false;
            submit.hidden = true;
            text.innerHTML = "After this the experiment is complete and you will be able to make another graph based on the experiment data, make a new experiment or quit the program.";
        }
        if (page2 == 8) {
            increment.hidden = true;
            submit.hidden = false;
            text.innerHTML = "You are ready to begin the experiment.  Have fun Experimenting!";
        }
    }
    return false;
}

//this method does some hiding and showing on the UI to setup the next experiment
function setupNextExperiment(message) {
    let speedButtons = document.getElementById("speedButtons");
    let finishExpOneMessage = document.getElementById("finishExpOneMessage");
    let finishMessage = document.getElementById("finishMessage");
    speedButtons.hidden = true;
    finishExpOneMessage.hidden = false;
    finishMessage.textContent = finishMessage.textContent + " " + message;
}

function closeExperimentOne() {
    let secondExplanation = document.getElementById("secondExplanation");
    let finishExpOneMessage = document.getElementById("finishExpOneMessage");
    let theGrid = document.getElementById("theGrid");
    let placeholderGrid = document.getElementById("placeholderGrid");
    finishExpOneMessage.hidden = true;
    placeholderGrid.hidden = false;
    secondExplanation.hidden = false;
    theGrid.hidden = true;
    return false;
}

function PAINT_ONCE(currentExperiment) {
    let callTime = 500;
    let speed = 1.0;
    let speedButton = document.getElementById("speedUp");
    let slowButton = document.getElementById("slowDown");
    let currentSpeed = document.getElementById("speed");
    let speedButtons = document.getElementById("speedButtons");
    speedButtons.hidden = false;

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

    DrawGrid(currentExperiment.yVal, currentExperiment.xVal);
    //build an array of grid size, fill it with the number 0 all the way through
    let dropTracker = new Array(currentExperiment.gridSize()).fill(0);

    switch (currentExperiment.stoppingCriteria) {
        case 0:
            function paintLoopCriteria0() {
                setTimeout(function () {
                    let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                    randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                    let color = Math.floor(Math.random() * 3);
                    applyAnimationToCell(randomCoord, currentExperiment.colors[color]);
                    dropTracker[randomCoord - 1]++;
                    if (color === 0)
                        results.c1Drops++;
                    if (color === 1)
                        results.c2Drops++;
                    if (color === 2)
                        results.c3Drops++;
                    if (!stoppingCriteria.isFull(currentExperiment.gridSize())) {
                        paintLoopCriteria0();
                    } else {
                        setupNextExperiment("All squares have been dripped on!");
                        results.averageDrops = (results.totalDrops() / currentExperiment.gridSize());
                        for(let i = 0; i < currentExperiment.gridSize(); i++){
                            if(dropTracker[i] > results.maxDrops1Square) {
                                results.maxDrops1Square = dropTracker[i];
                            }
                        }
                        console.log(results.maxDrops1Square);
                    }
                }, callTime)
            }
            paintLoopCriteria0(); //run at least once, it will stay in loop as needed
            break;
        case 1:
            let isDoubleDripped = false;
        function paintLoopCriteria1() {
            setTimeout(function () {
                let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                applyAnimationToCell(randomCoord, currentExperiment.colors[color]);
                dropTracker[randomCoord - 1]++; // lets add the drop now before checking for double drips
                for (let i = 0; i < dropTracker.length; i++) {
                    if (dropTracker[i - 1] === 2) {
                        isDoubleDripped = true;
                        break;
                    }
                }
                if (color === 0)
                    results.c1Drops++;
                if (color === 1)
                    results.c2Drops++;
                if (color === 2)
                    results.c3Drops++;
                if (!isDoubleDripped) {
                    paintLoopCriteria1();
                } else {
                    setupNextExperiment("A square has been double dripped on!");
                    results.averageDrops = (results.totalDrops() / currentExperiment.gridSize());
                    for(let i = 0; i < currentExperiment.gridSize(); i++){
                        if(dropTracker[i] > results.maxDrops1Square) {
                            results.maxDrops1Square = dropTracker[i];
                        }
                    }
                }
            }, 300)
        }
            paintLoopCriteria1(); //run at least once, it will stay in loop as needed
            break;
    }

    //console.log("Max drop on a square: " + results.maxDrops1Square);
    //console.log(dropTracker);
    //console.log(results);
    //console.log(currentExperiment);
}

function PAINT_MANY(experimentParameters){
/*
Independent variables:  0 = dimension
                        1 = repetitions
                        2 = stopping criteria
                        3 = x value
                        4 = y value
 */
    allResults = [];

    switch (experimentParameters.independentVar){
        case 0:
            for(let i = 0; i < experimentParameters.independentVarValues.length; i++){
                for(let j = 0; j < experimentParameters.reps; j++){
                    let thisExperiment = singleExperiment;
                    thisExperiment.xVal = experimentParameters.independentVarValues[i];
                    thisExperiment.yVal = experimentParameters.independentVarValues[i];
                    thisExperiment.colors = experimentParameters.colors;
                    thisExperiment.stoppingCriteria = experimentParameters.stoppingCriteria;
                    PAINT_ONCE(thisExperiment);
                }
            }

    }
}

function getStarted() {
    ShowMessage();
    introAnimation();
}