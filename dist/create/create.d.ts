declare const createCaptcha: ({ image, rotate, fill, stroke, strokeWidth, opacity, }?: {
    image?: Buffer;
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
export default createCaptcha;
