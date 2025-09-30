"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const ClientType_1 = require("../model/ClientType");
const TipoVeiculo_1 = require("../model/TipoVeiculo");
class Cadastro {
    controller;
    prompt = (0, prompt_sync_1.default)();
    constructor(controller) {
        this.controller = controller;
    }
    cadastrarCliente() {
        console.log("\n=== Cadastro de Cliente ===");
        const nome = this.prompt("Nome: ");
        const cpf = this.prompt("CPF: ");
        let tipoInput = this.prompt("Tipo (1 - Mensalista | 2 - Avulso | 3 - Especial): ");
        const tiposPermitidos = Object.values(ClientType_1.ClientType).filter(value => typeof value === 'number');
        let tipo = parseInt(tipoInput);
        while (!tiposPermitidos.includes(tipo)) {
            tipoInput = this.prompt("Tipo inválido. Digite 1, 2 ou 3: ");
            tipo = parseInt(tipoInput);
        }
        const novoCliente = this.controller.criarCliente(nome, cpf, tipo);
        console.log("\nCliente cadastrado com sucesso!");
        console.log(`Nome: ${novoCliente.getNome()}`);
        console.log(`CPF: ${novoCliente.getCpf()}`);
        console.log(`Tipo: ${novoCliente.getTipo()}`);
    }
    cadastrarVeiculo() {
        console.log("\n=== Cadastro de Veículo ===");
        const clientes = this.controller.listarClientes();
        if (clientes.length === 0) {
            console.log("Não há clientes cadastrados. Por favor, cadastre um cliente primeiro.");
            return;
        }
        let clienteSelecionado;
        let clienteIndexInput = this.prompt("Selecione o número do cliente: ");
        let clienteIndex = parseInt(clienteIndexInput) - 1;
        while (isNaN(clienteIndex) || clienteIndex < 0 || clienteIndex >= clientes.length) {
            clienteIndexInput = this.prompt("Seleção inválida. Digite um número válido: ");
            clienteIndex = parseInt(clienteIndexInput) - 1;
        }
        clienteSelecionado = clientes[clienteIndex];
        const categoria = this.prompt("Categoria do veículo (carro/moto/caminhao): ").toLowerCase();
        const placa = this.prompt("Placa do veículo: ");
        const modelo = this.prompt("Modelo do veículo: ");
        const cor = this.prompt("Cor do veículo: ");
        switch (categoria) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                this.controller.criarCarro(placa, modelo, cor, clienteSelecionado);
                break;
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                this.controller.criarMoto(placa, modelo, cor, clienteSelecionado);
                break;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                this.controller.criarCaminhao(placa, modelo, cor, clienteSelecionado);
                break;
            default:
                console.log("Categoria inválida.");
                return;
        }
        console.log("\nVeículo cadastrado com sucesso!");
        console.log(`Categoria: ${categoria}`);
        console.log(`Placa: ${placa}`);
        console.log(`Cliente: ${clienteSelecionado.getNome()}`);
    }
}
exports.default = Cadastro;
