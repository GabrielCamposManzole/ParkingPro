"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class TerminalView {
    prompt;
    controller;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
        this.exibirMenu();
    }
    exibirMenu() {
        let continues = true;
        while (continues) {
            console.log("\n=== Menu do Estacionamento ===");
            console.log("                     ");
            console.log("1. Dashboard");
            console.log("2. Clientes");
            console.log("3. Veículos");
            console.log("4. Vagas ");
            console.log("5. Gestão");
            console.log("6. Sair");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    console.log("Opção 1 Dashboard");
                    break;
                case "2":
                    this.controller.cadastraCliente.cadastrar();
                    break;
                case "3":
                    console.log("Opção 3 Veículos");
                    break;
                case "4":
                    this.exibirVagasDisponiveis(50);
                    break;
                case "5":
                    console.log("Opção 5 Gestão");
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
    exibirVagasDisponiveis(vagas) {
        console.log(`Vagas disponíveis: ${vagas}`);
    }
}
exports.default = TerminalView;
