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