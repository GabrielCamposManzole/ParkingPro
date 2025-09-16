"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class CadastraCliente {
    controller;
    prompt = (0, prompt_sync_1.default)();
    constructor(controller) {
        this.controller = controller;
    }
    cadastrar() {
        console.log("\n=== Cadastro de Cliente Mensalista ===");
        const nome = this.prompt("Nome: ");
        const cpf = this.prompt("CPF: ");
        const tipo = 1; // Mensalista
        let categoria = this.prompt("Categoria do veículo (moto/carro/caminhao): ").toLowerCase();
        while (!["moto", "carro", "caminhao"].includes(categoria)) {
            categoria = this.prompt("Categoria inválida. Digite moto, carro ou caminhao: ").toLowerCase();
        }
        const valorMensal = this.prompt("Valor mensal do veículo: ");
        const cliente = this.controller.cadastrarCliente(nome, cpf, tipo);
        console.log(`Cliente ${cliente.getNome()} cadastrado com sucesso!`);
        console.log(`Valor mensal: R$${valorMensal} | Categoria: ${categoria}`);
    }
}
exports.default = CadastraCliente;
