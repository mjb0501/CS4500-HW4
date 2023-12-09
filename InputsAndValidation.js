//global elements
//dropdowns
let color1Dropdown, color2Dropdown, color3Dropdown, stoppingCDropdown, color1DropdownSecond, color2DropdownSecond, color3DropdownSecond, stoppingCDropdownSecond, independentDropdown;
//input errors
let inputError, inputErrorSecond
//X, Y & Independent
let yDimBox, xDimBox, yDimBoxSecond, xDimBoxSecond, indVarValues, numIndValues, repetitions;
//forms
let form, inputFormSecond, secondExplanation, progressBar;
//input box and placeholder
let theInputBox, inputBoxSecond, placeholderBox;
//grid stuff
let theGrid, mainGridDiv;
//the different sections of 2nd experiment(s)
let partOne, partTwo, partThree, partFour, partFive, partSix;

//constant dropdown values
const colorOptions = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "grey"];
const stoppingOptions = ["Every square is full", "A single square was double dropped on","(2 x Grid Size) of color drops have fallen"];
const independentVariables = ["Single Dimension for both X and Y axis", "X Dimension", "Number of Repetitions"];

//sets all the global elements
function getGlobalElements() {
    //dropdowns
    color1Dropdown = document.getElementById("colors1");
    color2Dropdown = document.getElementById("colors2");
    color3Dropdown = document.getElementById("colors3");
    color1DropdownSecond = document.getElementById("colors1Second");
    color2DropdownSecond = document.getElementById("colors2Second");
    color3DropdownSecond = document.getElementById("colors3Second");
    stoppingCDropdown = document.getElementById("stoppingC");
    stoppingCDropdownSecond = document.getElementById("stoppingCSecond");
    independentDropdown = document.getElementById("indVar");

    //input errors
    inputError = document.getElementById("inputError");
    inputErrorSecond = document.getElementById("inputErrorSecond");

    //X, Y & Independent
    xDimBox = document.getElementById("xDim");
    yDimBox = document.getElementById("yDim");
    xDimBoxSecond = document.getElementById("xDimSecond");
    yDimBoxSecond = document.getElementById("yDimSecond");
    indVarValues = document.getElementById("indVarValues");
    numIndValues = document.getElementById("numIndValues");
    repetitions = document.getElementById("repetitions");

    //forms
    form = document.getElementById("inputFormIntro");
    inputFormSecond = document.getElementById("inputFormSecond");
    secondExplanation = document.getElementById("secondExplanation");
    progressBar = document.getElementById("progressBar");

    //input box and placeholder
    theInputBox = document.getElementById("inputBoxFirst");
    inputBoxSecond = document.getElementById("inputBoxSecond");
    placeholderBox = document.getElementById("placeholderGrid");

    //grid stuff
    mainGridDiv = document.getElementById("mainGrid");
    theGrid = document.getElementById("theGrid");

    //the different sections of 2nd experiment(s)
    partOne = document.getElementById("partOne");
    partTwo = document.getElementById("partTwo");
    partThree = document.getElementById("partThree");
    partFour = document.getElementById("partFour");
    partFive = document.getElementById("partFive");
    partSix = document.getElementById("partSix");
}

//populates the color dropdown
function populateColorDropdown(dropdown) {
    for (let i = 0; i < colorOptions.length; i++) {
        const opt = colorOptions[i];
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = colorOptions[i];
        dropdown.appendChild(el);
    }
}

//disables or re-enables colors that have already been selected
function disableEnableSelectedOptions(dropdowns) {
    for (let i = 0; i < colorOptions.length; i++) {
        let colorSelected = colorOptions[i] === dropdowns[0].value || colorOptions[i] === dropdowns[1].value ||  colorOptions[i] === dropdowns[2].value;
        for (let j = 0; j < dropdowns.length; j++) {
            dropdowns[j].options[i].disabled = colorSelected;
        }
    }
}

