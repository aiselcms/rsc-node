"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randInt = exports.backgroundSvg = exports.puzzlePieceSvg = void 0;
const randInt = (min = 0, max = 2147483646) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randInt = randInt;
const randShade = (hue) => {
    return {
        h: hue,
        s: randInt(50, 70),
        l: randInt(50, 60),
    };
};
const hslString = (color) => {
    return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
};
const randScheme = (base) => [
    randShade(base),
    randShade((base + 60) % 360),
    randShade((base - 30) % 360),
    randShade((base + 30) % 360),
    randShade((base - 60) % 360),
].map((color) => hslString(color));
const svgRect = (x, y, gridWidth, gridHeight, color) => {
    return `<rect filter="url(#noise)" x="${x}" y="${y}" width="${gridWidth}" height="${gridHeight}" fill="${color}"/>`;
};
const svgGridPattern = (width, height, gridWidth, gridHeight, scheme) => {
    const matrix = [];
    for (let y = 0; y < Math.floor(height / gridHeight); y++) {
        matrix.push([]);
        for (let x = 0; x < Math.floor(width / gridWidth); x++) {
            matrix[y][x] = svgRect(x * gridWidth, y * gridHeight, gridWidth, gridHeight, scheme[x % 2]);
        }
    }
    return matrix.map((line) => line.join("")).join("");
};
const backgroundSvg = (width, height, { gridWidth = randInt(5, 50), gridHeight = randInt(5, 50), scheme = randScheme(randInt(0, 360)), seeds = [randInt(), randInt()], } = {}) => {
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <filter id="noise">
                    <feTurbulence type="turbulence" baseFrequency="0.005" seed="${seeds[0]}" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <filter id="heavy">
                    <feTurbulence type="turbulence" baseFrequency="0.005" seed="${seeds[1]}" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="100" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <rect width="${width}" height="${height}" fill="${scheme[4]}"/>
                <rect filter="url(#heavy)"  width="${width / 2}" height="${height}" x="${width / 5}" fill="${scheme[2]}"/>
                <rect filter="url(#heavy)" width="${width / 2}" height="${height}" x="${width / 2}" fill="${scheme[3]}"/>
                ${svgGridPattern(width, height, gridWidth, gridHeight, scheme)}
            </svg>`;
};
exports.backgroundSvg = backgroundSvg;
const puzzlePieceSvg = ({ distort = false, rotate = false, fill = "#000", stroke = "#fff", seed = 0, opacity = "0.5", strokeWidth = "0.25", } = {}) => {
    return `<svg viewBox="0 0 60 60" height="60" width="60">
                <filter id="noise">
                    <feTurbulence type="turbulence" baseFrequency="0.05" seed="${seed}" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <path ${distort ? 'filter="url(#noise)"' : ""} ${rotate ? `transform="rotate(${seed}, 10, 10)"` : ""} d="M350.494,502.9s15.043-39.445,24.093-73.39c8.774-32.913,14.343-64.789,14.343-64.789s-41.713,14.94-80.288,16.061c-40.517,1.179-77.991-11.459-77.991-11.459s-12.641-37.466-11.462-77.973c1.122-38.567,16.065-80.27,16.065-80.27s-31.883,5.568-64.8,14.34c-33.952,9.047-73.407,24.088-73.407,24.088s2.619-64.762,36.712-98.619c23.02-22.861,71.926-25.092,107.816-34.411C272.6,108.423,292.039,92.4,292.039,92.4S373.14,28.465,441.15,9.82c79.607-21.825,147.956,1.132,147.956,1.132s22.963,68.334,1.133,147.922c-18.65,68-82.6,149.078-82.6,149.078s-16.031,19.43-24.091,50.456C474.232,394.291,472,443.185,449.134,466.2,415.27,500.285,350.494,502.9,350.494,502.9ZM505.457,94.582s-85.1,8.262-133.2,56.354c-45.995,45.984-55.086,131.893-55.086,131.893s85.929-9.088,131.924-55.073C497.193,179.665,505.457,94.582,505.457,94.582ZM148.321,369.473c-47,47-148.325,94-148.325,94s47-101.315,94-148.317c39.173-39.171,66.547-12.222,66.547-12.222S187.494,330.3,148.321,369.473ZM284.86,505.946c-46.949,46.947-148.3,93.732-148.3,93.732S183.346,498.33,230.3,451.384c39.127-39.125,66.621-12.056,66.621-12.056S323.987,466.821,284.86,505.946ZM167.793,472.475c-35.01,35.008-110.589,69.9-110.589,69.9s34.89-75.576,69.9-110.584c29.177-29.175,49.679-8.99,49.679-8.99S196.97,443.3,167.793,472.475Z"
                    opacity="${opacity}"
                    stroke="${stroke}"
                    fill="${fill}"
                    stroke-width="${strokeWidth}"
                    stroke-linejoin="round"/>
            </svg>`;
};
exports.puzzlePieceSvg = puzzlePieceSvg;
//# sourceMappingURL=generate.js.map