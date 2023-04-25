"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const drivePath = path_1.default.join(os_1.default.tmpdir(), 'drive');
exports.default = drivePath;
//# sourceMappingURL=conf.js.map