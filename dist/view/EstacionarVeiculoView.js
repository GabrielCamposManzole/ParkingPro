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
        const cliente = this.selecionarCliente();
        const dadosVeiculo = this.obterDadosVeiculo();
        // AQUI ESTÁ A LINHA CORRIGIDA
        // Esta sintaxe garante que a propriedade 'cliente' só é adicionada
        // ao objeto se a variável 'cliente' não for undefined.
        const sucesso = this.controller.estacionarVeiculo({
            ...dadosVeiculo,
            ...(cliente && { cliente: cliente })
        });
        if (sucesso) {
            console.log(`\nVeículo de placa ${dadosVeiculo.placa} estacionado com sucesso!`);
        }
        else {
            console.log("\nNão há vagas disponíveis no momento para este tipo de veículo.");
        }
    }
    selecionarCliente() {
        const clienteCadastrado = this.prompt("O cliente já é cadastrado? (S/N): ").toUpperCase();
        if (clienteCadastrado !== 'S') {
            return undefined;
        }
        const clientes = this.controller.listarClientes();
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado. Continue como cliente avulso.");
            return undefined;
        }
        console.log("\nSelecione o cliente:");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1}. ${cliente.getNome()} (CPF: ${cliente.getCpf()})`);
        });
        const clienteIndexInput = this.prompt(`Digite o número do cliente (ou pressione Enter para continuar como avulso): `);
        if (!clienteIndexInput) {
            return undefined;
        }
        const clienteIndex = parseInt(clienteIndexInput) - 1;
        if (!isNaN(clienteIndex) && clienteIndex >= 0 && clienteIndex < clientes.length) {
            const selecionado = clientes[clienteIndex];
            if (selecionado) {
                console.log(`Cliente '${selecionado.getNome()}' selecionado.`);
            }
            return selecionado;
        }
        console.log("Seleção inválida. Continuando como cliente avulso.");
        return undefined;
    }
    obterDadosVeiculo() {
        const placa = this.prompt("Placa do veículo: ");
        const modelo = this.prompt("Modelo do veículo: ");
        const cor = this.prompt("Cor do veículo: ");
        let tipoInput = this.prompt("Tipo do veículo (carro/moto/caminhao): ").toLowerCase();
        while (!Object.values(TipoVeiculo_1.TipoVeiculo).includes(tipoInput)) {
            tipoInput = this.prompt("Tipo de veículo inválido. Tente novamente: ").toLowerCase();
        }
        const tipo = tipoInput;
        return { placa, modelo, cor, tipo };
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
