"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Veiculo_1 = __importDefault(require("./Veiculo"));
const TipoVeiculo_1 = require("./TipoVeiculo");
class Moto extends Veiculo_1.default {
    constructor(placa, modelo, cor) {
        super(placa, modelo, cor);
    }
    getTipo() {
        return TipoVeiculo_1.TipoVeiculo.MOTO;
    }
    fazAlgo(s, n) {
        console.log("Moto não faz nada.");
    }
}
exports.default = Moto;
