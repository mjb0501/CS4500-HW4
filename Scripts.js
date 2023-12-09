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
    gridSize:function(){return this.xVal * this.yVal;},
    colorTotalAllowedDrops:function(){return (this.xVal * this.yVal) * 2; }
};

const singleExperiment = {
    xVal: 0,
    yVal: 0,
    stoppingCriteria: 0,
    gridSize: function() {return this.xVal * this.yVal;},
    colors: [],
    colorTotalAllowedDrops:function(){return (this.xVal * this.yVal) * 2; }
};

function Results() {
    this.c0Drops = 0;
    this.c1Drops = 0;
    this.c2Drops = 0;
    this.maxDrops1Square = 0;
    this.averageDrops = 0;
    this.totalDrops = function (){
        return this.c0Drops + this.c1Drops + this.c2Drops
    };
}

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
};

function isFullFunction(dropTracker){
    let isFull = true;
    for(let i = 0; i < dropTracker.length; i++) {
        if(dropTracker[i] === 0)
            return isFull = false;
    }
    return isFull;
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
    let graph = document.getElementById('graphContainer');
    finishExpOneMessage.hidden = true;
    placeholderGrid.hidden = false;
    secondExplanation.hidden = false;
    if (graph) { //just in case it has not been created yet
        graph.hidden = true;
    }
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
    let totalDrops = 0; //tracks drops in switch case 2

    switch (currentExperiment.stoppingCriteria) {
        case 0:
            function paintLoopCriteria0() {
                setTimeout(function () {
                    let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                    randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                    let color = Math.floor(Math.random() * 3);
                    applyAnimationToCell(randomCoord, currentExperiment.colors[color]);
                    dropTracker[randomCoord - 1]++;
                    if (!stoppingCriteria.isFull(currentExperiment.gridSize())) {
                        paintLoopCriteria0();
                    } else {
                        setupNextExperiment("All squares have been dripped on!");
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
                if (!isDoubleDripped) {
                    paintLoopCriteria1();
                } else {
                    setupNextExperiment("A square has been double dripped on!");
                }
            }, 300)
        }
            paintLoopCriteria1(); //run at least once, it will stay in loop as needed
            break;
        case 2:
        function paintLoopCriteria2() {
            setTimeout(function () {
                let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                applyAnimationToCell(randomCoord, currentExperiment.colors[color]);
                totalDrops++;
                console.log(totalDrops);
                console.log(currentExperiment.colorTotalAllowedDrops());
                if (totalDrops < currentExperiment.colorTotalAllowedDrops()) {
                    paintLoopCriteria2();
                } else {
                    setupNextExperiment(currentExperiment.colorTotalAllowedDrops() + " drops have been painted!");
                }
            }, callTime)
        }
            paintLoopCriteria2(); //run at least once, it will stay in loop as needed
            break;
    }

}

let currentPercent = 0;

function PAINT_MANY(experimentParameters){
/*
Independent variables:  0 = dimension
                        1 = x value
                        2 = repetitions
 */
    allResults = [];
    let thisExperiment = singleExperiment;
    let totalRuns = 0;
    let runCounter = 0;
    currentPercent = 0;
    thisExperiment.colors = experimentParameters.colors;
    switch (experimentParameters.independentVar){

        case 0:
            thisExperiment.stoppingCriteria = experimentParameters.stoppingCriteria;
            totalRuns = experimentParameters.independentVarValues.length * experimentParameters.reps;
            let i = 0;
            let j = 0;
            let finished = false;
            function loopFirstCriteria() {
                setTimeout(function () {
                    for (let newBatch = 0; newBatch < 100; newBatch++) {
                        if (i === experimentParameters.independentVarValues.length) {
                            finished = true;
                            break; //we are done now
                        }
                        thisExperiment.xVal = experimentParameters.independentVarValues[i];
                        thisExperiment.yVal = experimentParameters.independentVarValues[i];
                        SINGLE_PAINT(thisExperiment);
                        setTableData(runCounter);
                        j++;
                        runCounter++;
                        currentPercent = Math.floor((runCounter / totalRuns) * 100);
                        updateProgressBar();
                        if (j === experimentParameters.reps) {
                            //reached max amount of reps this go around
                            i++;
                            j = 0;
                        }
                    }
                    if (finished) {
                        let progressMessage = document.getElementById("progressMessage");
                        progressMessage.text = "Simulation finished. Loading Results....";
                        setTable(); //finished, lets show the table
                    } else {
                        loopFirstCriteria();
                    }
                }, 4); //this gives control back to the UI to update progress bar (4 is minimum)
            }
            loopFirstCriteria();
            break;
        case 1:
            thisExperiment.yVal = experimentParameters.yVal;
            thisExperiment.stoppingCriteria = experimentParameters.stoppingCriteria;
            for(let i = 0; i < experimentParameters.independentVarValues.length; i++){
                thisExperiment.xVal = experimentParameters.independentVarValues[i];
                for(let j = 0; j < experimentParameters.reps; j++){
                    SINGLE_PAINT(thisExperiment);
                }
            }
            break;
        case 2:
            thisExperiment.xVal = experimentParameters.xVal;
            thisExperiment.yVal = experimentParameters.yVal;
            thisExperiment.stoppingCriteria = experimentParameters.stoppingCriteria;
            for(let i = 0; i < experimentParameters.independentVarValues.length; i++){
                for(let j = 0; j < experimentParameters.independentVarValues[i]; j++){
                    SINGLE_PAINT(thisExperiment);
                }
            }
            break;

    }
    console.log(allResults);
}

function SINGLE_PAINT(currentExperiment) {

    let dropTracker = new Array(currentExperiment.gridSize()).fill(0);
    let result = new Results;
    let totalDrops = 0;

    switch (currentExperiment.stoppingCriteria) {
        case 0:
            let isFull = false;
            while (!isFull) {
                let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                dropTracker[randomCoord - 1]++;
                if (color === 0)
                    result.c0Drops++;
                else if (color === 1)
                    result.c1Drops++;
                else if (color === 2)
                    result.c2Drops++;
                isFull = isFullFunction(dropTracker);
            }
            result.averageDrops = (result.totalDrops() / currentExperiment.gridSize());
            for (let i = 0; i < currentExperiment.gridSize(); i++) {
                if (dropTracker[i] > result.maxDrops1Square) {
                    result.maxDrops1Square = dropTracker[i];
                }
            }

            allResults.push(result);
            break;

        case 1:
            let isDoubleDripped = false;
            while (!isDoubleDripped) {
                let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                dropTracker[randomCoord - 1]++; // lets add the drop now before checking for double drips
                for (let i = 0; i < dropTracker.length; i++) {
                    if (dropTracker[i - 1] === 2) {
                        isDoubleDripped = true;
                        break;
                    }
                }
                if (color === 0)
                    result.c0Drops++;
                else if (color === 1)
                    result.c1Drops++;
                else if (color === 2)
                    result.c2Drops++;
            }
            result.averageDrops = (result.totalDrops() / currentExperiment.gridSize());
            for (let i = 0; i < currentExperiment.gridSize(); i++) {
                if (dropTracker[i] > result.maxDrops1Square) {
                    result.maxDrops1Square = dropTracker[i];
                }
            }
            allResults.push(result);
            break;

        case 2:
            let totalDropsReached = false;
            while (!totalDropsReached) {
                let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                dropTracker[randomCoord - 1]++;
                totalDrops++;
                console.log(totalDrops);
                console.log(currentExperiment.colorTotalAllowedDrops());
                if (totalDrops >= currentExperiment.colorTotalAllowedDrops())
                    totalDropsReached = true;
                if (color === 0)
                    result.c0Drops++;
                else if (color === 1)
                    result.c1Drops++;
                else if (color === 2)
                    result.c2Drops++;
            }

            result.averageDrops = (result.totalDrops() / currentExperiment.gridSize());
            for (let i = 0; i < currentExperiment.gridSize(); i++) {
                if (dropTracker[i] > result.maxDrops1Square) {
                    result.maxDrops1Square = dropTracker[i];
                }
            }
            allResults.push(result);
            break;
    }
}

function getStarted() {
    ShowMessage();
    introAnimation();
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
            //remove this line of code before submission
            submit.hidden = false;
            text.innerHTML = "Now you can conduct experiments based on the paintings by choosing independent and dependent variables.";
        }
        if (page2 == 2) {
            decrement.hidden = false;
            //remove this line of code before submission
            submit.hidden = true;
            text.innerHTML = "First you will be asked to choose an independent variable They are as follows:<br>1. Single Dimension for X and Y axis<br>2. X Dimension<br>3. Number of Repetitions";
        }
        if (page2 == 3) {
            text.innerHTML = "After that you will be asked to provide the values of the independent variables in a comma seperated list like this: 3, 4, 5, 6";
        }
        if (page2 == 4) {
            text.innerHTML = "After that you will be asked to provide values for either <br>1. repetitions<br>2. x and y dimensions<br>3. y dimension and repetitions";
        }
        if (page2 == 5) {
            text.innerHTML = "After providing those values you will be prompted for colors and stopping criteria like you just did for the painting.";
        }
        if (page2 == 6) {
            text.innerHTML = "After submitting colors and stopping criteria the experiment will run after which a variety of dependent variable values gathered from the experiments will be shown in a table format and you will have to choose one or two dependent variables.";
        }
        if (page2 == 7) {
            text.innerHTML = "After choosing dependent variables, graphs will be shown corresponding to the dependent variables you have chosen.";
        }
        if (page2 == 8) {
            increment.hidden = false;
            submit.hidden = true;
            text.innerHTML = "After this the experiment is complete and you will be able to make another graph based on the experiment data, make a new experiment or quit the program.";
        }
        if (page2 == 9) {
            increment.hidden = true;
            submit.hidden = false;
            text.innerHTML = "You are ready to begin the experiment.  Have fun Experimenting!";
        }
    }
    return false;
}

function updateProgressBar(width) {
    let theBar = document.getElementById("theBar");
    //theBar.style.width = width + "%";
    //theBar.innerHTML = width + "%";

    (function asyncLoop() {
        theBar.style.width = currentPercent + "%";
        theBar.innerHTML = currentPercent + "%";
        if (currentPercent <= 100) {
            setTimeout(asyncLoop, 50);
        }
    })();
}

function endProgram() {
    //document.getElementById(/*This is where text box for displaying thank you would go.*/).innerHTML = "Thank You for using our program.  Come Back anytime.";
    const timeout = setTimeout(function(){window.location.href = "index.html";}, 5000);
}