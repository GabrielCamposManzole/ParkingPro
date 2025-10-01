import EstacionamentoController from "./control/EstacionamentoController";
import Database from "./db/Database";
import EstacionarVeiculoService from "./service/EstacionarVeiculoService";
import ClienteService from "./service/ClienteService";
import VeiculoService from "./service/VeiculoService";
import VagaService from "./service/VagaService";
import TerminalView from "./view/TerminalView";
import ClienteView from "./view/ClienteView"; // Importe a ClienteView se necessário

// --- COMPOSITION ROOT ---

console.log("Iniciando a composição da aplicação...");

// 1. Criar a implementação do Repositório
const repositorio = new Database();

// 2. Criar as implementações dos Serviços, injetando o repositório
const clienteService = new ClienteService(repositorio);
const estacionarVeiculoService = new EstacionarVeiculoService(repositorio, repositorio);
const veiculoService = new VeiculoService(repositorio);
const vagaService = new VagaService(repositorio);

// 3. Criar o Controller, INJETANDO TODOS OS QUATRO serviços
const estacionamentoController = new EstacionamentoController(
    estacionarVeiculoService,
    clienteService,
    veiculoService,
    vagaService
);

// 4. Criar a camada de Visualização (View), injetando o controller
const terminalView = new TerminalView(estacionamentoController);

// 5. Iniciar a aplicação
console.log("Sistema de Estacionamento pronto.");
terminalView.exibirMenu();

console.log("Sistema de Estacionamento Finalizado.");