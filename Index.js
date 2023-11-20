function ShowMessage() {
    var initialButton = document.getElementById("initialButton");
    var welcomeMessage = document.getElementById("welcomeMessage");
    var placeholder = document.getElementById("placeholderIndex");
    initialButton.hidden = true;
    welcomeMessage.hidden = false;
    placeholder.style.height = "200px";
    return false;
}

function GoToGrid() {
    window.location.href = "./grid.html";
    return false;
}

function introAnimation() {
    let container = document.getElementById("animationStaging");
    let text = document.getElementById("animationText");
    let table = document.getElementById("animationTable");
    let list1 = document.getElementById("animationList1");
    let list2 = document.getElementById("animationList2");
    let list3 = document.getElementById("animationList3");
    let list4 = document.getElementById("animationList4");
    let xTable = document.getElementById("xDimensionTable");
    let yTable = document.getElementById("yDimensionTable");
    let colorTable = document.getElementById("colorTable");

    let frames = 0;

    let id = setInterval(animate, 2);

    function animate() {
        if (frames <= 50) {
            text.style.opacity = (frames/50);
            frames++;
        }
        if (frames > 50 && frames <= 100) {
            table.style.opacity = ((frames-50)/50);
            frames++;
        }
        if (frames > 100 && frames <= 120) {
            frames++
        }
        if (frames > 120 && frames <= 150) {
            text.innerHTML = "To make a picture you need to provide 4 things: ";
            table.hidden = true;
            frames++;
        }
        if (frames > 150 && frames <= 170) {
            list1.hidden = false;
            list1.style.opacity = ((frames-150)/20);
            frames++;
        }
        if (frames > 170 && frames <= 190) {
            list2.hidden = false;
            list2.style.opacity = ((frames-170)/20);
            frames++;
        }
        if (frames > 190 && frames <= 210) {
            list3.hidden = false;
            list3.style.opacity = ((frames-190)/20);
            frames++;
        }
        if (frames > 210 && frames <= 410) {
            list4.hidden = false;
            list4.style.opacity = ((frames-210)/20);
            frames++;
        }
        if (frames > 410 && frames <= 610) {
            list1.hidden = true;
            list2.hidden = true;
            list3.hidden = true;
            list4.hidden = true;
            text.innerHTML = "To select the X dimension enter a number.  For example if 3 is given the cavas will look like this:";
            xTable.hidden = false;
            xTable.style.opacity = ((frames-410)/100);
            frames++;
        }
        if (frames > 610 && frames <= 810) {
            xTable.hidden = true;
            text.innerHTML = "To select Y dimension give a number.  For example if 3 is given the canvas will look like this:";
            yTable.hidden = false;
            yTable.style.opacity = ((frames-610)/100);
            frames++;
        }
        if (frames > 810 && frames <= 1010) {
            yTable.hidden = true;
            text.innerHTML = "For colors choose a color from the dropdown menu. The colors will be colors that will paint the image.  For example if red, blue, and green are chosen your graph could look like this: ";
            colorTable.hidden = false;
            colorTable.style.opacity = ((frames-810)/100);
            frames++;
        }
        if (frames > 1010 && frames <= 1210) {
            colorTable.hidden = true;
            text.innerHTML = "For stopping criteria choose a criteria from the dropdown menu.  The criteria will determine when the website stops painting."
            frames++;
        }
        if (frames > 1210) {
            text.innerHTML = "That is all good luck painting!";
            frames++
        }
        if (frames > 1250) {
            clearInterval(id);
        }
    }
return false;
}