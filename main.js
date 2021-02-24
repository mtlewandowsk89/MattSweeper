const flagImage = 'url("icecream-vector-simple-15.png")';
const mineImage = 'url("./try_harder.png")';
let firstClick = true;
let mattLocations = [];
let squaresChecked = [];
let startingMatts;
let mattsRemaining;
let leftEdge;
let rightEdge;
let topLeftCorner;
let topRightCorner;
let bottomLeftCorner;
let bottomRightCorner;
let edgeIntervals;
let surroundingTileCheck;
let lastSquare;

// cancel default right click menu
window.oncontextmenu = () => {return false;}

// load beginner difficulty after DOM has had a chance to load.
setTimeout(difficultyChange = () => {
    let difficulty = document.getElementById('difficulty').value;

    const gridArea = document.getElementById('gridArea');
    while (gridArea.hasChildNodes()) {
        gridArea.removeChild(gridArea.firstChild);
    }

    switch(difficulty) {
        case 'beginner':
            startingMatts = 10;
            mattsRemaining = 10;
            leftEdge = [10, 19, 28, 37, 46, 55, 64];
            rightEdge = [18, 27, 36, 45, 54, 63, 72];
            topLeftCorner = [2, 10, 11];
            topRightCorner = [8, 17, 18];
            bottomLeftCorner = [64, 65, 74];
            bottomRightCorner = [71, 72, 80];
            edgeIntervals = [1, 8, 9, 10];
            surroundingTileCheck = [1, 9, 73, 81];
            lastSquare = 81;
            gridArea.classList.add('beginnerGrid');
            gridArea.classList.remove('expertGrid');
            gridArea.classList.remove('intermediateGrid');
            gridArea.classList.remove('masterGrid');
            break;
        case 'intermediate':
            startingMatts = 40;
            mattsRemaining = 40;
            leftEdge = [17, 33, 49, 65, 81, 97, 113, 129, 145, 161, 177, 193, 209, 225];
            rightEdge = [32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240];
            topLeftCorner = [2, 17, 18];
            topRightCorner = [15, 31, 32];
            bottomLeftCorner = [225, 226, 242];
            bottomRightCorner = [239, 240, 255];
            edgeIntervals = [1, 15, 16, 17];
            surroundingTileCheck = [1, 16, 241, 256];
            lastSquare = 256;
            gridArea.classList.add('intermediateGrid');
            gridArea.classList.remove('expertGrid');
            gridArea.classList.remove('beginnerGrid');
            gridArea.classList.remove('masterGrid');
            break;
        case 'expert':
            startingMatts = 99;
            mattsRemaining = 99;
            leftEdge = [31, 61, 91, 121, 151, 181, 211, 241, 271, 301, 331, 361, 391, 421];
            rightEdge = [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450];
            topLeftCorner = [2, 31, 32];
            topRightCorner = [29, 59, 60];
            bottomLeftCorner = [421, 422, 452];
            bottomRightCorner = [449, 450, 479];
            edgeIntervals = [1, 29, 30, 31];
            surroundingTileCheck = [1, 30, 451, 480];
            lastSquare = 480;
            gridArea.classList.add('expertGrid');
            gridArea.classList.remove('beginnerGrid');
            gridArea.classList.remove('intermediateGrid');
            gridArea.classList.remove('masterGrid');
            break;
        case 'master':
            startingMatts = 200;
            mattsRemaining = 200;
            leftEdge = [31, 61, 91, 121, 151, 181, 211, 241, 271, 301, 331, 361, 391, 421, 451, 481, 511, 541, 571, 601, 631, 661];
            rightEdge = [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600, 630, 660, 690];
            topLeftCorner = [2, 31, 32];
            topRightCorner = [29, 59, 60];
            bottomLeftCorner = [661, 662, 692];
            bottomRightCorner = [689, 690, 719];
            edgeIntervals = [1, 29, 30, 31];
            surroundingTileCheck = [1, 30, 691, 720];
            lastSquare = 720;
            gridArea.classList.add('masterGrid');
            gridArea.classList.remove('expertGrid');
            gridArea.classList.remove('beginnerGrid');
            gridArea.classList.remove('intermediateGrid');
            break;
    }

    reset(true);
    setup();
}, 0);

