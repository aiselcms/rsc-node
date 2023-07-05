declare const verifyCaptcha: (captcha: any, { response, trail }: {
    response: any;
    trail: any;
}, { tolerance, verify }?: {
    tolerance?: number;
    verify?: (captcha: any, solution: any, trail: any, tolerance: any) => boolean;
}) => Promise<{
    result: string;
    token?: string;
}>;
export default verifyCaptcha;
