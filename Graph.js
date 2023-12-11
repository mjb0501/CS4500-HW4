
let graphCreated = false;
let graphHidden = true; // Set initial state to hidden

let graphHeight = 450;
let graphWidth = 650;



function createGraphOverlay() {
    if (graphCreated === false) {
        // Create a new overlay div element
        var overlayDiv = document.createElement("div");

        // Set attributes for the overlay div (id, styles, etc.)
        overlayDiv.id = "graphOverlay";
        overlayDiv.style.position = "fixed";
        overlayDiv.style.top = "50%";
        overlayDiv.style.left = "50%";
        overlayDiv.style.transform = "translate(-50%, -50%)";
        overlayDiv.style.width = graphWidth + "px";
        overlayDiv.style.height = graphHeight + "px";
       // overlayDiv.style.backgroundColor = "black";
        //overlayDiv.style.border = "1px solid white";



        // Append the overlay div to the body of the document
        document.body.appendChild(overlayDiv);

        // Create a new canvas element for the graph
        var canvas = document.createElement("canvas");

        // Set attributes for the canvas (width, height, etc.)
        canvas.width = graphWidth;
        canvas.height = graphHeight;
        canvas.id = "graph";


        // Append the canvas to the overlay div
        overlayDiv.appendChild(canvas);

        // Get the 2D rendering context for the canvas
        var context = canvas.getContext("2d");

        // Now you can use the 'context' variable to draw on the canvas
        context.fillStyle = "lightblue";
        context.fillRect(10, 10, 380, 180);

        // Create a hide button within the overlay
        var hideButton = document.createElement("button");
        hideButton.innerText = "Continue";
        hideButton.id = "graphHide";
        hideButton.onclick = hideGraph;
        // Center the button below the graph container
        hideButton.style.display = "block";
        hideButton.style.margin = "auto";

        // Append the button to the overlay div
        overlayDiv.appendChild(hideButton);

        // Set initial visibility based on graphHidden
        overlayDiv.style.display = graphHidden ? "none" : "block";

        // get the grid
        const theGrid = document.getElementById('theGrid');
/*
// old code to get colors from the grid
        let colorCounts = getGridColors(singleExperiment.gridSize());

        // Extracting labels and data from colorCounts
        let labels = Object.keys(colorCounts);
        let data = Object.values(colorCounts);

        // Log colors and counts
        for (let i = 0; i < labels.length; i++) {
            console.log(`Color: ${labels[i]}, Count: ${data[i]}`);
        }
*/
        const ctx = document.getElementById('graph');
        var labels = graphIndependentLoader();

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, //set colors of graph to the ones the user selected
                datasets: [{
                    label: "Total Drops",
                 //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
                    data: graphDataLoader(0),
                    backgroundColor: 'gray', // gray bars
                    borderColor: 'white', // White outlines
                    borderWidth: 2
                }, {
                    label: "Color 1",
                    //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
                    data: graphDataLoader(1),
                    backgroundColor: experimentParameters.colors[0], // gray bars
                    borderColor: 'white', // White outlines
                    borderWidth: 2
                },{
                    label: "Color 2",
                    //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
                    data: graphDataLoader(2),
                    backgroundColor: experimentParameters.colors[1], // gray bars
                    borderColor: 'white', // White outlines
                    borderWidth: 2
                },{
                    label: "color 3",
                    //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
                    data: graphDataLoader(3),
                    backgroundColor: experimentParameters.colors[2], // gray bars
                    borderColor: 'white', // White outlines
                    borderWidth: 2
                },
                    {
                        label: "Max 1 Square",
                        //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
                        data: graphDataLoader(4),
                        backgroundColor: 'yellow', // gray bars
                        borderColor: 'white', // White outlines
                        borderWidth: 2
                    },
                    {
                        label: "Average Drops",
                        //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
                        data: graphDataLoader(5),
                        backgroundColor: 'orange', // gray bars
                        borderColor: 'white', // White outlines
                        borderWidth: 2
                    },
                ]

            },
            options: {
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // White grid lines with 10% transparency
                        },
                        ticks: {
                            font: {
                                color: '#ffffff', // White x-axis label text
                            },
                        },
                    },
                    y: {
                        min: 0, // Set the minimum value for the Y-axis
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '# of Drops'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // White grid lines with 10% transparency
                        },
                        ticks: {
                            font: {
                                color: '#ffffff', // White y-axis label text
                            },
                        },
                    },
                },
                legend: {
                    labels: {
                        fontColor: '#ffffff', // White legend text
                    }
                },
                tooltips: {
                    enabled: true,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White tooltip background with 80% transparency
                    titleFontColor: 'black', // Black tooltip title text
                    bodyFontColor: 'black', // Black tooltip body text
                },
            }
        });
        overlayDiv.style.display = graphHidden ? "none" : "block"
        graphCreated = true;
    } else return 0;
}

// Update hideGraph function to use the overlay container
function hideGraph() {
    // if it's not been created and they want to see it, let's create it now
    if (!graphCreated) {
        createGraphOverlay();
    } else {
        document.getElementById("dependentValues").hidden = false;
    }

    // find the overlay element that contains the canvas for the graph
    hideButton = document.getElementById('graphHide')
    overlay = document.getElementById('graphOverlay')
    graph = document.getElementById('graph')
/*
    delete graph;
    delete overlay;
    delete hideButton;
*/

    // toggle visibility
    overlay.style.display = graphHidden ? "block" : "none";
    hideButton.innerText = graphHidden ? "Continue" : "Show Graph";
    graphHidden = !graphHidden;
/*
//bugged dont enable
    // Manually trigger rendering of the chart after changing visibility
    if (myChart) {
        myChart.update();
    }

 */
}

function getGridColors(gridSize) {

    // Create an object to store color counts
    let colorCounts = {};

    for (var i = 1; i <= gridSize; i++) {
        var cell = document.getElementById(i);

        // Get the background color of the cell in RGB format
        var rgbColor = getComputedStyle(cell).backgroundColor;

        // Convert the RGB color to a string
        var colorString = rgbColor.toString();

        // Check if the color string is already in the object
        if (colorCounts[colorString]) {
            // Increment the count if the color string is already present
            colorCounts[colorString]++;
        } else {
            // Add the color string to the object with a count of 1 if it's not present
            colorCounts[colorString] = 1;
        }
    }

    // Return the colorCounts object
    return colorCounts;
}



function getTableData(){
    let builtTableData = table.getData();
    return tableData;
}

function graphIndependentLoader(){
    var labels = [];
    var type= experimentParameters.independentVar;
    var labelString = "dimension"
    switch (type){
        case 0:
            labelString = "X and Y: "
            break;
        case 1:
            labelString = "X: "
            break;
        case 2:
            labelString = "Repetitions: "
            break;
    }
    for(var i = 0; i < experimentParameters.independentVarValues.length; i++) {

        labels.push(labelString + experimentParameters.independentVarValues[i]);
    }
    return labels;
}


function graphDataLoader(dataSet){
    var data = [];

    for (var i = 0; i < tableData.length;i++)
    {
        switch (dataSet){
            case 0:
                data.push(tableData[i].TotalDrops)
                break;
            case 1:
                data.push(tableData[i].Color1)
                break;
            case 2:
                data.push(tableData[i].Color2)
                break;
            case 3:
                data.push(tableData[i].Color3)
                break;
            case 4:
                data.push(tableData[i].MaxDrops1Square)
                break;
            case 5:
                data.push(tableData[i].AverageDrops)
                break;
        }
    }
    return data;
}

