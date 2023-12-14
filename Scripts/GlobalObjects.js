const experimentParameters = {
    xVal:null,
    yVal:null,
    reps:null,
    stoppingCriteria:null,
    independentVar:null,
    independentVarValues:[],
    colors: [],
    gridSize:function(){return this.xVal * this.yVal;},
    colorTotalAllowedDrops:function(){return (this.xVal * this.yVal) * 2; }
};

const singleExperiment = {
    xVal: 0,
    yVal: 0,
    stoppingCriteria: 0,
    currIndValue: 0,
    gridSize: function() {return this.xVal * this.yVal;},
    colors: [],
    colorTotalAllowedDrops:function(){return (this.xVal * this.yVal) * 2; }
};

function Results() {
    this.indValue = 0;
    this.c0Drops = 0;
    this.c1Drops = 0;
    this.c2Drops = 0;
    this.maxDrops1Square = 0;
    this.averageDrops = 0;
    this.totalDrops = function (){
        return this.c0Drops + this.c1Drops + this.c2Drops
    };
}

function dependentCalculation() {
    this.indValue = null;
    this.dep1Type = null;
    this.dep1Value = 0;
    this.dep2Type = null;
    this.dep2Value = 0;
}
let dependentValues = [];
let allDependentCalculations = [];
let allResults = [];
let currentPercent = 0;