export type Trail = {
    x: number[];
    y: number[];
};
export type CaptchaRequest = {
    response: number;
    trail: Trail;
};
export type VerifyResult = {
    result: boolean;
    token?: string;
};
export type Options = {
    tolerance: number;
    verify: (trueAnswer: number, solution: number, trail: Trail, tolerance: number) => boolean;
};
declare const verifyCaptcha: (trueAnswer: number, captchaResult: CaptchaRequest, options?: Options) => VerifyResult;
export default verifyCaptcha;
