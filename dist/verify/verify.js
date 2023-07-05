"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uid_safe_1 = __importDefault(require("uid-safe"));
const verifySolution = (captcha, solution, tolerance) => Math.abs(captcha - solution) < tolerance;
const verifyHorizontalMotion = (positions) => !positions.reduce((jumpToInput, pos) => jumpToInput && (pos === 0 || pos === positions[positions.length - 1]), true);
const verifyVerticalMotion = (positions) => positions.reduce((total, pos) => total + pos) !== 0;
const verifyTrailLength = (trail) => trail.x.length === trail.y.length;
const verifyResponse = (captcha, solution, trail, tolerance) => verifySolution(captcha, solution, tolerance) &&
    verifyTrailLength(trail) &&
    verifyHorizontalMotion(trail.x) &&
    verifyVerticalMotion(trail.y);
const verifyCaptcha = (captcha, { response, trail, }, { tolerance = 7, verify = verifyResponse, } = {}) => new Promise((resolve) => {
    if (verify(captcha, response, trail, tolerance)) {
        (0, uid_safe_1.default)(32).then((token) => {
            resolve({
                result: 'success',
                token,
            });
        });
    }
    else {
        resolve({ result: 'failure' });
    }
});
exports.default = verifyCaptcha;
//# sourceMappingURL=verify.js.map