setup = () => {
    updateMattCount();
    const gridArea = document.getElementById('gridArea');
    // Create game grid
    for (i = 1; i <= lastSquare; i++) {
        // Add class, id, and click event to each square
        const newDiv = document.createElement('div');
        newDiv.className = 'square';
        newDiv.id = i;
        // adding click event to each tile
        newDiv.addEventListener('mousedown', (e) => {
            // get id of square from click event (so we don't need to keep track of the event itself)
            const squareID = e.target.id;
            // don't allow clicking on flagged square
            if ((e.target.style.backgroundImage == flagImage && e.button !== 2) || 
            (document.getElementById('victory').style.display === 'block') || 
            (document.getElementById('tryHarder').style.display === 'block')) {
                return;
            }
            // Matt identified
            if (e.button === 2) {
                if (e.target.style.backgroundColor !== 'rgb(216, 216, 216)') {
                    if (e.target.style.backgroundImage == flagImage) {
                        e.target.style.backgroundImage = '';
                        mattsRemaining++;
                    // only allow max number of flags
                    } else if (mattsRemaining > 0 && e.target.innerHTML === '') {
                        e.target.style.backgroundImage = flagImage;
                        mattsRemaining--;
                    }
                    updateMattCount();
                }
            } else {
                const mattIndex = mattLocations.indexOf(+e.target.id);
                // Matt clicked
                if (mattIndex >= 0) {
                    // you can only lose if you click a matt on a turn after your first
                    if (!firstClick) {
                        // display all matt locations
                        mattLocations.forEach((matt) => {
                            document.getElementById(matt).style.backgroundImage = mineImage;
                        })
                        mattsRemaining = 0;
                        updateMattCount();
                        document.getElementById('tryHarder').style.display = 'block';
                    } else {
                        // remove the 1 matt that was clicked on and pick a new random location
                        mattLocations.splice(mattIndex, 1);
                        setMatts(1);
                        //Check location of nearby matts
                        checkSurroundingTiles([+squareID]); 
                    }
                } else {
                    //Check location of nearby matts
                    checkSurroundingTiles([+squareID]); 
                }

                // no longer the first click
                firstClick = false;
            }
        });
        gridArea.appendChild(newDiv);
    };
    setMatts();
}

// set matts
setMatts = (numberToSet = 0) => {
    for (i = 1; i <= (numberToSet || startingMatts); i++) {
        const matt = Math.floor(Math.random() * lastSquare) + 1;
        if (mattLocations.indexOf(matt) >= 0) {
            // If already a matt at that square, reduce incrementor and loop through again so we end up with correct # of matts.
            i--;
        } else {
            // If no matt at that square, add one.
            mattLocations.push(matt);
        }
    }
}

// update remaining Matt counter at the top
updateMattCount = () => {
    document.getElementById('remaining').innerHTML = `Matts remaining: ${mattsRemaining}`;
}

// style squares that have already been clicked on
emptyTileNumberStyling = (squareID) => {
    document.getElementById(squareID).style.backgroundColor = '#d8d8d8';
    document.getElementById(squareID).style.cursor = 'default';
}

