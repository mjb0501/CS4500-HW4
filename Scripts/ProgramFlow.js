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

function secondAnimation() {
    let text = document.getElementById("animationText2");
    let submit = document.getElementById("submit2");
    let increment = document.getElementById("increment2");
    let decrement = document.getElementById("decrement2");
    let page2 = 1;

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
        if (page2 === 1) {
            decrement.hidden = true;
            text.innerHTML = "You can now conduct experiments based on a painting by choosing independent and dependent variables.";
        }
        if (page2 === 2) {
            decrement.hidden = false;
            text.innerHTML = "First, you will be asked to choose an independent variable. They are as follows:<br>1. Single Dimension for X and Y axis<br>2. X Dimension<br>3. Number of Repetitions";
        }
        if (page2 === 3) {
            text.innerHTML = "After that, you will be asked to provide the values of the independent variables in a comma seperated list. For example: 3, 4, 5, 6";
        }
        if (page2 === 4) {
            text.innerHTML = "Then, you will be asked to provide values for either <br>1. Repetitions<br>2. X and Y Dimensions<br>3. Y Dimension and Repetitions";
        }
        if (page2 === 5) {
            text.innerHTML = "After providing those values, you will be prompted for colors and stopping criteria like you were for the painting.";
        }
        if (page2 === 6) {
            text.innerHTML = "Following submitting colors and stopping criteria, the experiment will run. Afterwards, a variety of dependent variable values gathered from the experiments will be shown in a table format, and you will have to choose one or two dependent variables.";
        }
        if (page2 === 7) {
            text.innerHTML = "After choosing dependent variables, graphs will be shown corresponding to the dependent variables you have chosen.";
        }
        if (page2 === 8) {
            increment.hidden = false;
            submit.hidden = true;
            text.innerHTML = "After this, the experiment is complete, and you will be able to make another graph based on the experiment data, make a new experiment or quit the program.";
        }
        if (page2 === 9) {
            increment.hidden = true;
            submit.hidden = false;
            text.innerHTML = "You are ready to begin the experiment.  Have fun Experimenting!";
        }
    }
    return false;
}

function endProgram() {
    document.getElementById("finalMessageHeader").innerHTML = "Thank you for using our program. Come back anytime!";
    document.getElementById("newGraph").hidden = true;
    document.getElementById("newGraphLabel").hidden = true;
    document.getElementById("newExperiment").hidden = true;
    document.getElementById("newExperimentLabel").hidden = true;
    document.getElementById("Quit").hidden = true;
    document.getElementById("QuitLabel").hidden = true;
    document.getElementById("finalSelectionSubmit").hidden = true;
    setTimeout(function(){window.location.href = "index.html";}, 5000);
}

function makeFinalSelection() {
    let options = document.getElementsByName('lastOption');

    for (let i = 0; i < options.length; i++) {
        if (options[i].checked)
            switch (options[i].value) {
                case "0":
                    //new dependent values and chart
                    resetInputs(0);
                    document.getElementById("dependentValues").hidden = false;
                    document.getElementById("finalMessage").hidden = true;
                    break;
                case "1":
                    //new experiment
                    resetInputs(1);
                    document.getElementById("inputBoxSecond").hidden = false;
                    document.getElementById("finalMessage").hidden = true;
                    break;
                case "2":
                    //they quit
                    resetInputs(2);
                    endProgram();
                    break;
            }
    }
}