
var graphCreated = false;
function createGraph(){
    if (graphCreated==false) {
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

        const ctx = document.getElementById('graph');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Colors',
                    data: [12, 19, 3, 5, 2, 3],
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

var graphHidden = false;
function hideGraph()
{
    // find the div element that contains the canvas for the graph
    graph = document.getElementById('graphContainer')
    hideButton = document.getElementById('graphHide')
    // hide it
    if(graphCreated && graphHidden ==false) {
        graph.style.display = "none"
        hideButton.innerText ="Show Graph"
        graphHidden = true;
    }
    // unhide it
    else if(graphCreated && graphHidden == true){
        graph.style.display = "block"
        hideButton.innerText ="Hide Graph"
        graphHidden = false;
    }

}