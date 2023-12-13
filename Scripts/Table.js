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
    let AValue = 0, A1Value= 0, A2Value= 0, A3Value= 0, BValue= 0, CValue= 0;
    let dep1 = dependentValues[0];
    let dep2 = dependentValues[1];

    for (let i = 0; i < experimentParameters.independentVarValues.length; i++) {
        let counter = 0;
        for (let j = 0; j < allResults.length; j++) {
            if (allResults[j].indValue === experimentParameters.independentVarValues[i]) {
                AValue = AValue + allResults[j].totalDrops();
                A1Value = A1Value + allResults[j].c0Drops;
                A2Value = A2Value + allResults[j].c1Drops;
                A3Value = A3Value + allResults[j].c2Drops;
                BValue = allResults[j].maxDrops1Square > BValue ? allResults[j].maxDrops1Square : BValue;
                counter++;
                CValue = CValue + allResults[j].totalDrops();
            }
        }
        CValue = CValue / counter;
        let newCalc = new dependentCalculation;
        newCalc.indType = experimentParameters.independentVar;
        newCalc.indValue = experimentParameters.independentVarValues[i];
        if (dep1 !== undefined) {
            switch (dep1) {
                case "A":
                    newCalc.dep1Type = "A";
                    newCalc.dep1Value = AValue;
                    break;
                case "A1":
                    newCalc.dep1Type = "A1";
                    newCalc.dep1Value = A1Value;
                    break;
                case "A2":
                    newCalc.dep1Type = "A2";
                    newCalc.dep1Value = A2Value;
                    break;
                case "A3":
                    newCalc.dep1Type = "A3";
                    newCalc.dep1Value = A3Value;
                    break;
                case "B":
                    newCalc.dep1Type = "B";
                    newCalc.dep1Value = BValue;
                    break;
                case "C":
                    newCalc.dep1Type = "C";
                    newCalc.dep1Value = CValue;
                    break;
            }
        }
        if (dep2 !== undefined) {
            switch (dep2) {
                case "A":
                    newCalc.dep2Type = "A";
                    newCalc.dep2Value = AValue;
                    break;
                case "A1":
                    newCalc.dep2Type = "A1";
                    newCalc.dep2Value = A1Value;
                    break;
                case "A2":
                    newCalc.dep2Type = "A2";
                    newCalc.dep2Value = A2Value;
                    break;
                case "A3":
                    newCalc.dep2Type = "A3";
                    newCalc.dep2Value = A3Value;
                    break;
                case "B":
                    newCalc.dep2Type = "B";
                    newCalc.dep2Value = BValue;
                    break;
                case "C":
                    newCalc.dep2Type = "C";
                    newCalc.dep2Value = CValue;
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