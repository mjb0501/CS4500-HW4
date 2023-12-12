let table;
let tableData = [];
let tableHeight = 550;
let firstChart = true;
let columns;

function setTableData(expNum){
    let exampleTableRowData;
    if (experimentParameters.independentVar === 0) {
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
    let dep1 = experimentParameters.dependentVar[0];
    let dep2 = experimentParameters.dependentVar[1];
    if (experimentParameters.independentVar === 0) {
        for (let i = 0; i < experimentParameters.independentVarValues.length; i++) {
            if (experimentParameters.dependentVar.length === 1) {
                exampleTableRowData = {
                    "Ind Value (X & Y)": experimentParameters.independentVarValues[i],
                    [dep1]: "Some Value"
                };
            } else {
                exampleTableRowData = {
                    "Ind Value (X & Y)": experimentParameters.independentVarValues[i],
                    [dep1]: "Some Value",
                    [dep2]: "Some Value"
                };
            }
            tableData.push(exampleTableRowData);
        }
    } else if (experimentParameters.independentVar === 1) {
        for (let i = 0; i < experimentParameters.independentVarValues.length; i++) {
            if (experimentParameters.dependentVar.length === 1) {
                exampleTableRowData = {
                    "Ind Value (X)": experimentParameters.independentVarValues[i],
                    [dep1]: "Some Value"
                };
            } else {
                exampleTableRowData = {
                    "Ind Value (X)": experimentParameters.independentVarValues[i],
                    [dep1]: "Some Value",
                    [dep2]: "Some Value"
                };
            }
            tableData.push(exampleTableRowData);
        }
    } else {
        for (let i = 0; i < experimentParameters.independentVarValues.length; i++) {
            if (experimentParameters.dependentVar.length === 1) {
                exampleTableRowData = {
                    "Ind Value (Repetitions)": experimentParameters.independentVarValues[i],
                    [dep1]: "Some Value"
                };
            } else {
                exampleTableRowData = {
                    "Ind Value (Repetitions)": experimentParameters.independentVarValues[i],
                    [dep1]: "Some Value",
                    [dep2]: "Some Value"
                };
            }
            tableData.push(exampleTableRowData);
        }
    }
    // Extract column names from the keys of exampleTableRowData
    columns = Object.keys(exampleTableRowData).map(key => ({title: key, field: key, editor: "input"}));
}