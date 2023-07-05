"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const generate_1 = require("./generate");
const sizes = ({
    WIDTH: 250,
    HEIGHT: 150,
    PUZZLE: 60,
    PADDING: 20,
});
const createCaptcha = ({ image = Buffer.from((0, generate_1.backgroundSvg)(sizes.WIDTH, sizes.HEIGHT)), distort = false, rotate = false, fill = '#000', stroke = '#fff', strokeWidth = '.4', opacity = '0.5', } = {}) => {
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
        fill: '#fff',
        stroke: '#fff',
        opacity: '1',
    }));
    const outline = Buffer.from((0, generate_1.puzzlePieceSvg)({
        rotate,
        distort,
        seed,
        stroke,
        strokeWidth,
        fill: 'none',
        opacity: '1',
    }));
    const location = {
        left: (0, generate_1.randInt)(sizes.PUZZLE + sizes.PADDING, sizes.WIDTH - (sizes.PUZZLE + sizes.PADDING)),
        top: (0, generate_1.randInt)(sizes.PADDING, sizes.HEIGHT - (sizes.PUZZLE + sizes.PADDING)),
    };
    return new Promise((resolve) => {
        const ins = (0, sharp_1.default)(image)
            .resize({ width: sizes.WIDTH, height: sizes.HEIGHT });
        return ins
            .composite([
            {
                input: overlay,
                blend: 'over',
                top: location.top,
                left: location.left,
            },
        ])
            .png()
            .toBuffer()
            .then(async (background) => {
            const composed = await ins
                .composite([
                {
                    input: mask,
                    blend: 'dest-in',
                    top: location.top,
                    left: location.left,
                },
                {
                    input: outline,
                    blend: 'over',
                    top: location.top,
                    left: location.left,
                },
            ]).toBuffer();
            return (0, sharp_1.default)(composed).extract({
                left: location.left,
                top: 0,
                width: sizes.PUZZLE,
                height: sizes.HEIGHT,
            })
                .png()
                .toBuffer()
                .then((slider) => {
                return {
                    data: {
                        background,
                        slider,
                    },
                    solution: location.left,
                };
            });
        });
    });
};
exports.default = createCaptcha;
//# sourceMappingURL=create.js.map