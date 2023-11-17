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
        if (frames > 210 && frames <= 230) {
            list4.hidden = false;
            list4.style.opacity = ((frames-210)/20);
            frames++;
        }
        if (frames > 500) {
            clearInterval(id);
        }

    }
return false;
}