//global elements
let color1Dropdown, color2Dropdown, color3Dropdown, stoppingCDropdown;
let theGrid, mainGridDiv, oldGridHeading, form;
let inputError, theInputBox;
let yDimBox, xDimBox, placeholderBox;
const colorOptions = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "grey"];
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
    placeholderBox = document.getElementById("placeholderGrid");
    form = document.getElementById("inputFormIntro");
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
        //populate the color options chosen
        colors.push(color1Dropdown.value);
        colors.push(color2Dropdown.value);
        colors.push(color3Dropdown.value);
        //let's hide this box and make the grid front and center of everything
        placeholderBox.hidden = true;
        theGrid.hidden = false;
        theInputBox.hidden = true;
        mainGridDiv.className = "col-md-12";
        PAINT_ONCE(colors);
    }
    return returnVal;
}