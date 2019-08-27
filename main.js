let mattLocations = [];
let leftEdge = [31, 61, 91, 121, 151, 181, 211, 241, 271, 301, 331, 361, 391, 421];
let rightEdge = [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450];
let startingMatts = 99;
let mattsRemaining = 99;
let squaresChecked = [];

// cancel default right click menu
window.oncontextmenu = () => {return false;}

// wait .1s so the dom has time to render before building the grid
setTimeout(() => {
    updateMattCount();
    let gridArea = document.getElementById('gridArea');
    // Create 30 x 16 game grid
    for (i = 1; i <= 480; i++) {
        // Add class, id, and click event to each square
        let newDiv = document.createElement('div');
        newDiv.className = 'square';
        newDiv.id = i;
        newDiv.addEventListener('mousedown', (e) => {
            // get id of square from click event (so we don't need to keep track of the event itself)
            let squareID = e.target.id;
            // don't allow clicking on flagged square
            if ((e.target.style.backgroundImage == 'url("icecream-vector-simple-15.png")' && e.button !== 2) || 
            (document.getElementById('victory').style.display === 'block') || 
            (document.getElementById('tryHarder').style.display === 'block')) {
                return;
            }
            // Matt identified
            if (e.button === 2) {
                if (e.target.style.backgroundColor !== 'rgb(216, 216, 216)') {
                    let correctFlags = 0;
                    if (e.target.style.backgroundImage == 'url("icecream-vector-simple-15.png")') {
                        e.target.style.backgroundImage = '';
                        mattsRemaining++;
                    // only allow 99 flags
                    } else if (mattsRemaining > 0 && e.target.innerHTML === '') {
                        e.target.style.backgroundImage = 'url("icecream-vector-simple-15.png")';
                        mattsRemaining--;
                    }
                    updateMattCount();
                    //check how many flags are correct
                    mattLocations.forEach((matt) => {
                        if (document.getElementById(matt).style.backgroundImage == 'url("icecream-vector-simple-15.png")') {
                            correctFlags++;
                        }
                    })
                    // if all flags are correct
                    if (correctFlags === startingMatts) {
                        document.getElementById('victory').style.display = 'block';
                    }
                }
            } else {
                // Matt clicked
                if (mattLocations.indexOf(+e.target.id) >= 0) {
                    // display all matt locations
                    mattLocations.forEach((matt) => {
                        document.getElementById(matt).style.backgroundImage = 'url("./try_harder.png")';
                    })
                    mattsRemaining = 0;
                    updateMattCount();
                    document.getElementById('tryHarder').style.display = 'block';
                } else {
                    //Check location of nearby matts
                    checkSurroundingTiles([+squareID]);
                }
            }
        });
        gridArea.appendChild(newDiv);
    };
    setMatts();
}, 100);

