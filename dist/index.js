"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionamentoController_1 = __importDefault(require("./control/EstacionamentoController"));
const Database_1 = __importDefault(require("./db/Database"));
const EstacionarVeiculoService_1 = __importDefault(require("./service/EstacionarVeiculoService"));
const ClienteService_1 = __importDefault(require("./service/ClienteService"));
const VeiculoService_1 = __importDefault(require("./service/VeiculoService"));
const VagaService_1 = __importDefault(require("./service/VagaService"));
const TerminalView_1 = __importDefault(require("./view/TerminalView"));
// --- COMPOSITION ROOT ---
console.log("Iniciando a composição da aplicação...");
// 1. Criar a implementação do Repositório
const repositorio = new Database_1.default();
// 2. Criar as implementações dos Serviços, injetando o repositório
const clienteService = new ClienteService_1.default(repositorio);
const estacionarVeiculoService = new EstacionarVeiculoService_1.default(repositorio, repositorio);
const veiculoService = new VeiculoService_1.default(repositorio);
const vagaService = new VagaService_1.default(repositorio);
// 3. Criar o Controller, INJETANDO TODOS OS QUATRO serviços
const estacionamentoController = new EstacionamentoController_1.default(estacionarVeiculoService, clienteService, veiculoService, vagaService);
// 4. Criar a camada de Visualização (View), injetando o controller
const terminalView = new TerminalView_1.default(estacionamentoController);
// 5. Iniciar a aplicação
console.log("Sistema de Estacionamento pronto.");
terminalView.exibirMenu();
console.log("Sistema de Estacionamento Finalizado.");
