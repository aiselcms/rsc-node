declare const createCaptcha1: ({ image, distort, rotate, fill, stroke, strokeWidth, opacity, }?: {
    image?: Buffer;
    distort?: boolean;
    rotate?: boolean;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    opacity?: string;
}) => Promise<{
    data: {
        background: string;
        slider: string;
    };
    solution: number;
}>;
export default createCaptcha1;
