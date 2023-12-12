function PAINT_MANY(){
    //Independent variables:  0 = dimension, 1 = x value, 2 = repetitions
    allResults = [];
    let thisExperiment = singleExperiment;
    let totalRuns = 0;
    let runCounter = 0;
    currentPercent = 0;
    let i = 0;
    let j = 0;
    let finished = false;
    thisExperiment.colors = experimentParameters.colors;
    switch (experimentParameters.independentVar){
        case 0:
            thisExperiment.stoppingCriteria = experimentParameters.stoppingCriteria;
            totalRuns = experimentParameters.independentVarValues.length * experimentParameters.reps;
        function loopFirstCriteria() {
            setTimeout(function () {
                for (let newBatch = 0; newBatch < 100; newBatch++) {
                    if (i === experimentParameters.independentVarValues.length) {
                        finished = true;
                        break; //we are done now
                    }
                    thisExperiment.xVal = experimentParameters.independentVarValues[i];
                    thisExperiment.yVal = experimentParameters.independentVarValues[i];
                    thisExperiment.currIndValue = experimentParameters.independentVarValues[i];
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
            totalRuns = experimentParameters.independentVarValues.length * experimentParameters.reps;
        function loopSecondCriteria() {
            setTimeout (function() {
                for (let newBatch = 0; newBatch < 100; newBatch++) {
                    if (i === experimentParameters.independentVarValues.length) {
                        finished = true;
                        break;
                    }
                    thisExperiment.xVal = experimentParameters.independentVarValues[i];
                    thisExperiment.currIndValue = experimentParameters.independentVarValues[i];
                    SINGLE_PAINT(thisExperiment);
                    setTableData(runCounter);
                    j++;
                    runCounter++;
                    currentPercent = Math.floor((runCounter / totalRuns) * 100);
                    updateProgressBar();
                    if (j === experimentParameters.reps) {
                        i++;
                        j = 0;
                    }
                }
                if (finished) {
                    let progressMessage = document.getElementById("progressMessage");
                    progressMessage.text = "Simulation finished. Loading Results....";
                    setTable();
                } else {
                    loopSecondCriteria();
                }
            }, 4);
        }
            loopSecondCriteria();
            break;
        case 2:
            thisExperiment.xVal = experimentParameters.xVal;
            thisExperiment.yVal = experimentParameters.yVal;
            thisExperiment.stoppingCriteria = experimentParameters.stoppingCriteria;
            totalRuns = 0;
            for (i = 0; i < experimentParameters.independentVarValues.length; i++) {
                totalRuns += experimentParameters.independentVarValues[i];
            }
        function loopThirdCriteria() {
            setTimeout(function () {
                for (let newBatch = 0; newBatch < 100; newBatch++) {
                    if (i === experimentParameters.independentVarValues.length) {
                        finished = true;
                        break;
                    }
                    thisExperiment.currIndValue = experimentParameters.independentVarValues[i];
                    SINGLE_PAINT(thisExperiment);
                    setTableData(runCounter);
                    j++;
                    runCounter++;
                    currentPercent = Math.floor((runCounter / totalRuns) * 100);
                    updateProgressBar();
                    if (j === experimentParameters.independentVarValues[i]) {
                        i++;
                        j = 0;
                    }
                }
                if (finished) {
                    let progressMessage = document.getElementById("progressMessage");
                    progressMessage.text = "Simulation finished. Loading Results....";
                    setTable();
                } else {
                    loopThirdCriteria();
                }
            }, 4);
        }
            loopThirdCriteria();
            break;
    }
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
            result.indValue = currentExperiment.currIndValue;
            allResults.push(result);
            break;
        case 1:
            let isDoubleDripped = false;
            while (!isDoubleDripped) {
                let randomCoord = Math.floor(Math.random() * (currentExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                dropTracker[randomCoord - 1]++; // let's add the drop now before checking for double drips
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
            result.indValue = currentExperiment.currIndValue;
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
            result.indValue = currentExperiment.currIndValue;
            allResults.push(result);
            break;
    }
}

//updates the progress bar to ensure that the user knows something is happening.
function updateProgressBar(width) {
    let theBar = document.getElementById("theBar");
    theBar.style.width = currentPercent + "%";
    theBar.innerHTML = currentPercent + "%";
}