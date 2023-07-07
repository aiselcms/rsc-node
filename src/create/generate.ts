export type Color = {
  h: number;
  s: number;
  l: number;
};

const randInt = (min = 0, max = 2147483646): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randShade = (hue: number): Color => {
  return {
    h: hue,
    s: randInt(50, 70),
    l: randInt(50, 60),
  };
};

const hslString = (color: Color): string => {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
};

const randScheme = (base: number) =>
  [
    randShade(base),
    randShade((base + 60) % 360),
    randShade((base - 30) % 360),
    randShade((base + 30) % 360),
    randShade((base - 60) % 360),
  ].map((color) => hslString(color));

const svgRect = (
  x: number,
  y: number,
  gridWidth: number,
  gridHeight: number,
  color: string
): string => {
  return `<rect filter="url(#noise)" x="${x}" y="${y}" width="${gridWidth}" height="${gridHeight}" fill="${color}"/>`;
};

const svgGridPattern = (
  width: number,
  height: number,
  gridWidth: number,
  gridHeight: number,
  scheme: string[]
): string => {
  const matrix: string[][] = [];
  for (let y = 0; y < Math.floor(height / gridHeight); y++) {
    matrix.push([]);
    for (let x = 0; x < Math.floor(width / gridWidth); x++) {
      matrix[y][x] = svgRect(
        x * gridWidth,
        y * gridHeight,
        gridWidth,
        gridHeight,
        scheme[x % 2]
      );
    }
  }

  return matrix.map((line: string[]) => line.join("")).join("");
};

const backgroundSvg = (
  width: number,
  height: number,
  {
    gridWidth = randInt(5, 50),
    gridHeight = randInt(5, 50),
    scheme = randScheme(randInt(0, 360)),
    seeds = [randInt(), randInt()],
  } = {}
): string => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <filter id="noise">
                    <feTurbulence type="turbulence" baseFrequency="0.005" seed="${
                      seeds[0]
                    }" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <filter id="heavy">
                    <feTurbulence type="turbulence" baseFrequency="0.005" seed="${
                      seeds[1]
                    }" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="100" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <rect width="${width}" height="${height}" fill="${scheme[4]}"/>
                <rect filter="url(#heavy)"  width="${
                  width / 2
                }" height="${height}" x="${width / 5}" fill="${scheme[2]}"/>
                <rect filter="url(#heavy)" width="${
                  width / 2
                }" height="${height}" x="${width / 2}" fill="${scheme[3]}"/>
                ${svgGridPattern(width, height, gridWidth, gridHeight, scheme)}
            </svg>`;
};
const puzzlePieceSvg = ({
  distort = false,
  rotate = false,
  fill = "#000",
  stroke = "#fff",
  seed = 0,
  opacity = "0.5",
  strokeWidth = "0.5",
} = {}): string => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
                <defs>
                    <style>
                        .puzzlePieceClass {
                            stroke: ${stroke};
                            fill: ${fill};
                            stroke-width: ${strokeWidth};
                            stroke-linejoin: round;
                            opacity: ${opacity};
                        }
                    </style>
                </defs>
                <filter id="noise">
                    <feTurbulence type="turbulence" baseFrequency="0.05" seed="${seed}" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <path 
                    class="puzzlePieceClass"
                    ${distort ? 'filter="url(#noise)"' : ""} 
                    ${rotate ? `transform="rotate(${seed}, 10, 10)"` : ""}
                    d="M35.049,50.29s1.5-3.945,2.409-7.339c0.877-3.291,1.434-6.479,1.434-6.479a30.511,30.511,0,0,1-8.029,1.606,25.3,25.3,0,0,1-7.8-1.146,25.281,25.281,0,0,1-1.146-7.8,30.494,30.494,0,0,1,1.607-8.027s-3.188.557-6.48,1.434c-3.4.9-7.341,2.409-7.341,2.409s0.262-6.476,3.671-9.862c2.3-2.286,7.193-2.509,10.782-3.441A14.22,14.22,0,0,0,29.2,9.24S37.314,2.847,44.115.982a27.835,27.835,0,0,1,14.8.113,27.817,27.817,0,0,1,.113,14.792c-1.865,6.8-8.259,14.908-8.259,14.908a14.214,14.214,0,0,0-2.409,5.046c-0.932,3.588-1.155,8.478-3.442,10.779C41.527,50.029,35.049,50.29,35.049,50.29Zm15.5-40.832s-8.51.826-13.32,5.635c-4.6,4.6-5.509,13.189-5.509,13.189s8.593-.909,13.192-5.507C49.719,17.967,50.546,9.458,50.546,9.458ZM14.832,36.947c-4.7,4.7-14.832,9.4-14.832,9.4S4.7,36.215,9.4,31.515c3.917-3.917,6.655-1.222,6.655-1.222S18.749,33.03,14.832,36.947ZM28.486,50.595c-4.695,4.695-14.83,9.373-14.83,9.373s4.679-10.135,9.374-14.829c3.913-3.912,6.662-1.206,6.662-1.206S32.4,46.682,28.486,50.595ZM16.779,47.248c-3.5,3.5-11.059,6.99-11.059,6.99s3.489-7.558,6.99-11.058c2.918-2.917,4.968-.9,4.968-0.9S19.7,44.33,16.779,47.248Z"
                    />
            </svg>`;
};

export { puzzlePieceSvg, backgroundSvg, randInt };
