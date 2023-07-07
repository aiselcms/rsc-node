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
    return `<svg viewBox="0 0 20 20" height="60" width="60">
                <filter id="noise">
                    <feTurbulence type="turbulence" baseFrequency="0.05" seed="${seed}" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <path ${distort ? 'filter="url(#noise)"' : ""} ${rotate ? `transform="rotate(${seed}, 10, 10)"` : ""} d="M540.344,775.31s23.193-60.812,37.144-113.144c13.527-50.741,22.112-99.883,22.112-99.883s-64.307,23.032-123.777,24.761c-62.463,1.817-120.237-17.666-120.237-17.666s-19.487-57.76-17.67-120.209c1.73-59.457,24.767-123.749,24.767-123.749S313.53,334,262.777,347.527c-52.343,13.948-113.169,37.135-113.169,37.135s4.037-99.84,56.6-152.037c35.489-35.244,110.885-38.684,166.216-53.05,47.843-12.422,77.8-37.132,77.8-37.132s125.031-98.559,229.88-127.3c122.727-33.647,228.1,1.745,228.1,1.745s35.4,105.348,1.746,228.047C881.2,349.757,782.618,474.759,782.618,474.759s-24.715,29.955-37.14,77.787c-14.37,55.319-17.811,130.7-53.062,166.179C640.208,771.273,540.344,775.31,540.344,775.31Zm238.9-629.5s-131.2,12.737-205.356,86.879c-70.909,70.892-84.924,203.335-84.924,203.335s132.473-14.011,203.383-84.9C766.507,276.983,779.246,145.814,779.246,145.814ZM228.662,569.6C156.2,642.065-.005,714.514-0.005,714.514s72.452-156.2,144.917-228.656c60.392-60.389,102.594-18.843,102.594-18.843S289.054,509.215,228.662,569.6ZM439.159,780C366.78,852.376,210.527,924.5,210.527,924.5s72.131-156.245,144.51-228.621C415.358,635.566,457.745,677.3,457.745,677.3S499.48,719.683,439.159,780ZM258.681,728.4C204.707,782.37,88.189,836.156,88.189,836.156s53.789-116.513,107.762-170.484c44.982-44.979,76.59-13.859,76.59-13.859S303.662,683.42,258.681,728.4Z"
                    opacity="${opacity}"
                    stroke="${stroke}"
                    fill="${fill}"
                    stroke-width="${strokeWidth}"
                    stroke-linejoin="round"/>
            </svg>`;
};
exports.puzzlePieceSvg = puzzlePieceSvg;
//# sourceMappingURL=generate.js.map