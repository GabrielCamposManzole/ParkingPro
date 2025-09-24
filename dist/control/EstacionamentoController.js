"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionarVeiculoService_1 = __importDefault(require("../service/EstacionarVeiculoService"));
const EstacionarVeiculoView_1 = __importDefault(require("../view/EstacionarVeiculoView"));
<<<<<<< HEAD
const Cadastro_1 = __importDefault(require("../view/Cadastro")); // Importação correta
const TerminalView_1 = __importDefault(require("../view/TerminalView"));
const Cliente_1 = __importDefault(require("../model/Cliente"));
const Database_1 = __importDefault(require("../db/Database"));
=======
const ClienteView_1 = __importDefault(require("../view/ClienteView"));
const TerminalView_1 = __importDefault(require("../view/TerminalView"));
const Cliente_1 = __importDefault(require("../model/Cliente"));
const CadastrarClineteService_1 = __importDefault(require("../service/CadastrarClineteService"));
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
class EstacionamentoController {
    database = new Database_1.default();
    estacionarVeiculoService;
    estacionarVeiculoView;
<<<<<<< HEAD
    cadastraCliente = new Cadastro_1.default(this);
=======
    clienteView;
    cadastrarClienteService = new CadastrarClineteService_1.default(this);
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
    terminalView;
    veiculos = [];
    constructor() {
        this.estacionarVeiculoService = new EstacionarVeiculoService_1.default();
        this.estacionarVeiculoView = new EstacionarVeiculoView_1.default(this);
<<<<<<< HEAD
        // this.cadastraCliente = new CadastraCliente(this);
=======
        this.clienteView = new ClienteView_1.default(this);
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
        this.terminalView = new TerminalView_1.default(this);
        this.veiculos = new Array();
    }
<<<<<<< HEAD
    getNewCliente() {
        return new Cliente_1.default();
    }
    getNewVehicle(tipo) {
        switch (tipo) {
            case "carro":
                return new Carro_1.default();
            case "moto":
                return new Moto_1.default();
            case "caminhao":
                return new Caminhao_1.default();
            default:
                throw new Error("Tipo de veículo inválido");
        }
=======
    newCliente(nome, cpf, tipo) {
        const cliente = new Cliente_1.default(nome, cpf, tipo);
        return cliente;
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
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
