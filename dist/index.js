"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionamentoController_1 = __importDefault(require("./control/EstacionamentoController"));
// Apenas cria a instância do Controller, que agora controla todo o ciclo de vida da aplicação.
new EstacionamentoController_1.default();
