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
            console.log("\n=== Menu de Clientes ===");
            console.log("1. Cadastro de Cliente");
            console.log("2. Listar Clientes");
            console.log("6. Sair");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.controller.cadastraCliente.cadastrarCliente();
                    break;
                case "2":
                    console.log("\n=== Lista de Clientes ===");
                    const clientes = this.controller.listarClientes();
                    if (clientes.length === 0) {
                        console.log("Nenhum cliente cadastrado.");
                    }
                    else {
                        clientes.forEach((cliente, index) => {
                            console.log(`${index + 1}. Nome: ${cliente.getNome()}, CPF: ${cliente.getCpf()}`);
                        });
                    }
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
