"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionarVeiculoService_1 = __importDefault(require("../service/EstacionarVeiculoService"));
const EstacionarVeiculoView_1 = __importDefault(require("../view/EstacionarVeiculoView"));
const ClienteView_1 = __importDefault(require("../view/ClienteView"));
const TerminalView_1 = __importDefault(require("../view/TerminalView"));
const Cliente_1 = __importDefault(require("../model/Cliente"));
const CadastrarClineteService_1 = __importDefault(require("../service/CadastrarClineteService"));
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
class EstacionamentoController {
    estacionarVeiculoService;
    estacionarVeiculoView;
    clienteView;
    cadastrarClienteService = new CadastrarClineteService_1.default(this);
    terminalView;
    veiculos = [];
    constructor() {
        this.estacionarVeiculoService = new EstacionarVeiculoService_1.default();
        this.estacionarVeiculoView = new EstacionarVeiculoView_1.default(this);
        this.clienteView = new ClienteView_1.default(this);
        this.terminalView = new TerminalView_1.default(this);
        this.veiculos = new Array();
    }
    newCliente(nome, cpf, tipo) {
        const cliente = new Cliente_1.default(nome, cpf, tipo);
        return cliente;
    }
    estacionarVeiculo(placa, modelo, cor, tipo) {
        let veiculo;
        if (tipo === "carro") {
            veiculo = new Carro_1.default(placa, modelo, cor);
        }
        else if (tipo === "moto") {
            veiculo = new Moto_1.default(placa, modelo, cor);
        }
        else if (tipo === "caminhao") {
            veiculo = new Caminhao_1.default(placa, modelo, cor);
        }
        else {
            return false;
        }
        const sucesso = this.estacionarVeiculoService.estacionarVeiculo(veiculo);
        if (sucesso) {
            this.veiculos.push(veiculo);
        }
        return sucesso;
    }
}
exports.default = EstacionamentoController;
