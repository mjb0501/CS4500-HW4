let table;
let tableData = [];
let tableHeight = 550;
let tableWidth = 950;
let firstChart = true;
let columns;

function setTableData(expNum){
    let exampleTableRowData;
    //console.log("in set table");
    if (experimentParameters.independentVar === 0) {
        //console.log(1.1);
        exampleTableRowData = {
            "Ind Value (X & Y)": allResults[expNum].indValue,
            "Repetitions": experimentParameters.reps,
            Color1: experimentParameters.colors[0],
            Color2: experimentParameters.colors[1],
            Color3: experimentParameters.colors[2],
            StoppingCriterion: experimentParameters.stoppingCriteria,
            TotalDrops: allResults[expNum].totalDrops(),
            TotalColor1: allResults[expNum].c0Drops,
            TotalColor2: allResults[expNum].c1Drops,
            TotalColor3: allResults[expNum].c2Drops,
            MaxDrops1Square: allResults[expNum].maxDrops1Square,
            AverageDrops: allResults[expNum].averageDrops,
        };
    } else if (experimentParameters.independentVar === 1) {
        //console.log(2.2)
        exampleTableRowData = {
            "Ind Value (X)": allResults[expNum].indValue,
            "Y Dimension": experimentParameters.yVal,
            "Repetitions": experimentParameters.reps,
            Color1: experimentParameters.colors[0],
            Color2: experimentParameters.colors[1],
            Color3: experimentParameters.colors[2],
            StoppingCriterion: experimentParameters.stoppingCriteria,
            TotalDrops: allResults[expNum].totalDrops(),
            TotalColor1: allResults[expNum].c0Drops,
            TotalColor2: allResults[expNum].c1Drops,
            TotalColor3: allResults[expNum].c2Drops,
            MaxDrops1Square: allResults[expNum].maxDrops1Square,
            AverageDrops: allResults[expNum].averageDrops,
        };
    } else {
        //console.log(3.3);
        exampleTableRowData = {
            "Ind Value (Repetitions)": allResults[expNum].indValue,
            "X Dimension": experimentParameters.xVal,
            "Y Dimension": experimentParameters.yVal,
            Color1: experimentParameters.colors[0],
            Color2: experimentParameters.colors[1],
            Color3: experimentParameters.colors[2],
            StoppingCriterion: experimentParameters.stoppingCriteria,
            TotalDrops: allResults[expNum].totalDrops(),
            TotalColor1: allResults[expNum].c0Drops,
            TotalColor2: allResults[expNum].c1Drops,
            TotalColor3: allResults[expNum].c2Drops,
            MaxDrops1Square: allResults[expNum].maxDrops1Square,
            AverageDrops: allResults[expNum].averageDrops,
        };
    }
    // Extract column names from the keys of exampleTableRowData
    columns = Object.keys(exampleTableRowData).map(key => ({ title: key, field: key, editor: "input" }));
    tableData.push(exampleTableRowData);
}

function createTable() {
    // Create a Tabulator table dynamically
    const overlayDiv = document.createElement("div");
    overlayDiv.id = "table-container";

    // set style center pf screen
    overlayDiv.style.position = "fixed";
    overlayDiv.style.top = "50%";
    overlayDiv.style.left = "50%";
    overlayDiv.style.transform = "translate(-50%, -50%)";
    overlayDiv.style.height = tableHeight + "px";
    overlayDiv.style.width = tableWidth + "px";
    document.body.appendChild(overlayDiv);

    // create button to continue, closes itself then opens graph
    let hideButton = document.createElement("button");
    hideButton.innerText = "Continue";
    hideButton.id = "closeTable";
    hideButton.onclick = closeTable;
    hideButton.style.position = "fixed";
    hideButton.style.top = "calc(50% + " + (tableHeight / 2 + 40) + "px)"; // Adjusted the top position to be below the first element
    hideButton.style.left = "50%";
    hideButton.style.transform = "translate(-50%, -50%)";
    hideButton.style.height = "40px"; // Adjusted the height as needed

    document.body.appendChild(hideButton);

    table = new Tabulator("#table-container", {
        columns: columns,
        layout: "fitColumns",
        autoColumns:true,
        height:tableHeight,
        data: tableData,
        editable: false,
        movableRows: false,
        selectable: false,
        responsiveLayout:"collapse",
    });
}

