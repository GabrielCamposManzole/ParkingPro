"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
class EstacionarVeiculoView {
    prompt;
    controller;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
    }
    estacionarVeiculo() {
        console.log("\n=== Estacionar Veículo ===");
        const placa = this.prompt("Placa do veículo: ");
        const modelo = this.prompt("Modelo do veículo: ");
        const cor = this.prompt("Cor do veículo: ");
        let tipoInput = this.prompt("Tipo do veículo (carro/moto/caminhao): ").toLowerCase();
        while (!Object.values(TipoVeiculo_1.TipoVeiculo).includes(tipoInput)) {
            tipoInput = this.prompt("Tipo de veículo inválido. Tente novamente: ").toLowerCase();
        }
        const tipo = tipoInput;
        const sucesso = this.controller.estacionarVeiculo(placa, modelo, cor, tipo);
        if (sucesso) {
            console.log(`Veículo ${placa} estacionado com sucesso!`);
        }
        else {
            console.log("Não há vagas disponíveis no momento.");
        }
    }
    removerVeiculo() {
        console.log("\n=== Remover Veículo ===");
        const placa = this.prompt("Digite a placa do veículo a ser removido: ");
        const sucesso = this.controller.removerVeiculo(placa);
        if (sucesso) {
            console.log(`Veículo com placa ${placa} removido com sucesso!`);
        }
        else {
            console.log(`Veículo com placa ${placa} não encontrado.`);
        }
    }
}
exports.default = EstacionarVeiculoView;
