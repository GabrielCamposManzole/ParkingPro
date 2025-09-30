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
        console.log(`Tipo: ${ClientType_1.ClientType[novoCliente.getTipo()]}`); // Melhorado para mostrar o nome do tipo
    }
    // MÉTODO MODIFICADO para buscar cliente por CPF
    cadastrarVeiculo() {
        console.log("\n=== Cadastro de Veículo para Cliente ===");
        if (this.controller.getClientesCadastrados() === 0) {
            console.log("Não há clientes cadastrados no sistema. Por favor, cadastre um cliente primeiro.");
            return;
        }
        const cpf = this.prompt("Digite o CPF do cliente proprietário do veículo: ");
        const clienteSelecionado = this.controller.buscarClientePorCpf(cpf);
        // Valida se o cliente foi encontrado
        if (!clienteSelecionado) {
            console.log(`\nErro: Nenhum cliente encontrado com o CPF '${cpf}'. Operação cancelada.`);
            return;
        }
        console.log(`Cliente encontrado: ${clienteSelecionado.getNome()}`);
        // Permite cadastrar vários carros em sequência para o mesmo cliente
        let continuarCadastrando = true;
        while (continuarCadastrando) {
            console.log("\n-- Adicionando novo veículo --");
            const categoriaInput = this.prompt("Categoria do veículo (carro, moto, caminhao): ").toLowerCase();
            const categoria = categoriaInput;
            if (!Object.values(TipoVeiculo_1.TipoVeiculo).includes(categoria)) {
                console.log("Categoria inválida. Tente novamente.");
                continue; // Pula para a próxima iteração do loop
            }
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
            }
            console.log(`\nVeículo de placa ${placa} cadastrado com sucesso para ${clienteSelecionado.getNome()}!`);
            const resposta = this.prompt("Deseja cadastrar outro veículo para este mesmo cliente? (S/N): ").toUpperCase();
            if (resposta !== 'S') {
                continuarCadastrando = false;
            }
        }
    }
}
exports.default = Cadastro;
