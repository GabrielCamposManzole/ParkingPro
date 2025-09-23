"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class clienteView {
    prompt;
    controller;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
    }
    clienteC() {
        let continues = true;
        while (continues) {
            console.log("\n=== Menu do Estacionamento ===");
            console.log("                     ");
            console.log("1. Cadastro de Cliente");
            console.log("2. Listar Clientes");
            console.log("6. Sair");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.controller.cadastrarClienteService.cadastrar();
                    break;
                case "2":
                    console;
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
}
exports.default = clienteView;
