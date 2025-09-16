"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class EstacionarVeiculoView {
    prompt;
    controller;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
    }
    fluxoEstacionar() {
    }
}
exports.default = EstacionarVeiculoView;
