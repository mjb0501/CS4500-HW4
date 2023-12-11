const experimentParameters = {
    dVal:null,
    xVal:null,
    yVal:null,
    reps:null,
    stoppingCriteria:null,
    independentVar:null,
    independentVarValues:[],
    dependentVar:[],
    colors: [],
    gridSize:function(){return this.xVal * this.yVal;},
    colorTotalAllowedDrops:function(){return (this.xVal * this.yVal) * 2; }
};

const singleExperiment = {
    xVal: 0,
    yVal: 0,
    stoppingCriteria: 0,
    gridSize: function() {return this.xVal * this.yVal;},
    colors: [],
    colorTotalAllowedDrops:function(){return (this.xVal * this.yVal) * 2; }
};

function Results() {
    this.c0Drops = 0;
    this.c1Drops = 0;
    this.c2Drops = 0;
    this.maxDrops1Square = 0;
    this.averageDrops = 0;
    this.totalDrops = function (){
        return this.c0Drops + this.c1Drops + this.c2Drops
    };
}

let allResults = [];
let currentPercent = 0;