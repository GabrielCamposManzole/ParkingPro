"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("./Cliente"));
class ClienteMensalista extends Cliente_1.default {
    constructor(nome, cpf, tipo) {
        super(nome, cpf, tipo);
    }
}
exports.default = ClienteMensalista;
