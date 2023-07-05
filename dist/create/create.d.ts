/// <reference types="node" />
declare const createCaptcha: ({ image, distort, rotate, fill, stroke, strokeWidth, opacity, }?: {
    image?: Buffer;
    distort?: boolean;
    rotate?: boolean;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    opacity?: string;
}) => Promise<unknown>;
export default createCaptcha;
