
let graphCreated = false;
let graphHidden = true; // Set initial state to hidden

let graphHeight = 450;
let graphWidth = 650;


let keys = {};
let values = [];

function createGraphOverlay() {
    if (graphCreated === false) {
        // get table data.
        // Create a new overlay div element
        let overlayDiv = document.createElement("div");

        // Set attributes for the overlay div (id, styles, etc.)
        overlayDiv.id = "graphOverlay";
        overlayDiv.style.position = "fixed";
        overlayDiv.style.top = "50%";
        overlayDiv.style.left = "50%";
        overlayDiv.style.transform = "translate(-50%, -50%)";
        overlayDiv.style.width = graphWidth + "px";
        overlayDiv.style.height = graphHeight + "px";

        // Append the overlay div to the body of the document
        document.body.appendChild(overlayDiv);

        // Create a new canvas element for the graph
        let canvas = document.createElement("canvas");

        // Set attributes for the canvas (width, height, etc.)
        canvas.width = graphWidth;
        canvas.height = graphHeight;
        canvas.id = "graph";

        // Append the canvas to the overlay div
        overlayDiv.appendChild(canvas);

        // Get the 2D rendering context for the canvas
        let context = canvas.getContext("2d");

        // Now you can use the 'context' variable to draw on the canvas
        context.fillStyle = "lightblue";
        context.fillRect(10, 10, 380, 180);

        // Create a hide button within the overlay
        let hideButton = document.createElement("button");
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
        let labels = graphIndependentLoader();
        let myChart;

// Create the chart and store the instance in the variable

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, //set colors of graph to the ones the user selected


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
        graphDataLoader(myChart)
    } else return 0;
}

// Update hideGraph function to use the overlay container
function hideGraph() {
    //if first clicked, create graph, if not, move on
    if (!graphCreated) {
        createGraphOverlay();
    } else {
        document.getElementById("finalMessage").hidden = false;
    }

    // find the overlay element that contains the canvas for the graph
    hideButton = document.getElementById('graphHide')
    overlay = document.getElementById('graphOverlay')
    graph = document.getElementById('graph')

    // toggle visibility
    overlay.style.display = graphHidden ? "block" : "none";
    hideButton.innerText = graphHidden ? "Continue" : "Show Graph";
    graphHidden = !graphHidden;
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

function graphIndependentLoader(){
    let labels = [];
    let type= experimentParameters.independentVar;
    let labelString = "dimension"
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
    for(let i = 0; i < experimentParameters.independentVarValues.length; i++) {
        labels.push(labelString + experimentParameters.independentVarValues[i]);
    }
    return labels;
}


function graphDataLoader(chart) {
    if (allDependentCalculations[0].dep1Type !== null) {
        let dataSet1 = {
            label: [],
            //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
            data: [],
            backgroundColor: 'gray', // gray bars
            borderColor: 'white', // White outlines
            borderWidth: 2
        }
        dataSet1.label.push(allDependentCalculations[0].dep1Type);
        for (let j in allDependentCalculations) {
            dataSet1.data.push(allDependentCalculations[j].dep1Value);
        }
        chart.data.datasets.push(dataSet1);
    }

    if (allDependentCalculations[0].dep2Type !== null) {
        let dataSet2 = {
            label: [],
            //disabled until paint many is done   data: [allResults[0].c0Drops, 3, 2], // Use the extracted data
            data: [],
            backgroundColor: 'gray', // gray bars
            borderColor: 'white', // White outlines
            borderWidth: 2
        }
        dataSet2.label.push(allDependentCalculations[0].dep2Type);
        for (let j in allDependentCalculations) {
            dataSet2.data.push(allDependentCalculations[j].dep2Value);
        }
        dataSet2.backgroundColor = "darkgray";
        chart.data.datasets.push(dataSet2);
    }

    chart.update();
}