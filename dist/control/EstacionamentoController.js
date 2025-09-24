"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionarVeiculoService_1 = __importDefault(require("../service/EstacionarVeiculoService"));
const EstacionarVeiculoView_1 = __importDefault(require("../view/EstacionarVeiculoView"));
const Cadastro_1 = __importDefault(require("../view/Cadastro")); // Importação correta
const TerminalView_1 = __importDefault(require("../view/TerminalView"));
const Cliente_1 = __importDefault(require("../model/Cliente"));
const Database_1 = __importDefault(require("../db/Database"));
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
class EstacionamentoController {
    database = new Database_1.default();
    estacionarVeiculoService;
    estacionarVeiculoView;
    cadastraCliente = new Cadastro_1.default(this);
    terminalView;
    constructor() {
        this.estacionarVeiculoService = new EstacionarVeiculoService_1.default();
        this.estacionarVeiculoView = new EstacionarVeiculoView_1.default(this);
        // this.cadastraCliente = new CadastraCliente(this);
        this.terminalView = new TerminalView_1.default(this);
    }
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
    }
}
exports.default = EstacionamentoController;
