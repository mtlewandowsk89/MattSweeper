let mattLocations = [];
let leftEdge = [31, 61, 91, 121, 151, 181, 211, 241, 271, 301, 331, 361, 391, 421];
let rightEdge = [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450];
let startingMatts = 99;
let mattsRemaining = 99;
let squaresChecked = [];

// cancel default right click menu
window.oncontextmenu = () => {return false;}

setTimeout(() => {
    document.getElementById('remaining').innerHTML = `Matts remaining: ${mattsRemaining}`;
    let gridArea = document.getElementById('gridArea');
    // Create 30 x 16 game grid
    for (i = 1; i <= 480; i++) {
        // Add class, id, and click event to each square
        let newDiv = document.createElement('div');
        newDiv.className = 'square';
        newDiv.id = i;
        newDiv.addEventListener('mousedown', (e) => {
            // don't allow clicking on flagged square
            if ((e.target.style.backgroundImage == 'url("flag.PNG")' && e.button !== 2) || mattsRemaining === 0) {
                return;
            }
            // Matt identified
            if (e.button === 2) {
                let correctFlags = 0;
                if (e.target.style.backgroundImage == 'url("flag.PNG")') {
                    e.target.style.backgroundImage = '';
                    mattsRemaining++;
                // only allow 99 flags
                } else if (mattsRemaining > 0 && e.target.innerHTML === '') {
                    e.target.style.backgroundImage = 'url("flag.PNG")';
                    mattsRemaining--;
                }
                document.getElementById('remaining').innerHTML = `Matts remaining: ${mattsRemaining}`;
                //check how many flags are correct
                mattLocations.forEach((matt) => {
                    if (document.getElementById(matt).style.backgroundImage == 'url("flag.PNG")') {
                        correctFlags++;
                    }
                })
                // if all flags are correct
                if (correctFlags === startingMatts) {
                    document.getElementById('victory').style.display = 'block';
                }
            } else {
                // Matt clicked
                if (mattLocations.indexOf(+e.target.id) >= 0) {
                    // display all matt locations
                    mattLocations.forEach((matt) => {
                        document.getElementById(matt).style.backgroundImage = 'url("./try_harder.png")';
                    })
                    mattsRemaining = 0;
                    document.getElementById('remaining').innerHTML = `Matts remaining: ${mattsRemaining}`;
                    document.getElementById('tryHarder').style.display = 'block';
                } else {
                    //Check location of nearby matts
                    if (+e.target.id === 1) {
                        checkTopLeftCorner(e);
                    } else if (+e.target.id === 30) {
                        checkTopRightCorner(e);
                    } else if (+e.target.id === 451) {
                        checkBottomLeftCorner(e);
                    } else if (+e.target.id === 480) {
                        checkBottomRightCorner(e);
                    } else if (leftEdge.indexOf(+e.target.id) >= 0) {
                        checkLeftEdge(e);
                    } else if (rightEdge.indexOf(+e.target.id) >= 0) {
                        checkRightEdge(e);
                    } else {
                        checkOtherSquares(e);
                    }
                    // set text colors
                    if (e.target.innerHTML === '1') {
                        e.target.style.color = '#1e1ff2';
                    } else if (e.target.innerHTML === '2') {
                        e.target.style.color = '#2a8322';
                    } else if (e.target.innerHTML === '3') {
                        e.target.style.color = '#e70d17';
                    } else if (e.target.innerHTML === '4') {
                        e.target.style.color = '#000083';
                    } else if (e.target.innerHTML === '5') {
                        e.target.style.color = '#7e0306';
                    } else if (e.target.innerHTML === '6') {
                        e.target.style.color = '#0e7d8c';
                    } else {
                        e.target.style.color = '#000';
                    }
                }
            }
        });
        gridArea.appendChild(newDiv);
    };
    setMatts();
}, 100);

