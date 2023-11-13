const experimentParameters = {
    dVal:0,
    reps:0,
    stoppingCriteria:0,
    independentVar:"0",
    independentVarQuantity:0,
    dependentVar:"0",
    gridSize:function(){return xDimBox.value * yDimBox.value;}
};


const independentVarValues = [];

const results = {
    totalDrops:function(){return this.c1Drops + this.c2Drops + this.c3Drops},
    c1Drops:0,
    c2Drops:0,
    c3Drops:0,
    maxDrops:0,
    averageDrops:0,
};

const stoppingCriteria = {
    //isFull should be sent as 0.
    isFull: function()
    {
        let isFull = true;
        for(let i = 0; i < experimentParameters.gridSize(); i++) {
            let currentCell = document.getElementById(((i+1).toString()));
            let currentColor = window.getComputedStyle(currentCell).getPropertyValue('background-color');
            //console.log(currentCell);
            //console.log(currentColor);
            if (currentColor === "rgb(255, 255, 255)") //insert proper call to tell if square has been colored.
                return isFull = false;
        }
        return isFull;
    },

    //isDoubleDropped should be sent as 1
    isDoubleDropped:function(){
        let isDoubleDropped = false;
        for(let i = 0; i < experimentParameters.gridSize(); i++) {
            if(square[i].drops > 1) //insert proper check for number of drops
                return isDoubleDropped = true;
        }
        return isDoubleDropped;
    },
}

// New and improved draw grid, using Sean's rewritten method and josh's ID
function DrawGrid(rows, columns) {
    var grid = document.getElementById("theGrid");
    for (var i = 0; i < rows; i++) {
        var row = grid.insertRow(i);

        for (var j = 0; j < columns; j++) {
            var cell = row.insertCell(j);
            cell.id = (i * columns + j + 1).toString(); // Assign a unique id to each cel
        }
    }
// test animation coloring
    //applyAnimationToCell(1, "red");
    //applyAnimationToCell(2, "blue");
    //applyAnimationToCell(7, "red");
    //applyAnimationToCell(50, "purple", 4);
    //setTimeout(function(){applyAnimationToCell(1, "blue");}, 2000);
}

function applyAnimationToCell(cellNumber, AnimationColor) {
    // Create a unique animation for each cell
    let animationName = "paintDrop-" + cellNumber;
    let styleSheet = document.styleSheets[0];

    // Apply the unique animation to the specific cell
    let cellID = cellNumber;
    let theCell = document.getElementById(cellID);
    console.log(cellNumber);
    let style = window.getComputedStyle(theCell);

    theCell.style.clipPath = 'circle(30%)';
    theCell.style.position = 'relative';
    let tempColor = style.getPropertyValue('background-color');
    theCell.style.backgroundColor = AnimationColor;
    let frames = 0;
    let id = setInterval(frame, 10);

    function frame() {
        if (frames <= 15) {
            if (frames == 15) {
                theCell.style.backgroundColor = "color-mix(in srgb, " + AnimationColor + ", " + tempColor + ")";
            }
            let location = -15 + frames;
            theCell.style.top = location.toString() + 'vh';
            frames++;
            //console.log(frames);
        }
        else if (frames > 15 && frames <= 85) {
            let circle = 15 + frames;
            theCell.style.clipPath = `circle(${circle}%)`;
            frames++;
            console.log(frames);
        }
        else {
            clearInterval(id);
        }
    }

/* Old Animation way using css instead of javascript
    theCell.style.position = `relative`;
    theCell.style.clipPath = `circle(30%)`;
    styleSheet.insertRule(`@keyframes ${animationName} {
                          0% { top: -100px; }
                          50% { top: 0; background-color: ${AnimationColor}; clip-path: circle(30%); }
                          100% { background-color: color-mix(in srgb, ${AnimationColor}, ${style.getPropertyValue('background-color')}); clip-path: circle(100%); }
                        }`, styleSheet.cssRules.length);
    theCell.style.animationFillMode = `forwards`;
    theCell.style.animation = `${animationName} 3s linear forwards`;
    //theCell.style.backgroundColor = `blue`;
    theCell.animationName = 'none';
    //theCell.style.animation = 'none';
    //theCell.offsetHeight;
    //theCell.style.animation = null;
    //theCell.style.backgroundColor = `blue`;//`color-mix(in srgb, ${AnimationColor}, ${style.getPropertyValue('background-color')}`;

*/
}

const allResults = [];
function PAINT_ONCE(colors){
    DrawGrid(xDimBox.value, yDimBox.value);
    experimentParameters.stoppingCriteria = parseInt(stoppingCDropdown.value);
    console.log(experimentParameters);
    switch(experimentParameters.stoppingCriteria) {
        case 0:
            while (!stoppingCriteria.isFull()) {
                let randomCoord = Math.floor(Math.random() * (experimentParameters.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random()*3);
                applyAnimationToCell(randomCoord, colors[color]);
                if(color === 0)
                    results.c1Drops++;
                if(color === 1)
                    results.c2Drops++;
                if(color === 2)
                    results.c3Drops++;
            }
            break;
        case 1:
            while (!stoppingCriteria.isDoubleDropped()){
                let randomCoord = Math.floor(Math.random() * experimentParameters.gridSize());
                let color = Math.floor(Math.random() /*times however we quantify colors*/)
                // Insert logic that initiates paint animation
                grid[randomCoord].color++;
            }
    }
}

function PAINT_MANY(x, y, c1, c2, c3, stoppingCriteria, reps){

}