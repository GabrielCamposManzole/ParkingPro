"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class EstacionarVeiculoView {
    prompt;
    controller;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
    }
    fluxoEstacionar() {
        console.log("\n=== Estacionar Veículo ===");
        let tipoCliente = this.prompt("Tipo de cliente (1 - Mensalista, 2 - Avulso): ");
        while (tipoCliente !== "1" && tipoCliente !== "2") {
            tipoCliente = this.prompt("Opção inválida. Digite 1 para Mensalista ou 2 para Avulso: ");
        }
        let nome = "";
        let cpf = "";
        let categoria = "";
        if (tipoCliente === "2") { // Avulso
            console.log("\n=== Dados do Cliente Avulso ===");
            nome = this.prompt("Nome: ");
            cpf = this.prompt("CPF: ");
            categoria = this.prompt("Categoria do veículo (moto/carro/caminhao): ").toLowerCase();
        }
        else if (tipoCliente === "1") { // Mensalista
            console.log("\n=== Cliente Mensalista ===");
            nome = this.prompt("Nome do cliente cadastrado: ");
            cpf = this.prompt("CPF do cliente cadastrado: ");
            categoria = this.prompt("Categoria do veículo para estacionar (moto/carro/caminhao): ").toLowerCase();
        }
        while (!["moto", "carro", "caminhao"].includes(categoria)) {
            categoria = this.prompt("Categoria inválida. Digite moto, carro ou caminhao: ").toLowerCase();
        }
        const placa = this.prompt("Placa do veículo: ");
        const modelo = this.prompt("Modelo do veículo: ");
    }
}
exports.default = EstacionarVeiculoView;
