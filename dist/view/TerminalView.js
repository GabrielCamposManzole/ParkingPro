"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Cadastro_1 = __importDefault(require("./Cadastro"));
const EstacionarVeiculoView_1 = __importDefault(require("./EstacionarVeiculoView"));
class TerminalView {
    prompt;
    controller;
    cadastroView;
    estacionarView;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
        this.cadastroView = new Cadastro_1.default(this.controller);
        this.estacionarView = new EstacionarVeiculoView_1.default(this.controller);
        this.exibirMenu();
    }
    exibirMenu() {
        let continues = true;
        while (continues) {
            console.log("\n=== Menu do Estacionamento ===");
            console.log("1. Dashboard");
            console.log("2. Clientes");
            console.log("3. Veículos");
            console.log("4. Vagas");
            console.log("5. Gestão");
            console.log("6. Sair");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.exibirDashboard();
                    break;
                case "2":
                    this.menuClientes();
                    break;
                case "3":
                    this.menuVeiculos();
                    break;
                case "4":
                    this.exibirVagasDisponiveis();
                    break;
                case "5":
                    this.menuGestao();
                    break;
                case "6":
                    console.log("Saindo...");
                    continues = false;
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }
    menuClientes() {
        let subMenuContinues = true;
        while (subMenuContinues) {
            console.log("\n=== Menu de Clientes ===");
            console.log("1. Cadastrar Cliente");
            console.log("2. Listar Clientes");
            console.log("3. Voltar");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.cadastroView.cadastrarCliente();
                    break;
                case "2":
                    this.exibirClientes();
                    break;
                case "3":
                    subMenuContinues = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
    }
    menuVeiculos() {
        let subMenuContinues = true;
        while (subMenuContinues) {
            console.log("\n=== Menu de Veículos ===");
            console.log("1. Cadastrar Veículo");
            console.log("2. Estacionar Veículo");
            console.log("3. Listar Veículos Estacionados");
            console.log("4. Remover Veículo");
            console.log("5. Voltar");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.cadastroView.cadastrarVeiculo();
                    break;
                case "2":
                    this.estacionarView.estacionarVeiculo();
                    break;
                case "3":
                    this.exibirVeiculosEstacionados();
                    break;
                case "4":
                    this.estacionarView.removerVeiculo();
                    break;
                case "5":
                    subMenuContinues = false;
                    break;
                default:
                    console.log("Opção inválida.");
            }
        }
    }
    menuGestao() {
        console.log("\n=== Gestão ===");
        console.log("Funcionalidade em desenvolvimento...");
    }
    exibirDashboard() {
        console.log("\n=== Dashboard ===");
        console.log("Funcionalidade em desenvolvimento...");
    }
    exibirClientes() {
        const clientes = this.controller.listarClientes();
        console.log("\n=== Lista de Clientes ===");
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
        }
        else {
            clientes.forEach((cliente, index) => {
                console.log(`\nCliente ${index + 1}:`);
                console.log(`Nome: ${cliente.getNome()}`);
                console.log(`CPF: ${cliente.getCpf()}`);
                console.log(`Tipo: ${cliente.getTipo()}`);
            });
        }
    }
    exibirVagasDisponiveis() {
        const vagas = this.controller.estacionarVeiculoService.vagasDisponiveis();
        console.log(`\nVagas disponíveis: ${vagas}`);
    }
    exibirVeiculosEstacionados() {
        const veiculos = this.controller.estacionarVeiculoService.listarVeiculosEstacionados();
        console.log("\n=== Veículos Estacionados ===");
        if (veiculos.length === 0) {
            console.log("Nenhum veículo estacionado.");
        }
        else {
            veiculos.forEach((veiculo, index) => {
                console.log(`\nVeículo ${index + 1}:`);
                console.log(`Placa: ${veiculo.getPlaca()}`);
                console.log(`Modelo: ${veiculo.getModelo()}`);
                console.log(`Cor: ${veiculo.getCor()}`);
            });
        }
    }
}
exports.default = TerminalView;
