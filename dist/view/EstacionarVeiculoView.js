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
    menuVeiculos() {
        let subMenuContinues = true;
        while (subMenuContinues) {
            console.log("\n--- Menu de Veículos ---");
            console.log("1. Cadastrar Veículo para Cliente");
            console.log("2. Estacionar Veículo");
            console.log("3. Listar Veículos ESTACIONADOS");
            console.log("4. Listar TODOS os Veículos cadastrados");
            console.log("5. Remover Veículo do Estacionamento");
            console.log("6. Voltar");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.cadastrarVeiculo();
                    break;
                case "2":
                    this.estacionarVeiculo();
                    break;
                case "3":
                    this.exibirVeiculosEstacionados();
                    break;
                case "4":
                    this.exibirTodosCadastrados();
                    break;
                case "5":
                    this.removerVeiculo();
                    break;
                case "6":
                    subMenuContinues = false;
                    break;
                default: console.log("Opção inválida.");
            }
        }
    }
    cadastrarVeiculo() {
        console.log("\n=== Cadastro de Veículo para Cliente ===");
        if (this.controller.getClientesCadastrados() === 0) {
            console.log("Não há clientes cadastrados no sistema. Por favor, cadastre um cliente primeiro.");
            return;
        }
        const cpf = this.prompt("Digite o CPF do cliente proprietário do veículo: ");
        const clienteSelecionado = this.controller.buscarClientePorCpf(cpf);
        if (!clienteSelecionado) {
            console.log(`\nErro: Nenhum cliente encontrado com o CPF '${cpf}'. Operação cancelada.`);
            return;
        }
        console.log(`Cliente encontrado: ${clienteSelecionado.getNome()}`);
        let continuarCadastrando = true;
        while (continuarCadastrando) {
            console.log("\n-- Adicionando novo veículo --");
            const categoriaInput = this.prompt("Categoria do veículo (carro, moto, caminhao): ").toLowerCase();
            const categoria = categoriaInput;
            if (!Object.values(TipoVeiculo_1.TipoVeiculo).includes(categoria)) {
                console.log("Categoria inválida. Tente novamente.");
                continue;
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
    estacionarVeiculo() {
        console.log("\n=== Estacionar Veículo ===");
        const cliente = this.selecionarCliente();
        const dadosVeiculo = this.obterDadosVeiculo();
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
    exibirVeiculosEstacionados() {
        const veiculos = this.controller.listarVeiculosEstacionados();
        console.log("\n--- Veículos Estacionados Atualmente ---");
        if (veiculos.length === 0) {
            console.log("Nenhum veículo estacionado no momento.");
        }
        else {
            veiculos.forEach((veiculo) => {
                console.log(`- Placa: ${veiculo.getPlaca()} | Modelo: ${veiculo.getModelo()} | Cor: ${veiculo.getCor()}`);
            });
        }
    }
    exibirTodosCadastrados() {
        const veiculos = this.controller.listarTodosCadastrados();
        console.log("\n--- Todos os Veículos Cadastrados no Sistema ---");
        if (veiculos.length === 0) {
            console.log("Nenhum veículo cadastrado no sistema.");
        }
        else {
            veiculos.forEach((veiculo) => {
                const clienteNome = veiculo.getCliente() ? veiculo.getCliente().getNome() : "Sem cliente associado";
                console.log(`- Placa: ${veiculo.getPlaca()} | Modelo: ${veiculo.getModelo()} | Proprietário: ${clienteNome}`);
            });
        }
    }
}
exports.default = EstacionarVeiculoView;
