"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteError = void 0;
class ClienteError extends Error {
    constructor(message) {
        super(message);
        this.name = "ClienteError";
    }
}
exports.ClienteError = ClienteError;
