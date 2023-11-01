//on page load, lets do some tasks
window.addEventListener("load", (event) => {
    //hide the errorValidation box
    var inputError = document.getElementById("inputError");
    inputError.hidden = true;
    let theGrid = document.getElementById("theGrid");
    theGrid.hidden;

    //let's add the colors to the dropdowns
    var color1Dropdown = document.getElementById("colors1");
    var color2Dropdown = document.getElementById("colors2");
    var color3Dropdown = document.getElementById("colors3");
    var coloroptions = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "grey"];
    var colorvalues = ["FF0000", "FF7700", "FFED00", "00B500", "0047AB", "8024AB", "FF80D5", "808080"];

    for(var i = 0; i < coloroptions.length; i++) {
        var opt = coloroptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = colorvalues[i];
        color1Dropdown.appendChild(el);
    }
    for(i = 0; i < coloroptions.length; i++) {
        opt = coloroptions[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = colorvalues[i];
        color2Dropdown.appendChild(el);
    }
    for(i = 0; i < coloroptions.length; i++) {
        opt = coloroptions[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = colorvalues[i];
        color3Dropdown.appendChild(el);
    }

    //let's add the stopping criteria
    var stoppingCriteriaDropdown = document.getElementById("stoppingC");
    var stoppingOptions = ["Every square is full", "A single square was double dropped on"];

    for(i = 0; i < stoppingOptions.length; i++) {
        opt = stoppingOptions[i];
        el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        stoppingCriteriaDropdown.appendChild(el);
    }

    //do not let the form refresh the page, this is all done in JS
    var form = document.getElementById("inputFormIntro");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
});

function validateForm() {
    var inputError = document.getElementById("inputError");
    var color1Dropdown = document.getElementById("colors1");
    var color2Dropdown = document.getElementById("colors2");
    var color3Dropdown = document.getElementById("colors3");
    var stoppingCDropdown = document.getElementById("stoppingC");
    var xDimBox = document.getElementById("xDim");
    var yDimBox = document.getElementById("yDim");
    inputError.hidden = true;
    inputError.innerHTML = "";
    xDimBox.style.border = "";
    yDimBox.style.border = "";
    let returnVal = true;

    if (xDimBox.value > 100 || xDimBox.value < 1) {
        xDimBox.style.border ="3px solid red";
        inputError.innerHTML = "Your X dimension value must be between 1 and 100";
        returnVal = false;
    }
    if (yDimBox.value > 100 || yDimBox.value < 1) {
        yDimBox.style.border ="3px solid red";
        inputError.innerHTML += inputError.innerHTML !== "" ? "<br>Your Y dimension value must be between 1 and 100" : "Your Y dimension value must be between 1 and 100";
        returnVal = false;
    }

    if (!returnVal) {
        inputError.hidden = false;
    }

    if (returnVal) {
        //let's hide this box and make the grid front and center of everything
        let theInputBox = document.getElementById("inputBoxFirst");
        let mainGridDiv = document.getElementById("mainGrid");
        let theGrid = document.getElementById("theGrid");
        let oldGridHeading = document.getElementById("oldGridHeading");
        theGrid.hidden = false;
        theInputBox.hidden = true;
        oldGridHeading.hidden = true;
        mainGridDiv.className = "col-md-12";
        PAINT_ONCE(xDimBox.value, yDimBox.value, color1Dropdown.value, color2Dropdown.value, color3Dropdown.value, stoppingCDropdown.value);
    }
    return returnVal;
}