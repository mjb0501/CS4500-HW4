
let graphCreated = false;
function createGraph(){
    if (graphCreated === false) {
        // Create a new container div element
        var containerDiv = document.createElement("div");

        // Set attributes for the container div (id, styles, etc.)
        containerDiv.id = "graphContainer";
        containerDiv.style.width = "400px";
        containerDiv.style.height = "200px";
        containerDiv.style.border = "1px solid black";

        // Append the container div to the body of the document
        document.body.appendChild(containerDiv);

        // Create a new canvas element
        var canvas = document.createElement("canvas");

        // Set attributes for the canvas (width, height, etc.)
        canvas.width = 400;
        canvas.height = 200;
        canvas.id = "graph";

        // Append the canvas to the container div
        containerDiv.appendChild(canvas);

        // Get the 2D rendering context for the canvas
        var context = canvas.getContext("2d");

        // Now you can use the 'context' variable to draw on the canvas
        context.fillStyle = "lightblue";
        context.fillRect(10, 10, 380, 180);

        // get the grid
        const theGrid = document.getElementById('theGrid');

        let colorCounts = getGridColors(singleExperiment.gridSize());

        // Extracting labels and data from colorCounts
        let labels = Object.keys(colorCounts);
        let data = Object.values(colorCounts);

        // Log colors and counts
        for (let i = 0; i < labels.length; i++) {
            console.log(`Color: ${labels[i]}, Count: ${data[i]}`);
        }

        const ctx = document.getElementById('graph');new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, // Use the extracted labels
                datasets: [{
                    label: '# of Colors',
                    data: data, // Use the extracted data
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        graphCreated = true;
    }
    else return 0;
}

let graphHidden = true;

function hideGraph()
{
    //if it's not been created and they want to see it, lets create it now
    if (!graphCreated) {
        createGraph();
    }

    // find the div element that contains the canvas for the graph
    hideButton = document.getElementById('graphHide')
    graph = document.getElementById('graphContainer')

    // hide it
    if(graphHidden === false) {
        graph.style.display = "none"
        hideButton.innerText ="Show Graph"
        graphHidden = true;
    }
    // unhide it
    else if (graphHidden === true){
        graph.style.display = "block"
        hideButton.innerText ="Hide Graph"
        graphHidden = false;
    }

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




