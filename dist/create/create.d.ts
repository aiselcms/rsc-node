export interface RCCreateResult {
    data: {
        background: string;
        slider: string;
    };
    solution: number;
}
declare const createCaptcha: ({ image, rotate, fill, stroke, strokeWidth, opacity, }?: {
    image?: Buffer;
    rotate?: boolean;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    opacity?: string;
}) => Promise<RCCreateResult>;
export default createCaptcha;
