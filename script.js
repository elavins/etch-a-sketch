// Select DOM container elements and store as constants

const topui = document.querySelector('#top-ui');
const wrapper = document.querySelector('#wrapper');
const ui = document.querySelector('#ui');
const style = document.querySelector('style');

// Initialize paint color variables

let paintColor = 'black';
setCSS();

// Create 16x16 grid of divs

drawGrid(16, 16);
let grid = document.querySelectorAll('.grid-item');
addGridEvents();

// Create 9 swatches, 1 black and 8 random colors

generatePalette();

// Add event listeners for swatches

const swatches = document.querySelectorAll('.swatch');

swatches.forEach(item => {
    item.addEventListener('click', e => {
        let swatched = document.querySelector(`[data-swatch='${e.target.dataset.swatch}']`);
        setPaintColor(getColor(swatched));
    });
});

// Add event listeners for buttons
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => newCanvas());
const save = document.querySelector('#save');
save.addEventListener('click', () => saveSketch());
/*const gridButt = document.querySelector('#grid');
gridButt.addEventListener('click', () => {
    (window.getComputedStyle(grid[0]).getPropertyValue('border').charAt(0) == 0) ? ;
});*/


// Functions!

function drawGrid(numRows, numCols) {
    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numCols; col++) {
            let item = document.createElement('div');
            item.classList = 'grid-item';
            item.setAttribute('data-key', `_${row}x${col}`);
            wrapper.appendChild(item);
        }
    }
}

function getColor(elem) { return elem.style['background-color'] }

function setColor(elem, color) { elem.style['background-color'] = color }

function setPaintColor(newColor) {
    paintColor = newColor;
    setCSS();
}

function setCSS() {
    let hoverCss = `.grid-item:hover {background-color: ${paintColor} !important}`;
    style.innerText = hoverCss;
}

function newCanvas() {
    grid.forEach(item => { item.style.cssText = '' });
    while (wrapper.lastChild) { wrapper.lastChild.remove() }
    let rows = +prompt('rows?');
    let cols = +prompt('columns?');
    while (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1 || rows > 100 || cols > 100) { 
        rows = +prompt('Please enter integers 1-100. Rows?');
        cols = +prompt('columns?');
    }
    wrapper.style.cssText = `grid-template-rows: repeat(${rows}, 1fr);
    grid-template-columns: repeat(${cols}, 1fr);`;
    drawGrid(rows, cols);
    addGridEvents();
}

function generatePalette() {
    let blackSwatch = document.createElement('div');
    blackSwatch.classList = 'swatch';
    blackSwatch.setAttribute('data-swatch', '_0');
    blackSwatch.style['background-color'] = `black`;
    ui.appendChild(blackSwatch);

    for (let i = 1; i < 9; i++) {
        let swatch = document.createElement('div');
        swatch.classList = 'swatch';
        swatch.setAttribute('data-swatch', `_${i}`);
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        swatch.style['background-color'] = `#${randomColor}`;
        ui.appendChild(swatch);
    }
}

function addGridEvents() {
    grid = document.querySelectorAll('.grid-item');

    grid.forEach(item => {
        item.addEventListener('click', e => {
            let clicked = document.querySelector(`[data-key='${e.target.dataset.key}']`);
            (getColor(clicked) != paintColor) ? setColor(clicked, paintColor) : setColor(clicked, 'white');
        });
    });
}

function saveSketch() {
    html2canvas(wrapper).then( (canvas) => {
        let url = canvas.toDataURL("image/png");
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'sketch.png');
        a.click();
    } );
}