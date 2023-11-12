//global elements
let color1Dropdown, color2Dropdown, color3Dropdown, stoppingCDropdown;
let theGrid, mainGridDiv, oldGridHeading, form;
let inputError, theInputBox;
let yDimBox, xDimBox, placeholderBox;
const colorOptions = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "grey"];
const colorValues = ["FF0000", "FF7700", "FFED00", "00B500", "0047AB", "8024AB", "FF80D5", "808080"];
const colors = [];

//sets all the global elements
function getGlobalElements() {
    color1Dropdown = document.getElementById("colors1");
    color2Dropdown = document.getElementById("colors2");
    color3Dropdown = document.getElementById("colors3");
    inputError = document.getElementById("inputError");
    stoppingCDropdown = document.getElementById("stoppingC");
    xDimBox = document.getElementById("xDim");
    yDimBox = document.getElementById("yDim");
    theInputBox = document.getElementById("inputBoxFirst");
    mainGridDiv = document.getElementById("mainGrid");
    oldGridHeading = document.getElementById("oldGridHeading");
    placeholderBox = document.getElementById("placeholder");
    form = document.getElementById("inputFormIntro");
    colors[0] = color1Dropdown;
    colors[1] = color2Dropdown;
    colors[2] = color3Dropdown;

    console.log(colors);
}

//populates the color dropdown
function populateColorDropdown(dropdown) {
    for (let i = 0; i < colorOptions.length; i++) {
        const opt = colorOptions[i];
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = colorValues[i];
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
    populateColorDropdown(color2Dropdown);
    populateColorDropdown(color3Dropdown);

    //let's add the stopping criteria
    var stoppingOptions = ["Every square is full", "A single square was double dropped on"];

    for(i = 0; i < stoppingOptions.length; i++) {
        opt = stoppingOptions[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        stoppingCDropdown.appendChild(el);
    }

    //do not let the form refresh the page, this is all done in JS
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
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
        inputError.innerHTML += inputError.innerHTML !== "" ? "<br>Your Y dimension value must be between 1 and 100" : "Your Y dimension value must be between 1 and 50";
        returnVal = false;
    }

    if (!returnVal) {
        inputError.hidden = false;
    } else {
        //let's hide this box and make the grid front and center of everything
        placeholderBox.style.height = "100px";
        theGrid.hidden = false;
        theInputBox.hidden = true;
        oldGridHeading.hidden = true;
        mainGridDiv.className = "col-md-12";
        PAINT_ONCE(experimentParameters.xVal, experimentParameters.yVal, colors, experimentParameters.stoppingCriteria);
    }
    return returnVal;
}