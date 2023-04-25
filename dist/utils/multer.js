"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const conf_1 = __importDefault(require("./conf"));
const storage = multer_1.default.diskStorage({
    destination: function (request, file, callback) {
        callback(null, request.path.replace('/api/drive', conf_1.default));
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname);
    }
});
function fileCreationResponse(request, response, error) {
    if (!request.file)
        return response.status(400).send('No file provided');
    if (error)
        return response.status(400).send('Something went wrong!');
    response.status(201).json({
        "message": "File perfectly uploaded."
    });
}
const upload = (0, multer_1.default)({
    storage: storage
}).single('file');
exports.default = { upload, fileCreationResponse };
//# sourceMappingURL=multer.js.map