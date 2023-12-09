let table;
let tableData = [];
let tableHeight = 450;
let tableWidth = 650;
const exampleTableRowData = {
    TotalDrops: "test",
    Color1: "test",
    Color2: "test",
    Color3: "test",
    MaxDrops1Square: "test",
    AverageDrops: "test",

};
function setTableData(){
    for (var i = 0; i < allResults.length; i++) {
        const exampleTableRowData = {

            TotalDrops: allResults[i].totalDrops(),
            Color1: allResults[i].c0Drops,
            Color2: allResults[i].c1Drops,
            Color3: allResults[i].c2Drops,
            MaxDrops1Square: allResults[i].maxDrops1Square,
            AverageDrops: allResults[i].averageDrops,
        };
        tableData.push(exampleTableRowData);
        console.log(tableData)
    }
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

    var hideButton = document.createElement("button");
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

function addRow() {
    // Add a row with the exampleTableRowData
   // table.addData([exampleTableRowData]);
    table.addRow(exampleTableRowData);
}

function closeTable(){
    let table = document.getElementById("table-container")
    let button = document.getElementById("closeTable")
   // let messageBox = document.getElementsByClassName("messageBox");

    messageBox.hodden = true;
    table.hidden = true;
    button.hidden = true;


    hideGraph();

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