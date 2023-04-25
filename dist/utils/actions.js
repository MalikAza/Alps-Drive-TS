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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const responses_1 = __importDefault(require("./responses"));
const alphaNumericRegEx = new RegExp('^[a-zA-Z\-_\.0-9]+$');
function _getItemInfos(currentPath, item) {
    let itemInfos = {
        name: item.name,
        isFolder: true
    };
    if (!item.isDirectory()) {
        itemInfos.isFolder = false;
        itemInfos.size = fs_1.default.statSync(path_1.default.join(currentPath, item.name)).size;
    }
    return itemInfos;
}
function getFolderInfos(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let folderInfos = [];
        const items = fs_1.default.readdirSync(`${folderPath}`, { withFileTypes: true });
        yield Promise.all(items.map((fd) => {
            return folderInfos.push(_getItemInfos(`${folderPath}`, fd));
        }));
        return folderInfos;
    });
}
function getItemSubFolderInfos(itemPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = fs_1.default.lstatSync(itemPath);
        if (!item.isDirectory())
            return ['application/octet-stream', fs_1.default.readFileSync(itemPath, 'utf-8')];
        else
            return ['application/json', yield getFolderInfos(itemPath)];
    });
}
function createFolder(response, currentPath, name) {
    if (!alphaNumericRegEx.test(name))
        return responses_1.default.notAlphaNum(response);
    fs_1.default.mkdirSync(path_1.default.join(currentPath, name));
    response.status(201).json({
        "message": "Folder perfectly created."
    });
}
function deleteFolder(response, currentPath) {
    fs_1.default.rmSync(path_1.default.join(currentPath), { recursive: true, force: true });
    return response.status(200).json({
        "message": "Folder perfectly deleted."
    });
}
exports.default = {
    getFolderInfos,
    getItemSubFolderInfos,
    createFolder,
    deleteFolder
};
//# sourceMappingURL=actions.js.map