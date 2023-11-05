const experimentParameters = {
    xVal:0,
    yVal:0,
    dVal:0,
    reps:0,
    c1:"0",
    c2:"0",
    c3:"0",
    stoppingCriteria:0,
    independentVar:"0",
    independentVarQuantity:0,
    dependentVar:"0",
    gridSize:function(){return this.x * this.y;}
};

const independentVarValues = [];

const results = {
    totalDrops:0,
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
            if (!square[i]) //insert proper call to tell if square has been colored.
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

function DrawGrid(x, y) {
    let theGrid = document.getElementById("theGrid");
    theGrid.innerHTML = "";
    var innerHTML = "";
    for(var i = 0; i < y; i++) {
        innerHTML += "<tr>";
        for(var j = 0; j < x; j++){
            innerHTML += "<td id=\"" + (j + 1) + "-" + (y - i) + "\"></td>";
        }
        innerHTML += "</tr>";
    }
    theGrid.innerHTML = innerHTML;
}

const allResults = [];
function PAINT_ONCE(x, y, c1, c2, c3, stoppingCriteriaChoice){
    DrawGrid(x, y);
    switch(stoppingCriteriaChoice) {
        case 0:
            while (!stoppingCriteria.isFull()) {
                let randomCoord = Math.floor(Math.random() * experimentParameters.gridSize());
                let color = Math.floor(Math.random() /*times however we quantify colors*/)
                // Insert logic that initiates paint animation
                grid[randomCoord].color++;
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