"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const ClientType_1 = require("../model/ClientType");
class ClienteView {
    controller;
    prompt = (0, prompt_sync_1.default)();
    constructor(controller) {
        // A View recebe a instância do Controller via Injeção de Dependência
        this.controller = controller;
    }
    /**
     * Exibe o menu principal de gerenciamento de clientes e lida com a entrada do usuário.
     */
    exibirMenuClientes() {
        let SairDoMenu = false;
        while (!SairDoMenu) {
            console.log("\n--- Menu de Clientes ---");
            console.log("1. Cadastrar novo cliente");
            console.log("2. Listar todos os clientes");
            console.log("3. Buscar cliente por CPF");
            console.log("4. Atualizar cliente");
            console.log("5. Excluir cliente");
            console.log("0. Voltar ao menu principal");
            const opcao = this.prompt("Escolha uma opção: ");
            switch (opcao) {
                case '1':
                    this.cadastrar();
                    break;
                case '2':
                    this.listar();
                    break;
                case '3':
                    this.buscarPorCpf();
                    break;
                case '4':
                    this.atualizar();
                    break;
                case '5':
                    this.excluir();
                    break;
                case '0':
                    SairDoMenu = true;
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }
    /**
     * Coleta os dados do usuário e chama o controller para cadastrar um novo cliente.
     */
    cadastrar() {
        console.log("\n=== Cadastrar Novo Cliente ===");
        const nome = this.prompt("Nome: ");
        const cpf = this.prompt("CPF: ");
        const tipoInput = this.prompt("Tipo (1-Mensalista, 2-Avulso, 3-Especial): ");
        const tipo = parseInt(tipoInput);
        // Validação simples da entrada do tipo de cliente
        if (isNaN(tipo) || !Object.values(ClientType_1.ClientType).includes(tipo)) {
            console.log("\n❌ Tipo de cliente inválido. Operação cancelada.");
            return;
        }
        try {
            // A View chama o método do Controller DIRETAMENTE
            const novoCliente = this.controller.criarCliente(nome, cpf, tipo);
            console.log(`\n✅ Cliente '${novoCliente.getNome()}' cadastrado com sucesso!`);
        }
        catch (error) {
            console.log(`\n❌ Erro ao cadastrar cliente: ${error.message}`);
        }
    }
    /**
     * Chama o controller para obter a lista de clientes e exibi-la.
     */
    listar() {
        console.log("\n=== Lista de Clientes Cadastrados ===");
        const clientes = this.controller.listarClientes();
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
            return;
        }
        clientes.forEach(cliente => {
            console.log(`- Nome: ${cliente.getNome()}, CPF: ${cliente.getCpf()}, Tipo: ${ClientType_1.ClientType[cliente.getTipo()]}`);
        });
    }
    /**
     * Pede um CPF ao usuário e chama o controller para buscar e exibir o cliente correspondente.
     */
    buscarPorCpf() {
        console.log("\n=== Buscar Cliente por CPF ===");
        const cpf = this.prompt("Digite o CPF do cliente: ");
        const cliente = this.controller.buscarClientePorCpf(cpf);
        if (cliente) {
            console.log("\n--- Cliente Encontrado ---");
            console.log(`Nome: ${cliente.getNome()}`);
            console.log(`CPF: ${cliente.getCpf()}`);
            console.log(`Tipo: ${ClientType_1.ClientType[cliente.getTipo()]}`);
        }
        else {
            console.log("\n❌ Cliente não encontrado.");
        }
    }
    /**
     * Coleta os dados e chama o controller para atualizar um cliente existente.
     */
    atualizar() {
        console.log("\n=== Atualizar Cliente ===");
        const cpf = this.prompt("Digite o CPF do cliente que deseja atualizar: ");
        // Primeiro, verifica se o cliente existe
        if (!this.controller.buscarClientePorCpf(cpf)) {
            console.log("\n❌ Cliente não encontrado. Operação cancelada.");
            return;
        }
        const novoNome = this.prompt("Novo nome: ");
        const novoTipoInput = this.prompt("Novo tipo (1-Mensalista, 2-Avulso, 3-Especial): ");
        const novoTipo = parseInt(novoTipoInput);
        try {
            const clienteAtualizado = this.controller.atualizarCliente(cpf, { nome: novoNome, tipo: novoTipo });
            if (clienteAtualizado) {
                console.log(`\n✅ Cliente '${clienteAtualizado.getNome()}' atualizado com sucesso!`);
            }
        }
        catch (error) {
            console.log(`\n❌ Erro ao atualizar cliente: ${error.message}`);
        }
    }
    /**
     * Pede um CPF e uma confirmação para chamar o controller e excluir um cliente.
     */
    excluir() {
        console.log("\n=== Excluir Cliente ===");
        const cpf = this.prompt("Digite o CPF do cliente que deseja excluir: ");
        const confirmacao = this.prompt(`Tem certeza que deseja excluir o cliente com CPF ${cpf}? (s/n): `).toLowerCase();
        if (confirmacao === 's') {
            const sucesso = this.controller.excluirCliente(cpf);
            if (sucesso) {
                console.log("\n✅ Cliente excluído com sucesso!");
            }
            else {
                console.log("\n❌ Cliente não encontrado ou não pôde ser excluído.");
            }
        }
        else {
            console.log("\nOperação cancelada.");
        }
    }
}
exports.default = ClienteView;
