"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("./generate");
const sharp_1 = __importDefault(require("sharp"));
const sizes = {
    WIDTH: 250,
    HEIGHT: 150,
    PUZZLE: 60,
    PADDING: 20,
};
const createCaptcha = async ({ image = Buffer.from((0, generate_1.backgroundSvg)(sizes.WIDTH, sizes.HEIGHT)), distort = false, rotate = false, fill = "#000", stroke = "#fff", strokeWidth = ".4", opacity = "0.5", } = {}) => {
    const seed = (0, generate_1.randInt)();
    const overlay = Buffer.from((0, generate_1.puzzlePieceSvg)({
        rotate,
        distort,
        fill,
        stroke,
        strokeWidth,
        opacity,
        seed,
    }));
    const mask = Buffer.from((0, generate_1.puzzlePieceSvg)({
        rotate,
        distort,
        seed,
        strokeWidth,
        fill: "#fff",
        stroke: "#fff",
        opacity: "1",
    }));
    const outline = Buffer.from((0, generate_1.puzzlePieceSvg)({
        rotate,
        distort,
        seed,
        stroke,
        strokeWidth,
        fill: "none",
        opacity: "1",
    }));
    const location = {
        left: (0, generate_1.randInt)(sizes.PUZZLE + sizes.PADDING, sizes.WIDTH - (sizes.PUZZLE + sizes.PADDING)),
        top: (0, generate_1.randInt)(sizes.PADDING, sizes.HEIGHT - (sizes.PUZZLE + sizes.PADDING)),
    };
    const ins = (0, sharp_1.default)(image).resize({
        width: sizes.WIDTH,
        height: sizes.HEIGHT,
    });
    const background = await ins
        .composite([
        {
            input: overlay,
            blend: "over",
            top: location.top,
            left: location.left,
        },
    ])
        .png()
        .toBuffer();
    const composed = await ins
        .composite([
        {
            input: mask,
            blend: "dest-in",
            top: location.top,
            left: location.left,
        },
        {
            input: outline,
            blend: "over",
            top: location.top,
            left: location.left,
        },
    ])
        .toBuffer();
    const slider = await (0, sharp_1.default)(composed)
        .extract({
        left: location.left,
        top: 0,
        width: sizes.PUZZLE,
        height: sizes.HEIGHT,
    })
        .png()
        .toBuffer();
    return {
        data: {
            background: background.toString("base64"),
            slider: slider.toString("base64"),
        },
        solution: location.left,
    };
};
exports.default = createCaptcha;
//# sourceMappingURL=create.js.map