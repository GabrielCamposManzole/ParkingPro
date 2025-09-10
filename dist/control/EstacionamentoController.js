"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionarVeiculoService_1 = __importDefault(require("../service/EstacionarVeiculoService"));
const EstacionarVeiculoView_1 = __importDefault(require("../view/EstacionarVeiculoView"));
const CadastraCliente_1 = __importDefault(require("../view/CadastraCliente"));
const TerminalView_1 = __importDefault(require("../view/TerminalView"));
const Cliente_1 = __importDefault(require("../model/Cliente"));
class EstacionamentoController {
    estacionarVeiculoService;
    estacionarVeiculoView;
    cadastraCliente;
    terminalView;
    constructor() {
        this.estacionarVeiculoService = new EstacionarVeiculoService_1.default();
        this.estacionarVeiculoView = new EstacionarVeiculoView_1.default(this);
        this.cadastraCliente = new CadastraCliente_1.default(this);
        this.terminalView = new TerminalView_1.default(this);
    }
    cadastrarCliente(nome, cpf, tipo) {
        const cliente = new Cliente_1.default(nome, cpf, tipo);
        return cliente;
    }
}
exports.default = EstacionamentoController;
