"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const verifySolution = (trueAnswer, solution, tolerance) => Math.abs(trueAnswer - solution) < tolerance;
const verifyHorizontalMotion = (positions) => !positions.reduce((jumpToInput, pos) => jumpToInput && (pos === 0 || pos === positions[positions.length - 1]), true);
const verifyVerticalMotion = (positions) => positions.reduce((total, pos) => total + pos) !== 0;
const verifyTrailLength = (trail) => trail.x.length === trail.y.length;
const verifyResponse = (trueAnswer, solution, trail, tolerance) => verifySolution(trueAnswer, solution, tolerance) &&
    verifyTrailLength(trail) &&
    verifyHorizontalMotion(trail.x) &&
    verifyVerticalMotion(trail.y);
const verifyCaptcha = (trueAnswer, captchaResult, options = { tolerance: 7, verify: verifyResponse }) => {
    if (options.verify(trueAnswer, captchaResult.response, captchaResult.trail, options.tolerance)) {
        const token = (0, uuid_1.v4)();
        return { result: true, token: token };
    }
    else {
        return { result: false };
    }
};
exports.default = verifyCaptcha;
//# sourceMappingURL=verify.js.map