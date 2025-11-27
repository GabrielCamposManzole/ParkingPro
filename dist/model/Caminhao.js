"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Veiculo_1 = __importDefault(require("./Veiculo"));
const TipoVeiculo_1 = require("./TipoVeiculo");
class Caminhao extends Veiculo_1.default {
    constructor(placa, modelo, cor) {
        super(placa, modelo, cor);
    }
    getTipo() {
        return TipoVeiculo_1.TipoVeiculo.CAMINHAO;
    }
    fazAlgo(s, n) {
        console.log("Caminhão não faz nada.");
    }
}
exports.default = Caminhao;