function stoppingCriteriaUpdate(type) {
    if (type === 1) {
        if (parseInt(xDimBox.value) && parseInt(yDimBox.value)) {
            let drops = parseInt(xDimBox.value) * parseInt(yDimBox.value);
            stoppingCDropdown.options[2].text = drops + " color drops have fallen";
        } else {
            stoppingCDropdown.options[2].text = "(2 x Grid Size) color drops have fallen";
        }
    } else {
        if (parseInt(xDimBoxSecond.value) && parseInt(yDimBoxSecond.value)) {
            let drops2 = parseInt(xDimBoxSecond.value) * parseInt(yDimBoxSecond.value);
            stoppingCDropdownSecond.options[2].text = drops2 + " color drops have fallen";
        } else {
            stoppingCDropdownSecond.options[2].text = "(2 x Grid Size) color drops have fallen";
        }
    }
}

//on page load, lets do some tasks
window.addEventListener("load", (event) => {
    getGlobalElements();
    //hide the errorValidation box
    inputError.hidden = true;
    theGrid.hidden = true;

    stoppingCDropdown.addEventListener('change', function() {
        stoppingCriteriaUpdate(1);
    });
    stoppingCDropdownSecond.addEventListener('change', function() {
        stoppingCriteriaUpdate(2);
    });
    xDimBox.addEventListener('change', function() {
        stoppingCriteriaUpdate(1);
    });
    yDimBox.addEventListener('change', function() {
        stoppingCriteriaUpdate(1);
    });
    xDimBoxSecond.addEventListener('change', function() {
        stoppingCriteriaUpdate(2);
    });
    yDimBoxSecond.addEventListener('change', function() {
        stoppingCriteriaUpdate(2);
    });

    //let's add the colors to the dropdowns
    populateColorDropdown(color1Dropdown);
    populateColorDropdown(color2Dropdown);
    populateColorDropdown(color3Dropdown);

    //let's add the colors to the dropdowns for 2nd experiment
    populateColorDropdown(color1DropdownSecond);
    populateColorDropdown(color2DropdownSecond);
    populateColorDropdown(color3DropdownSecond);

    const colorsInitial = document.querySelectorAll('#colors1, #colors2, #colors3');
    const colorsSecond = document.querySelectorAll('#colors1Second, #colors2Second, #colors3Second');
    //initial event listeners
    for (let i = 0; i < colorsInitial.length; i++) {
        colorsInitial[i].addEventListener('change', function () {
            disableEnableSelectedOptions(colorsInitial);
        });
        colorsSecond[i].addEventListener('change', function () {
            disableEnableSelectedOptions(colorsSecond);
        });
    }

    color1Dropdown.value = "red";
    color2Dropdown.value = "green";
    color3Dropdown.value = "blue";
    disableEnableSelectedOptions(colorsInitial);

    color1DropdownSecond.value = "red";
    color2DropdownSecond.value = "green";
    color3DropdownSecond.value = "blue";
    disableEnableSelectedOptions(colorsSecond);

    for(i = 0; i < stoppingOptions.length; i++) {
        opt = stoppingOptions[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        stoppingCDropdown.appendChild(el);
    }

    for(i = 0; i < stoppingOptions.length; i++) {
        opt = stoppingOptions[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        stoppingCDropdownSecond.appendChild(el);
    }

    for(i = 0; i < independentVariables.length; i++) {
        opt = independentVariables[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        independentDropdown.appendChild(el);
    }

    //do not let the form refresh the page, this is all done in JS
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
    secondExplanation.addEventListener('submit', handleForm);
    inputFormSecond.addEventListener('submit', handleForm);
});

function validateForm() {
    inputError.hidden = true;
    inputError.innerHTML = "";
    xDimBox.style.border = "";
    yDimBox.style.border = "";
    let returnVal = true;

    if (xDimBox.value > 50 || xDimBox.value < 1) {
        xDimBox.style.border ="3px solid red";
        inputError.innerHTML = "Your X dimension value must be between 1 and 50";
        returnVal = false;
    }
    if (yDimBox.value > 50 || yDimBox.value < 1) {
        yDimBox.style.border ="3px solid red";
        inputError.innerHTML += inputError.innerHTML !== "" ? "<br>Your Y dimension value must be between 1 and 50" : "Your Y dimension value must be between 1 and 50";
        returnVal = false;
    }

    if (!returnVal) {
        inputError.hidden = false;
    } else {
        //populate the DTO to send over to scripts
        let thisExperiment = singleExperiment;
        thisExperiment.colors.push(color1Dropdown.value);
        thisExperiment.colors.push(color2Dropdown.value);
        thisExperiment.colors.push(color3Dropdown.value);
        thisExperiment.xVal = parseInt(xDimBox.value);
        thisExperiment.yVal = parseInt(yDimBox.value);
        thisExperiment.stoppingCriteria = parseInt(stoppingCDropdown.value);
        //let's hide this box and make the grid front and center of everything
        placeholderBox.hidden = true;
        theGrid.hidden = false;
        theInputBox.hidden = true;
        mainGridDiv.className = "col-md-12";
        PAINT_ONCE(thisExperiment);
    }
    return returnVal;
}

//BEGIN 2nd ROUND OF EXPERIMENTS
function showInputSecondRound() {
    secondExplanation.hidden = true;
    theGrid.hidden = true;
    inputBoxSecond.hidden = false;
    return true;
}

function resetError() {
    numIndValues.style.border = "";
    indVarValues.style.border = "";
    repetitions.style.border = "";
    inputErrorSecond.innerHTML = "";
}

//globals for the second experiment(s)
let indValueSelection = -1;
let indValueCount = 0;
let indValues = [];
let XVal = 0;
let YVal = 0;
let reps = 0;

function continueOne() {
    //setup the independent variable with # of independent values
    if (numIndValues.value > 10 || numIndValues.value < 2) {
        numIndValues.style.border ="3px solid red";
        inputErrorSecond.innerHTML = "Please select a valid number between 2 and 10.";
        return false;
    }
    indValueSelection = independentDropdown.selectedIndex;
    indValueCount = parseInt(numIndValues.value);
    resetError();
    partOne.hidden = true;
    partTwo.hidden = false;
}

function returnOne() {
    partOne.hidden = false;
    partTwo.hidden = true;
}

function continueTwo() {
    //get the independent values
    let values = indVarValues.value;
    let valueArray = values.split(',');
    let pastValue = 0;
    indValues = []; //reset

    if (valueArray.length !== indValueCount) {
        indVarValues.style.border = "3px solid red";
        inputErrorSecond.innerHTML = "You must provide " + indValueCount + " independent values that you indicated in the previous step.";
        return false;
    }
    for (let i = 0; i < valueArray.length; i++)
    {
        let currentValue = valueArray[i].trim();
        if (isNaN(currentValue)) {
            indVarValues.style.border = "3px solid red";
            inputErrorSecond.innerHTML = "Your independent values contain something that is not a number.<br>Or, you did not use commas to separate your values.";
            return false;
        }
        currentValue = parseInt(currentValue);
        if (currentValue === 0) {
            indVarValues.style.border ="3px solid red";
            inputErrorSecond.innerHTML = "Your independent values cannot contain a 0.";
            return false;
        }
        if (currentValue <= pastValue) {
            indVarValues.style.border ="3px solid red";
            inputErrorSecond.innerHTML = "Your independent values must be in increasing order.";
            return false;
        }
        if (indValueSelection === 0 || indValueSelection === 1) {
            if (currentValue < 1 || currentValue > 50) {
                indVarValues.style.border = "3px solid red";
                inputErrorSecond.innerHTML = "Your independent values can only be between 1 and 50. (for the grid)";
                return false;
            }
        } else if (indValueSelection === 2) {
            if (currentValue < 1 || currentValue > 10000) {
                indVarValues.style.border = "3px solid red";
                inputErrorSecond.innerHTML = "Your independent values can only be between 1 and 10000. (for the repetitions)";
                return false;
            }
        }
        pastValue = currentValue;
        indValues.push(currentValue);
    }

    resetError();
    if (indValueSelection === 0) {
        //they chose same value for X & Y
        partTwo.hidden = true;
        partFive.hidden = false;
    } else if (indValueSelection === 1) {
        //they only chose a value for X
        partTwo.hidden = true;
        partFour.hidden = false;
    } else if (indValueSelection === 2) {
        //they chose a value for repetitions
        partTwo.hidden = true;
        partThree.hidden = false;
    }
}

function returnTwo() {
    partThree.hidden = true;
    partTwo.hidden = false;
}

function continueThree() {
    //get the X Dim value
    if (xDimBoxSecond.value > 50 || xDimBoxSecond.value < 1) {
        xDimBoxSecond.style.border ="3px solid red";
        inputErrorSecond.innerHTML = "Please select a valid number between 1 and 50.";
        return false;
    }
    XVal = parseInt(xDimBoxSecond.value);
    partThree.hidden = true;
    partFour.hidden = false;
}

function returnThree() {
    partFour.hidden = true;
    if (indValueSelection === 1) { //they only chose a value for X
        partTwo.hidden = false;
    } else if (indValueSelection === 2) { //they chose a value for repetitions
        partThree.hidden = false;
    }
}

function continueFour() {
    //get the Y Dim value
    if (yDimBoxSecond.value > 50 || yDimBoxSecond.value < 1) {
        yDimBoxSecond.style.border ="3px solid red";
        inputErrorSecond.innerHTML = "Please select a valid number between 1 and 50.";
        return false;
    }
    YVal = parseInt(yDimBoxSecond.value);
    if (indValueSelection === 1) {
        //they only chose a value for X
        partFour.hidden = true;
        partFive.hidden = false;
    } else if (indValueSelection === 2) {
        //they chose a value for repetitions
        partFour.hidden = true;
        partSix.hidden = false;
    }
}

function returnFour() {
    partFive.hidden = true;
    if (indValueSelection === 0) { //they chose a value for X & Y
        partTwo.hidden = false;
    } else if (indValueSelection === 1) { //they only chose a value for X
        partFour.hidden = false;
    }
}

function continueFive() {
    //let's validate and send them to the final section
    if (repetitions.value > 10000 || repetitions.value < 1) {
        repetitions.style.border ="3px solid red";
        inputErrorSecond.innerHTML = "Please select a valid number between 1 and 10000.";
        return false;
    }
    reps = parseInt(repetitions.value);
    resetError();
    partFive.hidden = true;
    partSix.hidden = false;
}

function returnFive() {
    partSix.hidden = true;
    if (indValueSelection === 0 || indValueSelection === 1) {
        partFive.hidden = false;
    } else if (indValueSelection === 2) { //they only chose repetitions
        partFour.hidden = false;
    }
}

function validateSecondForm() {
    //populate the DTO to send over to scripts
    let thisExperiment = experimentParameters;
    thisExperiment.xVal = XVal;
    thisExperiment.yVal = YVal;
    thisExperiment.reps = reps;
    thisExperiment.stoppingCriteria = parseInt(stoppingCDropdownSecond.value);
    thisExperiment.independentVar = indValueSelection;
    thisExperiment.independentVarValues = indValues;
    thisExperiment.colors.push(color1DropdownSecond.value);
    thisExperiment.colors.push(color2DropdownSecond.value);
    thisExperiment.colors.push(color3DropdownSecond.value);
    partSix.hidden = true;
    secondExplanation.hidden = true;
    progressBar.hidden = false;
    inputBoxSecond.hidden = true;
    PAINT_MANY(thisExperiment);
    return true;
}

function setTable(){
    progressBar.hidden = true;
    createTable();
}

function resetInputs() {
    document.getElementsByName('lastOption').forEach(function(value) { value.checked = false; }); //reset it
    xDimBoxSecond.value = "";
    yDimBoxSecond.value = "";
    indVarValues.value = "";
    indValues.value = [];
    numIndValues.value = "";
    repetitions.value = "";

    const colorsSecond = document.querySelectorAll('#colors1Second, #colors2Second, #colors3Second');
    color1DropdownSecond.value = "red";
    color2DropdownSecond.value = "green";
    color3DropdownSecond.value = "blue";
    disableEnableSelectedOptions(colorsSecond);

    let theBar = document.getElementById("theBar");
    theBar.style.width = 0 + "%";
    theBar.innerHTML = 0 + "%";

    partOne.hidden = false;
    partTwo.hidden = true;
    partThree.hidden = true;
    partFour.hidden = true;
    partFive.hidden = true;
    partSix.hidden = true;
    currentPercent = 0;
    document.getElementById("table-container").remove(); //need to remove the original table
    document.getElementById("closeTable").remove(); //need to remove the close table button
}
