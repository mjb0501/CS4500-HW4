

function PAINT_ONCE() {
    let callTime = 500;
    let speed = 1.0;
    let speedButton = document.getElementById("speedUp");
    let slowButton = document.getElementById("slowDown");
    let currentSpeed = document.getElementById("speed");
    let speedButtons = document.getElementById("speedButtons");
    speedButtons.hidden = false;

    function speedUp() {
        slowButton.disabled = false;
        slowButton.innerHTML = "Slow Down";
        speed += 0.2;
        callTime -= 50;
        currentSpeed.innerHTML = speed.toPrecision(2) + "x";
        if (speed >= 3.0) {
            speedButton.disabled = true;
            speedButton.innerHTML = "Max";
        }
    }

    function slowDown() {
        speedButton.disabled = false;
        speedButton.innerHTML = "Speed Up";
        speed -= 0.2;
        callTime += 50;
        currentSpeed.innerHTML = speed.toPrecision(2) + "x";
        if (speed <= 0.3) {
            slowButton.disabled = true;
            slowButton.innerHTML = "Max";
        }
    }

    PAINT_ONCE.speedUp = speedUp;
    PAINT_ONCE.slowDown = slowDown;

    DrawGrid(singleExperiment.yVal, singleExperiment.xVal);
    //build an array of grid size, fill it with the number 0 all the way through
    let dropTracker = new Array(singleExperiment.gridSize()).fill(0);
    let totalDrops = 0; //tracks drops in switch case 2

    switch (singleExperiment.stoppingCriteria) {
        case 0:
        function paintLoopCriteria0() {
            setTimeout(function () {
                let randomCoord = Math.floor(Math.random() * (singleExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                applyAnimationToCell(randomCoord, singleExperiment.colors[color]);
                dropTracker[randomCoord - 1]++;
                if (!stoppingCriteria.isFull(singleExperiment.gridSize())) {
                    paintLoopCriteria0();
                } else {
                    setupNextExperiment("All squares have been dripped on!");
                }
            }, callTime)
        }
            paintLoopCriteria0(); //run at least once, it will stay in loop as needed
            break;
        case 1:
            let isDoubleDripped = false;
        function paintLoopCriteria1() {
            setTimeout(function () {
                let randomCoord = Math.floor(Math.random() * (singleExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                applyAnimationToCell(randomCoord, singleExperiment.colors[color]);
                dropTracker[randomCoord - 1]++; // let's add the drop now before checking for double drips
                for (let i = 0; i < dropTracker.length; i++) {
                    if (dropTracker[i - 1] === 2) {
                        isDoubleDripped = true;
                        break;
                    }
                }
                if (!isDoubleDripped) {
                    paintLoopCriteria1();
                } else {
                    setupNextExperiment("A square has been double dripped on!");
                }
            }, 300)
        }
            paintLoopCriteria1(); //run at least once, it will stay in loop as needed
            break;
        case 2:
        function paintLoopCriteria2() {
            setTimeout(function () {
                let randomCoord = Math.floor(Math.random() * (singleExperiment.gridSize() + 1)); //need the +1 to hit max size
                randomCoord = randomCoord === 0 ? 1 : randomCoord; //don't allow for 0, there is no cell 0
                let color = Math.floor(Math.random() * 3);
                applyAnimationToCell(randomCoord, singleExperiment.colors[color]);
                totalDrops++;
                if (totalDrops < singleExperiment.colorTotalAllowedDrops()) {
                    paintLoopCriteria2();
                } else {
                    setupNextExperiment(singleExperiment.colorTotalAllowedDrops() + " drops have been painted!");
                }
            }, callTime)
        }
            paintLoopCriteria2(); //run at least once, it will stay in loop as needed
            break;
    }
}