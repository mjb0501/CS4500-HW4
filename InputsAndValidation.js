//global elements
let color1Dropdown, color2Dropdown, color3Dropdown, stoppingCDropdown;
let color1DropdownSecond, color2DropdownSecond, color3DropdownSecond, stoppingCDropdownSecond, independentDropdown;
let theGrid, mainGridDiv, form, inputFormSecond, secondExplanation;
let inputError, theInputBox, inputBoxSecond;
let yDimBox, xDimBox, placeholderBox;
const colorOptions = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "grey"];

//sets all the global elements
function getGlobalElements() {
    color1Dropdown = document.getElementById("colors1");
    color2Dropdown = document.getElementById("colors2");
    color3Dropdown = document.getElementById("colors3");
    color1DropdownSecond = document.getElementById("colors1Second");
    color2DropdownSecond = document.getElementById("colors2Second");
    color3DropdownSecond = document.getElementById("colors3Second");
    inputError = document.getElementById("inputError");
    stoppingCDropdown = document.getElementById("stoppingC");
    stoppingCDropdownSecond = document.getElementById("stoppingCSecond");
    independentDropdown = document.getElementById("indVar");
    xDimBox = document.getElementById("xDim");
    yDimBox = document.getElementById("yDim");
    theInputBox = document.getElementById("inputBoxFirst");
    inputBoxSecond = document.getElementById("inputBoxSecond");
    mainGridDiv = document.getElementById("mainGrid");
    placeholderBox = document.getElementById("placeholderGrid");
    form = document.getElementById("inputFormIntro");
    inputFormSecond = document.getElementById("inputFormSecond");
    secondExplanation = document.getElementById("secondExplanation");
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

//on page load, lets do some tasks
window.addEventListener("load", (event) => {
    getGlobalElements();
    //hide the errorValidation box
    inputError.hidden = true;
    theGrid = document.getElementById("theGrid");
    theGrid.hidden;

    //let's add the colors to the dropdowns
    populateColorDropdown(color1Dropdown);
    color1Dropdown.value = "red";
    populateColorDropdown(color2Dropdown);
    color2Dropdown.value = "green";
    populateColorDropdown(color3Dropdown);
    color3Dropdown.value = "blue";

    //let's add the colors to the dropdowns for 2nd experiment
    populateColorDropdown(color1DropdownSecond);
    color1DropdownSecond.value = "red";
    populateColorDropdown(color2DropdownSecond);
    color2DropdownSecond.value = "green";
    populateColorDropdown(color3DropdownSecond);
    color3DropdownSecond.value = "blue";

    //let's add the stopping criteria
    var stoppingOptions = ["Every square is full", "A single square was double dropped on"];

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

    var independentVariables = ["Single Dimension for both X and Y axis", "X Dimension", "Number of Repetitions"];
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
    function handleForm(event) { event.preventDefault(); }
    secondExplanation.addEventListener('submit', handleForm);
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
    inputFormSecond.hidden = false;
    secondExplanation.hidden = true;
    theGrid.hidden = true;
    inputBoxSecond.hidden = false;
    return true;
}

function continueOne() {
    let partOne = document.getElementById("partOne");
    let partTwo = document.getElementById("partTwo");
    partOne.hidden = true;
    partTwo.hidden = false;
}

function continueTwo() {
    let partTwo = document.getElementById("partTwo");
    let partThree = document.getElementById("partThree");
    partTwo.hidden = true;
    partThree.hidden = false;
}

function continueThree() {
    let partThree = document.getElementById("partThree");
    let partFour = document.getElementById("partFour");
    partThree.hidden = true;
    partFour.hidden = false;
}