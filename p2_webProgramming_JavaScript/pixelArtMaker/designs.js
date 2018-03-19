/**
 * @description Draw the grid based on user's color and size input.
 */

function makeGrid() {

    // get size input
    let gridHeight = document.getElementById('input_height').value;
    let gridWidth = document.getElementById('input_width').value;

    if (gridHeight > 1 && gridWidth > 1) {
        let tableElement = document.getElementById('pixelCanvas');

        // clear the previous table
        if (tableElement.childNodes.length > 0) {
            removeRowsFromTable(tableElement);
        }

        // draw a table
        for (let row = 0; row < gridHeight; row++) {

            let tableElement = document.getElementById('pixelCanvas');
            tableElement.appendChild(document.createElement('tr'));

            for (let col = 0; col < gridWidth; col++) {
                tableElement.lastChild.appendChild(document.createElement('td'));
            }

        }

        // add click event on cells
        let tableCells = Array.from(document.getElementsByTagName('td'));

        tableCells.forEach(function(cell) {
            cell.addEventListener('click', function() {
                this.style.backgroundColor = document.getElementById('colorPicker').value;
            });
        });

    } else {
        alert('Please enter height and width first!');
    }

}

/**
 * @description Remove all rows from the table.
 */

function removeRowsFromTable(tableElement) {
    while (tableElement.childNodes.length > 0) {
        tableElement.removeChild(tableElement.childNodes[0]);
    }
}

// call makeGrid() when form gets submitted
document.getElementById('sizePicker').addEventListener('submit', function(event) {
    event.preventDefault();
    makeGrid();
});


// reset sizePicker
document.getElementById('resetBtn').addEventListener('click', function() {
    removeRowsFromTable(document.getElementById('pixelCanvas'));
    // reset color back to black
    document.getElementById('colorPicker').value = '#000';
});