setMatts = () => {
    // set 99 matts (expert difficulty)
    for (i = 1; i <= 99; i++) {
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

checkTopLeftCorner = (e) => {
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
    if (e.target) {
        if (nearbymatts === 0) {
            checkForMoreZeros([2, 31, 32]);
        }
        e.target.innerHTML = nearbymatts;
    } else {
        if (nearbymatts === 0 && e <= 480 && e > 0) {
            checkForMoreZeros([2, 31, 32]);
        }
        document.getElementById(e).innerHTML = nearbymatts;
    }
}

checkTopRightCorner = (e) => {
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

    if (e.target) {
        if (nearbymatts === 0) {
            checkForMoreZeros([29, 59, 60]);
        }
        e.target.innerHTML = nearbymatts;
    } else {
        if (nearbymatts === 0 && e <= 480 && e > 0) {
            checkForMoreZeros([29, 59, 60]);
        }
        document.getElementById(e).innerHTML = nearbymatts;
    }
}

checkBottomLeftCorner = (e) => {
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

    if (e.target) {
        if (nearbymatts === 0) {
            checkForMoreZeros([421, 422, 452]);
        }
        e.target.innerHTML = nearbymatts;
    } else {
        if (nearbymatts === 0 && e <= 480 && e > 0) {
            checkForMoreZeros([421, 422, 452]);
        }
        document.getElementById(e).innerHTML = nearbymatts;
    }
}

checkBottomRightCorner = (e) => {
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
    
    if (e.target) {
        if (nearbymatts === 0) {
            checkForMoreZeros([449, 450, 479]);
        }
        e.target.innerHTML = nearbymatts;
    } else {
        if (nearbymatts === 0 && e <= 480 && e > 0) {
            checkForMoreZeros([449, 450, 479]);
        }
        document.getElementById(e).innerHTML = nearbymatts;
    }
}

checkLeftEdge = (e) => {
    let nearbymatts = 0;
    if (e.target) {
        if (mattLocations.indexOf(+e.target.id - 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id - 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 31) >= 0) {
            nearbymatts++;
        }
        if (nearbymatts === 0) {
            checkForMoreZeros([+e.target.id - 30, +e.target.id - 29, +e.target.id + 1, +e.target.id + 30, +e.target.id + 31]);
        }
        e.target.innerHTML = nearbymatts;
    } else {
        if (mattLocations.indexOf(e - 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e - 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 31) >= 0) {
            nearbymatts++;
        }
        if (nearbymatts === 0 && e <= 480 && e > 0) {
            checkForMoreZeros([e - 30, e - 29, e + 1, e + 30, e + 31]);
        }
        document.getElementById(e).innerHTML = nearbymatts;
    }
}

checkRightEdge = (e) => {
    let nearbymatts = 0;
    if (e.target) {
        if (mattLocations.indexOf(+e.target.id - 31) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id - 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id - 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 30) >= 0) {
            nearbymatts++;
        }
        if (nearbymatts === 0) {
            checkForMoreZeros([+e.target.id - 31, +e.target.id - 30, +e.target.id - 1, +e.target.id + 29, +e.target.id + 30]);
        }
        e.target.innerHTML = nearbymatts;
    } else {
        if (mattLocations.indexOf(e - 31) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e - 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e - 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 30) >= 0) {
            nearbymatts++;
        }
        if (nearbymatts === 0 && e <= 480 && e > 0) {
            checkForMoreZeros([e - 31, e - 30, e - 1, e + 29, e + 30]);
        }
        document.getElementById(e).innerHTML = nearbymatts;
    }
    
}

checkOtherSquares = (e) => {
    let nearbymatts = 0;
    if (e.target) {
        if (mattLocations.indexOf(+e.target.id - 31) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id - 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id - 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id - 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(+e.target.id + 31) >= 0) {
            nearbymatts++;
        }
        if (nearbymatts === 0) {
            checkForMoreZeros([+e.target.id - 31, +e.target.id - 30, +e.target.id - 29, +e.target.id - 1, +e.target.id + 1, +e.target.id + 29, +e.target.id + 30, +e.target.id + 31]);
        }
        e.target.innerHTML = nearbymatts;
    } else {
        if (mattLocations.indexOf(e - 31) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e - 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e - 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e - 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 1) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 29) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 30) >= 0) {
            nearbymatts++;
        }
        if (mattLocations.indexOf(e + 31) >= 0) {
            nearbymatts++;
        }
        if (nearbymatts === 0 && e <= 480 && e > 0) {
            checkForMoreZeros([e - 31, e - 30, e - 29, e - 1, e + 1, e + 29, e + 30, e + 31]);
        }
        if (document.getElementById(e)) {
            document.getElementById(e).innerHTML = nearbymatts;
        }
    }
    
}

checkForMoreZeros = (squaresToCheck) => {
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

reset = () => {
    // reset the board, randomize matt locations
    document.getElementById('tryHarder').style.display = 'none';
    document.getElementById('victory').style.display = 'none';
    mattsRemaining = 99;
    document.getElementById('remaining').innerHTML = `Matts remaining: ${mattsRemaining}`;
    mattLocations = [];
    squaresChecked = [];
    setMatts();
    let squares = document.getElementsByClassName('square');
    Array.from(squares).forEach((square) => {
        square.style.backgroundImage = '';
        square.innerHTML = '';
    })
}