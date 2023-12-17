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
    let submit = document.getElementById("submit");
    let increment = document.getElementById("increment");
    let decrement = document.getElementById("decrement");
    let page = 1;

    let frames = 0;

    let id = setInterval(animate, 2);

    function incrementPage() {
        page++;
        clearInterval(id);
        frames = 0;
        id = setInterval(animate, 2);
    }

    function decrementPage() {
        page--;
        clearInterval(id);
        frames = 0;
        id = setInterval(animate, 2);
    }

    introAnimation.incrementPage = incrementPage;
    introAnimation.decrementPage = decrementPage;
    function animate() {
        if (frames <= 50 && page == 1) {
            decrement.hidden = true;
            text.innerHTML = "This website paints grid-based images like so: ";
            table.style.opacity = 0;
            table.hidden = false;
            list1.hidden = true;
            list1.style.opacity = 0;
            list2.hidden = true;
            list2.style.opacity = 0;
            list3.hidden = true;
            list3.style.opacity = 0;
            list4.hidden = true;
            list4.style.opacity = 0;
            text.style.opacity = 0;
            text.style.opacity = (frames/50);
            frames++;
        }
        if (frames > 50 && frames <= 100 && page == 1) {
            table.style.opacity = ((frames-50)/50);
            frames++;
        }
        if (frames > 100 && frames <= 120 && page == 1) {
            frames++
        }
        if (frames <= 20 && page == 2) {
            decrement.hidden = false;
            xTable.hidden = true;
            xTable.style.opacity = 0;
            text.style.opacity = 1;
            text.innerHTML = "To make a picture, you need to provide 4 things: ";
            table.hidden = true;
            frames++;
        }
        if (frames > 20 && frames <= 40 && page == 2) {
            list1.hidden = false;
            list1.style.opacity = ((frames-20)/20);
            frames++;
        }
        if (frames > 40 && frames <= 60 && page == 2) {
            list2.hidden = false;
            list2.style.opacity = ((frames-40)/20);
            frames++;
        }
        if (frames > 60 && frames <= 80 && page == 2) {
            list3.hidden = false;
            list3.style.opacity = ((frames-60)/20);
            frames++;
        }
        if (frames > 80 && frames <= 100 && page == 2) {
            list4.hidden = false;
            list4.style.opacity = ((frames-80)/20);
            frames++;
        }
        if (frames <= 100 && page == 3) {
            yTable.hidden = true;
            yTable.style.opacity = 0;
            list1.hidden = true;
            list2.hidden = true;
            list3.hidden = true;
            list4.hidden = true;
            text.innerHTML = "First, enter a number for the X dimension.  For example, if 3 is given, the canvas will look like this:";
            xTable.hidden = false;
            xTable.style.opacity = (frames/100);
            frames++;
        }
        if (frames <= 100 && page == 4) {
            colorTable.hidden = true;
            colorTable.style.opacity = 0;
            xTable.hidden = true;
            text.innerHTML = "Second, enter a number for the Y dimension.  For example, if 3 is given, the canvas will look like this:";
            yTable.hidden = false;
            yTable.style.opacity = (frames/100);
            frames++;
        }
        if (frames <= 100 && page == 5) {
            yTable.hidden = true;
            text.innerHTML = "For colors, choose from the dropdown menus. Your selection will be the colors that paint the grid cells.  For example, if red, blue, and green are chosen, your graph could look like this: ";
            colorTable.hidden = false;
            colorTable.style.opacity = (frames/100);
            frames++;
        }
        if (frames <= 100 && page == 6) {
            increment.hidden = false;
            submit.hidden = true;
            colorTable.hidden = true;
            text.innerHTML = "For stopping criteria, choose from the dropdown menu.  The criteria will determine when the colors stop painting the grid."
            frames++;
        }
        if (page == 7) {
            increment.hidden = true;
            text.innerHTML = "That is all. Good luck painting!";
            submit.hidden = false;
            frames++
        }
    }
return false;
}
