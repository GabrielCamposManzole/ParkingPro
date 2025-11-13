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
    criarVaga(numero) {
        return new Vaga_1.default(numero, TipoVeiculo_1.TipoVeiculo.CARRO);
    }
}
exports.VagaCarroFactory = VagaCarroFactory;
