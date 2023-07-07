declare const randInt: (min?: number, max?: number) => number;
declare const backgroundSvg: (width: number, height: number, { gridWidth, gridHeight, scheme, seeds, }?: {
    gridWidth?: number;
    gridHeight?: number;
    scheme?: string[];
    seeds?: number[];
}) => string;
declare const puzzlePieceSvg: ({ rotate, fill, stroke, seed, opacity, strokeWidth, }?: {
    rotate?: boolean;
    fill?: string;
    stroke?: string;
    seed?: number;
    opacity?: string;
    strokeWidth?: string;
}) => string;
export { puzzlePieceSvg, backgroundSvg, randInt };
