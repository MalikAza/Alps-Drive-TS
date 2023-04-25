"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function doesNotExists(response, type) {
    return response.status(404).json({
        "message": `This ${type} does not exists.`
    });
}
function alreadyExists(response, type) {
    return response.status(400).send(`This ${type} already exists.`);
}
function notAlphaNum(response) {
    return response.status(400).send("The folder's name is not valid. It must be alpha-numeric.");
}
exports.default = { doesNotExists, alreadyExists, notAlphaNum };
//# sourceMappingURL=responses.js.map