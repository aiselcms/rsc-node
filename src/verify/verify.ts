import { v4 as uuidv4 } from "uuid";

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
  verify: (
    trueAnswer: number,
    solution: number,
    trail: Trail,
    tolerance: number
  ) => boolean;
};

// Solution must be correct within the given tolerance
const verifySolution = (
  trueAnswer: number,
  solution: number,
  tolerance: number
): boolean => Math.abs(trueAnswer - solution) < tolerance;

// Slider position must not jump to the solution without intermediate values
const verifyHorizontalMotion = (positions: number[]): boolean =>
  !positions.reduce(
    (jumpToInput, pos) =>
      jumpToInput && (pos === 0 || pos === positions[positions.length - 1]),
    true
  );

// Vertical motion must be present while dragging the slider
const verifyVerticalMotion = (positions: number[]): boolean =>
  positions.reduce((total, pos) => total + pos) !== 0;

const verifyTrailLength = (trail: Trail): boolean =>
  trail.x.length === trail.y.length;

const verifyResponse = (
  trueAnswer: number,
  solution: number,
  trail: Trail,
  tolerance: number
): boolean =>
  verifySolution(trueAnswer, solution, tolerance) &&
  verifyTrailLength(trail) &&
  verifyHorizontalMotion(trail.x) &&
  verifyVerticalMotion(trail.y);

const verifyCaptcha = (
  trueAnswer: number,
  captchaResult: CaptchaRequest,
  options: Options
): VerifyResult => {
  if (
    options.verify(
      trueAnswer,
      captchaResult.response,
      captchaResult.trail,
      options.tolerance
    )
  ) {
    const token = uuidv4();
    return { result: true, token: token };
  } else {
    return { result: false };
  }
};

export default verifyCaptcha;
