let table;
let tableData = [];
let tableHeight = 550;
let tableWidth = 900;
const exampleTableRowData = {
    Dimension: "test",
    Repetitions: "test",
    TotalDrops: "test",
    Color1: "test",
    Color2: "test",
    Color3: "test",
    MaxDrops1Square: "test",
    AverageDrops: "test",
};


function setTableData(expNum){

    const exampleTableRowData = {
        Dimension: `(X: ${experimentParameters.xVal}, Y: ${experimentParameters.yVal})`,
        Repetitions: experimentParameters.independentVarValues[expNum],
        TotalDrops: allResults[expNum].totalDrops(),
        Color1: allResults[expNum].c0Drops,
        Color2: allResults[expNum].c1Drops,
        Color3: allResults[expNum].c2Drops,
        MaxDrops1Square: allResults[expNum].maxDrops1Square,
        AverageDrops: allResults[expNum].averageDrops,
    };
    tableData.push(exampleTableRowData);
}

function createTable() {
    // Extract column names from the keys of exampleTableRowData
    const columns = Object.keys(exampleTableRowData).map(key => ({ title: key, field: key, editor: "input" }));

    // Create a Tabulator table dynamically
    const overlayDiv = document.createElement("div");
    overlayDiv.id = "table-container";

    // set style center pf screen
    overlayDiv.style.position = "fixed";
    overlayDiv.style.top = "50%";
    overlayDiv.style.left = "50%";
    overlayDiv.style.transform = "translate(-50%, -50%)";
    overlayDiv.style.width = tableWidth + "px";
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
    hideButton.style.width = tableWidth + "px";
    hideButton.style.height = "40px"; // Adjusted the height as needed

    document.body.appendChild(hideButton);

    table = new Tabulator("#table-container", {
        columns: columns,
        layout: "fitColumns",
       // responsiveLayout:"hide",
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
    hideGraph();
}

function showAdditionalChart() {
    //this needs to show the chart with whatever dependent values were selected

    //for now, lets just call the final message
    document.getElementById("dependentValues").hidden = true;
    document.getElementById("finalMessage").hidden = false;
}

//, A1, A2, A3, B, and C

/*
A: the total number of paint drops put on the canvas before the stopping criterion stops the painting.
A1. The number of paint drops on the canvas of Color 1.
A2. The number of paint drops on the canvas of Color 2.
A3. The number of paint drops on the canvas of Color 3.
B: the maximum number of paint drops on any given square when the painting halts (that is, looking at all the squares,
what is the largest number of paint drops that fell on one square?)
C. the average number of paint drops over all the squares when the painting halts
 D, a single dimension that is used for square canvases. (When you pick a D, you are picking both X and Y)
 X, the x-dimension, with the y-dimension held constant.
 R, the number of repetitions in the experiment
 */
//define data
/*
* can add data to table with array with table.setData();
*
* var array{
*   Dimension: 3, A: "15", A1: "25", A2: "120",n A3: 1.8, B: "green", C: 20, Criterion: 100,Rep: 123,},
*   Dimension: 4, A: "12, A1: "24", A2: "10",n A3: 1, B: "BLUE", C: 20, Criterion: 100, Rep: 123,
*  ;}
* }
* */