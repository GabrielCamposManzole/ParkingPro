"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaCarroFactory = void 0;
const VagaFactory_1 = require("./VagaFactory");
const Vaga_1 = __importDefault(require("../Vaga"));
const TipoVeiculo_1 = require("../TipoVeiculo");
class VagaCarroFactory extends VagaFactory_1.VagaFactory {
    // Esta fábrica sabe que deve criar uma Vaga do tipo CARRO
    criarVaga(numero) {
        // Encapsula a lógica do "new" e do Enum
        return new Vaga_1.default(numero, TipoVeiculo_1.TipoVeiculo.CARRO);
    }
}
exports.VagaCarroFactory = VagaCarroFactory;
