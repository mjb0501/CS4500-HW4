let table;
const exampleTableRowData = {
    Dimension: 3,
    A: "15",
    A1: "25",
    A2: "120",
    A3: 1.8,
    B: "green",
    C: 20,
    Criterion: 100,
    Rep: 123,
};

function createTable() {
    // Extract column names from the keys of exampleTableRowData
    const columns = Object.keys(exampleTableRowData).map(key => ({ title: key, field: key, editor: "input" }));

    // Create a Tabulator table dynamically
    const tableContainer = document.createElement("div");
    tableContainer.id = "table-container";
    tableContainer.style.width="500px";
    tableContainer.style.width="500px";
    document.body.appendChild(tableContainer);

    table = new Tabulator("#table-container", {
        columns: columns,
        layout: "fitColumns",
        responsiveLayout:"hide",
        autoColumns:true,
        height:"400px",


    });
}

function addRow() {
    // Add a row with the exampleTableRowData
   // table.addData([exampleTableRowData]);
    table.addRow(exampleTableRowData);
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