function closeTable(){
    document.getElementById("table-container").hidden = true;
    document.getElementById("closeTable").hidden = true;
    if (firstChart) {
        document.getElementById("dependentValues").hidden = false;
    } else {
        hideGraph();
    }
}

function showAdditionalChart() {
    //this needs to show the chart with whatever dependent values were selected
    document.getElementById("dependentValues").hidden = true;
    firstChart = false;
    CalculateDependentTable();
    createTable();
}

function CalculateDependentTable() {
    let exampleTableRowData;
    let AValueMin = 9999999999999, AValueMax = 0, AValueAvg = 0;
    let A1ValueMin= 9999999999999, A1ValueMax = 0, A1ValueAvg = 0;
    let A2ValueMin= 9999999999999, A2ValueMax = 0, A2ValueAvg = 0;
    let A3ValueMin= 9999999999999, A3ValueMax = 0, A3ValueAvg = 0;
    let BValueMin= 9999999999999, BValueMax = 0, BValueAvg = 0;
    let CValueMin= 9999999999999, CValueMax = 0, CValueAvg = 0;
    let dep1 = dependentValues[0];
    let dep2 = dependentValues[1];

    for (let i = 0; i < experimentParameters.independentVarValues.length; i++) {
        let counter = 0;
        for (let j = 0; j < allResults.length; j++) {
            if (allResults[j].indValue === experimentParameters.independentVarValues[i]) {
                counter++;
                //minimums
                AValueMin = allResults[i].totalDrops() < AValueMin ? allResults[i].totalDrops() : AValueMin;
                A1ValueMin = allResults[i].totalDrops() < A1ValueMin ? allResults[i].totalDrops() : A1ValueMin;
                A2ValueMin = allResults[i].totalDrops() < A2ValueMin ? allResults[i].totalDrops() : A2ValueMin;
                A3ValueMin = allResults[i].totalDrops() < A3ValueMin ? allResults[i].totalDrops() : A3ValueMin;
                BValueMin = allResults[i].totalDrops() < BValueMin ? allResults[i].totalDrops() : BValueMin;
                CValueMin = allResults[i].totalDrops() < CValueMin ? allResults[i].totalDrops() : CValueMin;

                //maximums
                AValueMax = allResults[i].maxDrops1Square > AValueMax ? allResults[i].maxDrops1Square : AValueMax;
                A1ValueMax = allResults[i].maxDrops1Square > A1ValueMax ? allResults[i].maxDrops1Square : A1ValueMax;
                A2ValueMax = allResults[i].maxDrops1Square > A2ValueMax ? allResults[i].maxDrops1Square : A2ValueMax;
                A3ValueMax = allResults[i].maxDrops1Square > A3ValueMax ? allResults[i].maxDrops1Square : A3ValueMax;
                BValueMax = allResults[i].maxDrops1Square > BValueMax ? allResults[i].maxDrops1Square : BValueMax;
                CValueMax = allResults[i].maxDrops1Square > CValueMax ? allResults[i].maxDrops1Square : CValueMax;

                //averages
                AValueAvg = AValueAvg + allResults[j].totalDrops();
                A1ValueAvg = A1ValueAvg + allResults[j].totalDrops();
                A2ValueAvg = A2ValueAvg + allResults[j].totalDrops();
                A3ValueAvg = A3ValueAvg + allResults[j].totalDrops();
                BValueAvg = BValueAvg + allResults[j].totalDrops();
                CValueAvg = CValueAvg + allResults[j].totalDrops();
            }
        }
        AValueAvg = AValueAvg / counter;
        A1ValueAvg = A1ValueAvg / counter;
        A2ValueAvg = A2ValueAvg / counter;
        A3ValueAvg = A3ValueAvg / counter;
        BValueAvg = BValueAvg / counter;
        CValueAvg = CValueAvg / counter;

        let newCalc = new dependentCalculation;
        newCalc.indType = experimentParameters.independentVar;
        newCalc.indValue = experimentParameters.independentVarValues[i];
        if (dep1 !== undefined) {
            switch (dep1) {
                case "AMax":
                    newCalc.dep1Type = "AMax";
                    newCalc.dep1Value = AValueMax;
                    break;
                case "AMin":
                    newCalc.dep1Type = "AMin";
                    newCalc.dep1Value = AValueMin;
                    break;
                case "AAvg":
                    newCalc.dep1Type = "AAvg";
                    newCalc.dep1Value = AValueAvg;
                    break;
                case "A1Max":
                    newCalc.dep1Type = "A1Max";
                    newCalc.dep1Value = A1ValueMax;
                    break;
                case "A1Min":
                    newCalc.dep1Type = "A1Min";
                    newCalc.dep1Value = A1ValueMin;
                    break;
                case "A1Avg":
                    newCalc.dep1Type = "A1Avg";
                    newCalc.dep1Value = A1ValueAvg;
                    break;
                case "A2Max":
                    newCalc.dep1Type = "A2Max";
                    newCalc.dep1Value = A2ValueMax;
                    break;
                case "A2Min":
                    newCalc.dep1Type = "A2Min";
                    newCalc.dep1Value = A2ValueMin;
                    break;
                case "A2Avg":
                    newCalc.dep1Type = "A2Avg";
                    newCalc.dep1Value = A2ValueAvg;
                    break;
                case "A3Max":
                    newCalc.dep1Type = "A3Max";
                    newCalc.dep1Value = A3ValueMax;
                    break;
                case "A3Min":
                    newCalc.dep1Type = "A3Min";
                    newCalc.dep1Value = A3ValueMin;
                    break;
                case "A3Avg":
                    newCalc.dep1Type = "A3Avg";
                    newCalc.dep1Value = A3ValueAvg;
                    break;
                case "BMax":
                    newCalc.dep1Type = "BMax";
                    newCalc.dep1Value = BValueMax;
                    break;
                case "BMin":
                    newCalc.dep1Type = "BMin";
                    newCalc.dep1Value = BValueMin;
                    break;
                case "BAvg":
                    newCalc.dep1Type = "BAvg";
                    newCalc.dep1Value = BValueAvg;
                    break;
                case "CMax":
                    newCalc.dep1Type = "CMax";
                    newCalc.dep1Value = CValueMax;
                    break;
                case "CMin":
                    newCalc.dep1Type = "CMin";
                    newCalc.dep1Value = CValueMin;
                    break;
                case "CAvg":
                    newCalc.dep1Type = "CAvg";
                    newCalc.dep1Value = CValueAvg;
                    break;
            }
        }
        if (dep2 !== undefined) {
            switch (dep2) {
                case "AMax":
                    newCalc.dep2Type = "AMax";
                    newCalc.dep2Value = AValueMax;
                    break;
                case "AMin":
                    newCalc.dep2Type = "AMin";
                    newCalc.dep2Value = AValueMin;
                    break;
                case "AAvg":
                    newCalc.dep2Type = "AAvg";
                    newCalc.dep2Value = AValueAvg;
                    break;
                case "A1Max":
                    newCalc.dep2Type = "A1Max";
                    newCalc.dep2Value = A1ValueMax;
                    break;
                case "A1Min":
                    newCalc.dep2Type = "A1Min";
                    newCalc.dep2Value = A1ValueMin;
                    break;
                case "A1Avg":
                    newCalc.dep2Type = "A1Avg";
                    newCalc.dep2Value = A1ValueAvg;
                    break;
                case "A2Max":
                    newCalc.dep2Type = "A2Max";
                    newCalc.dep2Value = A2ValueMax;
                    break;
                case "A2Min":
                    newCalc.dep2Type = "A2Min";
                    newCalc.dep2Value = A2ValueMin;
                    break;
                case "A2Avg":
                    newCalc.dep2Type = "A2Avg";
                    newCalc.dep2Value = A2ValueAvg;
                    break;
                case "A3Max":
                    newCalc.dep2Type = "A3Max";
                    newCalc.dep2Value = A3ValueMax;
                    break;
                case "A3Min":
                    newCalc.dep2Type = "A3Min";
                    newCalc.dep2Value = A3ValueMin;
                    break;
                case "A3Avg":
                    newCalc.dep2Type = "A3Avg";
                    newCalc.dep2Value = A3ValueAvg;
                    break;
                case "BMax":
                    newCalc.dep2Type = "BMax";
                    newCalc.dep2Value = BValueMax;
                    break;
                case "BMin":
                    newCalc.dep2Type = "BMin";
                    newCalc.dep2Value = BValueMin;
                    break;
                case "BAvg":
                    newCalc.dep2Type = "BAvg";
                    newCalc.dep2Value = BValueAvg;
                    break;
                case "CMax":
                    newCalc.dep2Type = "CMax";
                    newCalc.dep2Value = CValueMax;
                    break;
                case "CMin":
                    newCalc.dep2Type = "CMin";
                    newCalc.dep2Value = CValueMin;
                    break;
                case "CAvg":
                    newCalc.dep2Type = "CAvg";
                    newCalc.dep2Value = CValueAvg;
                    break;
            }
        }
        allDependentCalculations.push(newCalc);
    }

    if (experimentParameters.independentVar === 0) {
        for (let i = 0; i < allDependentCalculations.length; i++) {
            if (allDependentCalculations[i].dep2Type === null) {
                exampleTableRowData = {
                    "Ind Value (X & Y)": allDependentCalculations[i].indValue,
                    [dep1]: allDependentCalculations[i].dep1Value
                };
            } else {
                exampleTableRowData = {
                    "Ind Value (X & Y)": allDependentCalculations[i].indValue,
                    [dep1]: allDependentCalculations[i].dep1Value,
                    [dep2]: allDependentCalculations[i].dep2Value
                };
            }
            tableData.push(exampleTableRowData);
        }
    } else if (experimentParameters.independentVar === 1) {
        for (let i = 0; i < allDependentCalculations.length; i++) {
            if (allDependentCalculations[i].dep2Type === null) {
                exampleTableRowData = {
                    "Ind Value (X)": allDependentCalculations[i].indValue,
                    [dep1]: allDependentCalculations[i].dep1Value
                };
            } else {
                exampleTableRowData = {
                    "Ind Value (X)": allDependentCalculations[i].indValue,
                    [dep1]: allDependentCalculations[i].dep1Value,
                    [dep2]: allDependentCalculations[i].dep2Value
                };
            }
            tableData.push(exampleTableRowData);
        }
    } else {
        for (let i = 0; i < allDependentCalculations.length; i++) {
            if (allDependentCalculations[i].dep2Type === null) {
                exampleTableRowData = {
                    "Ind Value (Repetitions)": allDependentCalculations[i].indValue,
                    [dep1]: allDependentCalculations[i].dep1Value
                };
            } else {
                exampleTableRowData = {
                    "Ind Value (Repetitions)": allDependentCalculations[i].indValue,
                    [dep1]: allDependentCalculations[i].dep1Value,
                    [dep2]: allDependentCalculations[i].dep2Value
                };
            }
            tableData.push(exampleTableRowData);
        }
    }
    // Extract column names from the keys of exampleTableRowData
    columns = Object.keys(exampleTableRowData).map(key => ({title: key, field: key, editor: "input"}));
}