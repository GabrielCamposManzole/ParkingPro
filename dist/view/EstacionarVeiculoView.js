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
    estacionarVeiculo() {
        console.log("\n=== Estacionar Veículo ===");
        const tipo = this.prompt("Tipo do veículo (carro/moto/caminhao): ").toLowerCase();
        if (!["carro", "moto", "caminhao"].includes(tipo)) {
            console.log("Tipo de veículo inválido. Tente novamente.");
            return;
        }
        const modelo = this.prompt("Modelo do veículo: ");
        const placa = this.prompt("Placa do veículo: ");
        const cor = this.prompt("Cor do veículo: ");
        const sucesso = this.controller.estacionarVeiculo(placa, modelo, cor, tipo);
        if (sucesso) {
            console.log(`Veículo ${placa} estacionado com sucesso!`);
        }
        else {
            console.log("Não há vagas disponíveis no momento.");
        }
    }
    exibirVagasDisponiveis() {
        const vagas = this.controller.estacionarVeiculoService.vagasDisponiveis();
        console.log(`Vagas disponíveis: ${vagas}`);
    }
}
exports.default = EstacionarVeiculoView;
