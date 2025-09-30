"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionamentoController_1 = __importDefault(require("./control/EstacionamentoController"));
const Database_1 = __importDefault(require("./db/Database"));
const EstacionarVeiculoService_1 = __importDefault(require("./service/EstacionarVeiculoService"));
const TerminalView_1 = __importDefault(require("./view/TerminalView"));
// ===================================================================
// COMPOSITION ROOT - O Coração da Injeção de Dependência
// ===================================================================
// 1. Crie a dependência de nível mais baixo: a fonte de dados.
//    Esta será a ÚNICA instância de 'Database' em toda a aplicação.
const database = new Database_1.default();
// 2. Crie os serviços, injetando as dependências que eles precisam.
//    O 'EstacionarVeiculoService' precisa de repositórios, e a nossa
//    classe 'Database' implementa as interfaces necessárias.
const estacionarVeiculoService = new EstacionarVeiculoService_1.default(database, // Injetado como IRepositorioVagas
database // Injetado como IRepositorioVeiculos
);
// 3. Crie o controller, injetando o serviço e os repositórios.
const estacionamentoController = new EstacionamentoController_1.default(estacionarVeiculoService, database, // Injetado como IRepositorioClientes
database, // Injetado como IRepositorioVagas
database // Injetado como IRepositorioVeiculos
);
// 4. Crie a camada de visualização principal (View) e injete o controller.
//    A view não precisa saber como o controller foi criado, apenas recebê-lo.
const terminalView = new TerminalView_1.default(estacionamentoController);
// 5. Inicie a aplicação.
//    A view principal agora está pronta para ser exibida e interagir com o usuário.
terminalView.exibirMenu();
console.log("Sistema de Estacionamento iniciado.");
