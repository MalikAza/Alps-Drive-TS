"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const conf_1 = __importDefault(require("./utils/conf"));
const responses_1 = __importDefault(require("./utils/responses"));
const actions_1 = __importDefault(require("./utils/actions"));
const multer_1 = __importDefault(require("./utils/multer"));
const app = (0, express_1.default)();
app.use(express_1.default.static('frontend'));
app.use(express_1.default.json());
app.post('/api/drive/*', (request, response) => {
    const folderPath = path_1.default.join(conf_1.default, request.params['0']);
    const name = request.query.name.toString();
    if (!fs_1.default.existsSync(folderPath))
        return responses_1.default.doesNotExists(response, 'folder');
    if (fs_1.default.existsSync(path_1.default.join(folderPath, name)))
        return responses_1.default.alreadyExists(response, 'folder');
    actions_1.default.createFolder(response, folderPath, name);
});
app.get('/api/drive/*', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const foDPath = path_1.default.join(conf_1.default, request.params['0']);
    if (!fs_1.default.existsSync(foDPath))
        return responses_1.default.doesNotExists(response, 'path');
    const [contentType, foDInfos] = yield actions_1.default.getItemSubFolderInfos(foDPath);
    response
        .set('Content-Type', contentType)
        .status(200)
        .send(foDInfos);
}));
app.put('/api/drive/*', (request, response) => {
    const folderPath = path_1.default.join(conf_1.default, request.params['0']);
    if (!fs_1.default.existsSync(folderPath))
        return responses_1.default.doesNotExists(response, 'folder');
    multer_1.default.upload(request, response, (error) => {
        multer_1.default.fileCreationResponse(request, response, error);
    });
});
app.delete('/api/drive/*', (request, response) => {
    const folderPath = path_1.default.join(conf_1.default, request.params['0']);
    if (!fs_1.default.existsSync(folderPath))
        return responses_1.default.doesNotExists(response, 'folder');
    actions_1.default.deleteFolder(response, folderPath);
});
exports.default = app;
//# sourceMappingURL=app.js.map