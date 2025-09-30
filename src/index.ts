import EstacionamentoController from "./control/EstacionamentoController";
import Database from "./db/Database";
import EstacionarVeiculoService from "./service/EstacionarVeiculoService";
import TerminalView from "./view/TerminalView";

// ===================================================================
// COMPOSITION ROOT - O Coração da Injeção de Dependência
// ===================================================================

// 1. Crie a dependência de nível mais baixo: a fonte de dados.
//    Esta será a ÚNICA instância de 'Database' em toda a aplicação.
const database = new Database();

// 2. Crie os serviços, injetando as dependências que eles precisam.
//    O 'EstacionarVeiculoService' precisa de repositórios, e a nossa
//    classe 'Database' implementa as interfaces necessárias.
const estacionarVeiculoService = new EstacionarVeiculoService(
    database, // Injetado como IRepositorioVagas
    database  // Injetado como IRepositorioVeiculos
);

// 3. Crie o controller, injetando o serviço e os repositórios.
const estacionamentoController = new EstacionamentoController(
    estacionarVeiculoService,
    database, // Injetado como IRepositorioClientes
    database, // Injetado como IRepositorioVagas
    database  // Injetado como IRepositorioVeiculos
);

// 4. Crie a camada de visualização principal (View) e injete o controller.
//    A view não precisa saber como o controller foi criado, apenas recebê-lo.
const terminalView = new TerminalView(estacionamentoController);

// 5. Inicie a aplicação.
//    A view principal agora está pronta para ser exibida e interagir com o usuário.
terminalView.exibirMenu(); 

console.log("Sistema de Estacionamento iniciado.");