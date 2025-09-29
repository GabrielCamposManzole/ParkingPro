"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vaga_1 = __importDefault(require("../model/Vaga"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
class Database {
    carrosDB = [];
    motosDB = [];
    caminhoesDB = [];
    clienteDB = [];
    // As propriedades de vagas são agora arrays de objetos Vaga
    vagasCarro = [];
    vagasMoto = [];
    vagasCaminhao = [];
    constructor() {
        // Inicializa as vagas com os números e tipos definidos
        for (let i = 1; i <= 15; i++) {
            this.vagasCarro.push(new Vaga_1.default(i, TipoVeiculo_1.TipoVeiculo.CARRO));
        }
        for (let i = 16; i <= 23; i++) {
            this.vagasMoto.push(new Vaga_1.default(i, TipoVeiculo_1.TipoVeiculo.MOTO));
        }
        for (let i = 24; i <= 28; i++) {
            this.vagasCaminhao.push(new Vaga_1.default(i, TipoVeiculo_1.TipoVeiculo.CAMINHAO));
        }
    }
}
exports.default = Database;