checkCorner = (squareID, corner) => {
    let nearbyMatts = 0;
    corner.forEach((cornerTile) => {
        if (mattLocations.indexOf(cornerTile) >= 0) {
            nearbyMatts++
        }
    })
    if (nearbyMatts === 0 && squareID <= lastSquare && squareID > 0) {
        checkSurroundingTiles(corner);
    }
    if (nearbyMatts > 0) {
        document.getElementById(squareID).innerHTML = nearbyMatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

checkEdge = (squareID, edgeCheck) => {
    let nearbyMatts = 0;
    edgeCheck.forEach((edge) => {
        if (mattLocations.indexOf(edge) >= 0) {
            nearbyMatts++;
        }
    })
    if (nearbyMatts === 0 && squareID <= lastSquare && squareID > 0) {
        checkSurroundingTiles(edgeCheck);
    }
    if (nearbyMatts > 0) {
        document.getElementById(squareID).innerHTML = nearbyMatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

checkOtherSquares = (squareID) => {
    let nearbyMatts = 0;
    edgeIntervals.forEach((interval) => {
        if (mattLocations.indexOf(squareID - interval) >= 0) {
            nearbyMatts++;
        }
        if (mattLocations.indexOf(squareID + interval) >= 0) {
            nearbyMatts++;
        }
    })
    if (nearbyMatts === 0 && squareID <= lastSquare && squareID > 0) {
        checkSurroundingTiles([squareID - edgeIntervals[3], squareID - edgeIntervals[2], squareID - edgeIntervals[1], squareID - edgeIntervals[0], squareID + edgeIntervals[0], squareID + edgeIntervals[1], squareID + edgeIntervals[2], squareID + edgeIntervals[3]]);
    }
    if (document.getElementById(squareID) && nearbyMatts > 0) {
        document.getElementById(squareID).innerHTML = nearbyMatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else if (document.getElementById(squareID) && nearbyMatts === 0) {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

// remove flag and increment remaining Matts counter if that space is filled in by clicking on adjacent empty square and flag was incorrectly placed
removeIncorrectFlag =(squareID) => {
    if (document.getElementById(squareID).style.backgroundImage === flagImage) {
        document.getElementById(squareID).style.backgroundImage = '';
        mattsRemaining++;
        updateMattCount();
    }
}

// check all squares touching the square that was clicked on or the square that was dynamically clicked
checkSurroundingTiles = (squaresToCheck) => {
    squaresToCheck.forEach((square) => {
        if (squaresChecked.indexOf(square) === -1) {
            // keep track of which squares already checked
            if (square > 0 && square <= lastSquare) {
                squaresChecked.push(square);
            }
           
            // if all non-matts are clicked (you win!)
            if (squaresChecked.length === (lastSquare - startingMatts)) {
                youWin();
            }

            if (square === surroundingTileCheck[0]) {
                checkCorner(square, topLeftCorner);
            } else if (square === surroundingTileCheck[1]) {
                checkCorner(square, topRightCorner);
            } else if (square === surroundingTileCheck[2]) {
                checkCorner(square, bottomLeftCorner);
            } else if (square === surroundingTileCheck[3]) {
                checkCorner(square, bottomRightCorner);
            } else if (leftEdge.indexOf(square) >= 0) {
                // includes array of tiles along the left edge to check
                checkEdge(square, [square - edgeIntervals[2], square - edgeIntervals[1], square + edgeIntervals[0], square + edgeIntervals[2], square + edgeIntervals[3]]);
            } else if (rightEdge.indexOf(square) >= 0) {
                // includes array of tiles along the right edge to check
                checkEdge(square, [square - edgeIntervals[3], square - edgeIntervals[2], square - edgeIntervals[0], square + edgeIntervals[1], square + edgeIntervals[2]]);
            } else {
                checkOtherSquares(square);
            }
            
            // set text colors
            if (document.getElementById(square)) {
                document.getElementById(square).style.backgroundColor = '#d8d8d8';
                if (document.getElementById(square).innerHTML === '1') {
                    document.getElementById(square).style.color = '#1e1ff2';
                } else if (document.getElementById(square).innerHTML === '2') {
                    document.getElementById(square).style.color = '#2a8322';
                } else if (document.getElementById(square).innerHTML === '3') {
                    document.getElementById(square).style.color = '#e70d17';
                } else if (document.getElementById(square).innerHTML === '4') {
                    document.getElementById(square).style.color = '#000083';
                } else if (document.getElementById(square).innerHTML === '5') {
                    document.getElementById(square).style.color = '#7e0306';
                } else if (document.getElementById(square).innerHTML === '6') {
                    document.getElementById(square).style.color = '#0e7d8c';
                } else {
                    document.getElementById(square).style.color = '#000';
                }
            }
        }
    })
}

youWin = () => {
    document.getElementById('victory').style.display = 'block';
}

// reset the board, randomize matt locations, reset styles, hide win/lose messages
reset = (skip) => {
    document.getElementById('tryHarder').style.display = 'none';
    document.getElementById('victory').style.display = 'none';
    mattsRemaining = startingMatts;
    firstClick = true;
    updateMattCount();
    mattLocations = [];
    squaresChecked = [];
    if (!skip) {
        setMatts();
    }
    const squares = document.getElementsByClassName('square');
    Array.from(squares).forEach((square) => {
        square.style.backgroundImage = '';
        square.innerHTML = '';
        square.style.backgroundColor = '#bdbdbd';
        square.style.cursor = 'pointer';
    })
}