// set 99 matts (expert difficulty)
setMatts = () => {
    for (i = 1; i <= startingMatts; i++) {
        let matt = Math.floor(Math.random() * 480) + 1;
        if (mattLocations.indexOf(matt) >= 0) {
            // If already a matt at that square, reduce incrementor and loop through again so we end up with 99 matts.
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

checkTopLeftCorner = (squareID) => {
    let nearbymatts = 0;
    if (mattLocations.indexOf(2) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(31) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(32) >= 0) {
        nearbymatts++;
    }
    if (nearbymatts === 0 && squareID <= 480 && squareID > 0) {
        checkSurroundingTiles([2, 31, 32]);
    }
    if (nearbymatts > 0) {
        document.getElementById(squareID).innerHTML = nearbymatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
    
}

checkTopRightCorner = (squareID) => {
    let nearbymatts = 0;
    if (mattLocations.indexOf(29) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(59) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(60) >= 0) {
        nearbymatts++;
    }
    if (nearbymatts === 0 && squareID <= 480 && squareID > 0) {
        checkSurroundingTiles([29, 59, 60]);
    }
    if (nearbymatts > 0) {
        document.getElementById(squareID).innerHTML = nearbymatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

checkBottomLeftCorner = (squareID) => {
    let nearbymatts = 0;
    if (mattLocations.indexOf(421) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(422) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(452) >= 0) {
        nearbymatts++;
    }
    if (nearbymatts === 0 && squareID <= 480 && squareID > 0) {
        checkSurroundingTiles([421, 422, 452]);
    }
    if (nearbymatts > 0) {
        document.getElementById(squareID).innerHTML = nearbymatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

checkBottomRightCorner = (squareID) => {
    let nearbymatts = 0;
    if (mattLocations.indexOf(449) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(450) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(479) >= 0) {
        nearbymatts++;
    }
    if (nearbymatts === 0 && squareID <= 480 && squareID > 0) {
        checkSurroundingTiles([449, 450, 479]);
    }
    if (nearbymatts > 0) {
        document.getElementById(squareID).innerHTML = nearbymatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

checkLeftEdge = (squareID) => {
    let nearbymatts = 0;
    if (mattLocations.indexOf(squareID - 30) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID - 29) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 1) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 30) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 31) >= 0) {
        nearbymatts++;
    }
    if (nearbymatts === 0 && squareID <= 480 && squareID > 0) {
        checkSurroundingTiles([squareID - 30, squareID - 29, squareID + 1, squareID + 30, squareID + 31]);
    }
    if (nearbymatts > 0) {
        document.getElementById(squareID).innerHTML = nearbymatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

checkRightEdge = (squareID) => {
    let nearbymatts = 0;
    if (mattLocations.indexOf(squareID - 31) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID - 30) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID - 1) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 29) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 30) >= 0) {
        nearbymatts++;
    }
    if (nearbymatts === 0 && squareID <= 480 && squareID > 0) {
        checkSurroundingTiles([squareID - 31, squareID - 30, squareID - 1, squareID + 29, squareID + 30]);
    }
    if (nearbymatts > 0) {
        document.getElementById(squareID).innerHTML = nearbymatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

checkOtherSquares = (squareID) => {
    let nearbymatts = 0;
    if (mattLocations.indexOf(squareID - 31) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID - 30) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID - 29) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID - 1) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 1) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 29) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 30) >= 0) {
        nearbymatts++;
    }
    if (mattLocations.indexOf(squareID + 31) >= 0) {
        nearbymatts++;
    }
    if (nearbymatts === 0 && squareID <= 480 && squareID > 0) {
        checkSurroundingTiles([squareID - 31, squareID - 30, squareID - 29, squareID - 1, squareID + 1, squareID + 29, squareID + 30, squareID + 31]);
    }
    if (document.getElementById(squareID) && nearbymatts > 0) {
        document.getElementById(squareID).innerHTML = nearbymatts;
        removeIncorrectFlag(squareID);
        emptyTileNumberStyling(squareID);
    } else if (document.getElementById(squareID) && nearbymatts === 0) {
        emptyTileNumberStyling(squareID);
        removeIncorrectFlag(squareID);
    }
}

// remove flag and increment remaining Matts counter if that space is filled in by clicking on adjacent empty square and flag was incorrectly placed
removeIncorrectFlag =(squareID) => {
    if (document.getElementById(squareID).style.backgroundImage === 'url("icecream-vector-simple-15.png")') {
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
            squaresChecked.push(square);
            if (square === 1) {
                checkTopLeftCorner(square);
            } else if (square === 30) {
                checkTopRightCorner(square);
            } else if (square === 451) {
                checkBottomLeftCorner(square);
            } else if (square === 480) {
                checkBottomRightCorner(square);
            } else if (leftEdge.indexOf(square) >= 0) {
                checkLeftEdge(square);
            } else if (rightEdge.indexOf(square) >= 0) {
                checkRightEdge(square);
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

// reset the board, randomize matt locations, reset styles, hide win/lose messages
reset = () => {
    document.getElementById('tryHarder').style.display = 'none';
    document.getElementById('victory').style.display = 'none';
    mattsRemaining = startingMatts;
    updateMattCount();
    mattLocations = [];
    squaresChecked = [];
    setMatts();
    let squares = document.getElementsByClassName('square');
    Array.from(squares).forEach((square) => {
        square.style.backgroundImage = '';
        square.innerHTML = '';
        square.style.backgroundColor = '#bdbdbd';
        square.style.cursor = 'pointer';
    })
}