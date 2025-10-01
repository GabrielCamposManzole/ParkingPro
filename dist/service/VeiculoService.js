"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
class VeiculoService {
    repositorioVeiculos;
    constructor(repositorioVeiculos) {
        this.repositorioVeiculos = repositorioVeiculos;
    }
    criarCarro(placa, modelo, cor, cliente) {
        const novoCarro = new Carro_1.default(placa, modelo, cor);
        novoCarro.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCarro);
        return novoCarro;
    }
    criarMoto(placa, modelo, cor, cliente) {
        const novaMoto = new Moto_1.default(placa, modelo, cor);
        novaMoto.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novaMoto);
        return novaMoto;
    }
    criarCaminhao(placa, modelo, cor, cliente) {
        const novoCaminhao = new Caminhao_1.default(placa, modelo, cor);
        novoCaminhao.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCaminhao);
        return novoCaminhao;
    }
    listarTodosCadastrados() {
        return this.repositorioVeiculos.listarTodosCadastrados();
    }
    buscarVeiculosPorCliente(cpf) {
        return this.repositorioVeiculos.buscarVeiculosPorCpfCliente(cpf);
    }
}
exports.default = VeiculoService;
