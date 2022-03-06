const wrapper = document.querySelector('#wrapper');
const ui = document.querySelector('#ui');
const style = document.querySelector('style');

// Initialize paint color variables

let paintColor = 'black';
setCSS();

// Create 16x16 grid of divs

for (let row = 1; row <= 16; row++) {
    for (let col = 1; col <= 16; col++) {
        let item = document.createElement('div');
        item.classList = 'grid-item';
        item.setAttribute('data-key', `_${row}x${col}`);
        item.style['background-color'] = 'white';
        wrapper.appendChild(item);
    }
}

// Create 9 swatches, 1 black and 8 random colors

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

// Add event listeners for all grid items and swatches

const grid = document.querySelectorAll('.grid-item');
const swatches = document.querySelectorAll('.swatch');

grid.forEach(item => {
    item.addEventListener('click', e => {
        let clicked = document.querySelector(`[data-key='${e.target.dataset.key}']`);
        (getColor(clicked) != paintColor) ? setColor(clicked, paintColor) : setColor(clicked, 'white');
    });
});

swatches.forEach(item => {
    item.addEventListener('click', e => {
        let swatched = document.querySelector(`[data-swatch='${e.target.dataset.swatch}']`);
        setPaintColor(getColor(swatched));
    });
});

// Helper functions!

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