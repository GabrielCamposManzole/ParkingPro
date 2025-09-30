"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Cadastro_1 = __importDefault(require("./Cadastro"));
const EstacionarVeiculoView_1 = __importDefault(require("./EstacionarVeiculoView"));
const ClientType_1 = require("../model/ClientType");
const TipoVeiculo_1 = require("../model/TipoVeiculo");
class TerminalView {
    prompt;
    controller;
    cadastroView;
    estacionarView;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
        this.cadastroView = new Cadastro_1.default(this.controller);
        this.estacionarView = new EstacionarVeiculoView_1.default(this.controller);
    }
    exibirMenu() {
        let continues = true;
        while (continues) {
            console.log("\n\n=============== MENU PRINCIPAL ===============");
            console.log("1. Dashboard (Visão Geral)");
            console.log("2. Menu de Clientes");
            console.log("3. Menu de Veículos");
            console.log("4. Status das Vagas");
            console.log("5. Gestão do Estacionamento");
            console.log("6. Sair");
            console.log("============================================");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.exibirDashboard();
                    break;
                case "2":
                    this.menuClientes();
                    break;
                case "3":
                    this.menuVeiculos();
                    break;
                case "4":
                    this.exibirStatusVagas();
                    break;
                case "5":
                    this.menuGestao();
                    break;
                case "6":
                    console.log("Saindo do sistema...");
                    continues = false;
                    break;
                default: console.log("Opção inválida. Tente novamente.");
            }
        }
    }
    menuClientes() {
        let subMenuContinues = true;
        while (subMenuContinues) {
            console.log("\n--- Menu de Clientes ---");
            console.log("1. Cadastrar Novo Cliente");
            console.log("2. Listar Todos os Clientes");
            console.log("3. Detalhar Cliente (por CPF)");
            console.log("4. Atualizar Cliente (por CPF)");
            console.log("5. Excluir Cliente (por CPF)");
            console.log("6. Voltar ao Menu Principal");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.cadastroView.cadastrarCliente();
                    break;
                case "2":
                    this.exibirClientes();
                    break;
                case "3":
                    this.detalharCliente();
                    break;
                case "4":
                    this.atualizarCliente();
                    break;
                case "5":
                    this.excluirCliente();
                    break;
                case "6":
                    subMenuContinues = false;
                    break;
                default: console.log("Opção inválida.");
            }
        }
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
                    this.cadastroView.cadastrarVeiculo();
                    break;
                case "2":
                    this.estacionarView.estacionarVeiculo();
                    break;
                case "3":
                    this.exibirVeiculosEstacionados();
                    break;
                case "4":
                    this.exibirTodosCadastrados();
                    break;
                case "5":
                    this.estacionarView.removerVeiculo();
                    break;
                case "6":
                    subMenuContinues = false;
                    break;
                default: console.log("Opção inválida.");
            }
        }
    }
    menuGestao() {
        let subMenuContinues = true;
        while (subMenuContinues) {
            console.log("\n--- Gestão do Estacionamento ---");
            console.log("1. Adicionar Nova Vaga");
            console.log("2. Voltar");
            const escolha = this.prompt("Escolha uma opção: ");
            switch (escolha) {
                case "1":
                    this.adicionarNovaVaga();
                    break;
                case "2":
                    subMenuContinues = false;
                    break;
                default: console.log("Opção inválida.");
            }
        }
    }
    exibirDashboard() {
        console.log("\n=============== DASHBOARD ===============");
        const total = this.controller.getVagasTotais();
        const ocupadas = this.controller.getVagasOcupadas();
        const livres = total - ocupadas;
        console.log(`Vagas: ${ocupadas} Ocupadas | ${livres} Livres | ${total} Totais`);
        const ocupadasCarro = this.controller.getVagasOcupadasPorTipo(TipoVeiculo_1.TipoVeiculo.CARRO);
        const ocupadasMoto = this.controller.getVagasOcupadasPorTipo(TipoVeiculo_1.TipoVeiculo.MOTO);
        const ocupadasCaminhao = this.controller.getVagasOcupadasPorTipo(TipoVeiculo_1.TipoVeiculo.CAMINHAO);
        console.log(`- Ocupação por Tipo: 🚗 Carro: ${ocupadasCarro} | 🏍️ Moto: ${ocupadasMoto} | 🚚 Caminhão: ${ocupadasCaminhao}`);
        console.log(`Clientes Cadastrados: ${this.controller.getClientesCadastrados()}`);
        console.log(`Veículos Estacionados: ${this.controller.listarVeiculosEstacionados().length}`);
        console.log("=========================================");
    }
    exibirStatusVagas() {
        console.log("\n--- Status Detalhado das Vagas ---");
        const tipos = [TipoVeiculo_1.TipoVeiculo.CARRO, TipoVeiculo_1.TipoVeiculo.MOTO, TipoVeiculo_1.TipoVeiculo.CAMINHAO];
        tipos.forEach(tipo => {
            console.log(`\n-- Vagas para ${tipo.toUpperCase()} --`);
            const vagas = this.controller.getVagasPorTipo(tipo);
            if (vagas.length === 0) {
                console.log("Nenhuma vaga deste tipo.");
                return;
            }
            vagas.forEach(vaga => {
                const status = vaga.isOcupada() ? `OCUPADA (Veículo: ${vaga.getVeiculoEstacionado()?.getPlaca()})` : "LIVRE";
                console.log(`Vaga N° ${vaga.getNumero()}: ${status}`);
            });
        });
    }
    exibirClientes() {
        const clientes = this.controller.listarClientes();
        console.log("\n--- Lista de Clientes ---");
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
        }
        else {
            clientes.forEach((cliente, index) => {
                console.log(`${index + 1}. Nome: ${cliente.getNome()}, CPF: ${cliente.getCpf()}`);
            });
        }
    }
    detalharCliente() {
        const cpf = this.prompt("Digite o CPF do cliente para ver os detalhes: ");
        const cliente = this.controller.buscarClientePorCpf(cpf);
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }
        console.log("\n--- Detalhes do Cliente ---");
        console.log(`Nome: ${cliente.getNome()}`);
        console.log(`CPF: ${cliente.getCpf()}`);
        console.log(`Tipo: ${ClientType_1.ClientType[cliente.getTipo()]}`);
        const veiculos = this.controller.buscarVeiculosPorCliente(cliente.getCpf());
        if (veiculos.length > 0) {
            console.log("Veículos Cadastrados:");
            veiculos.forEach(v => console.log(`- Placa: ${v.getPlaca()}, Modelo: ${v.getModelo()}`));
        }
        else {
            console.log("Nenhum veículo cadastrado para este cliente.");
        }
    }
    atualizarCliente() {
        const cpf = this.prompt("Digite o CPF do cliente que deseja atualizar: ");
        const cliente = this.controller.buscarClientePorCpf(cpf);
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }
        const novoNome = this.prompt(`Novo nome (Deixe em branco para manter '${cliente.getNome()}'): `) || cliente.getNome();
        const novoTipoInput = this.prompt(`Novo tipo (1-Mensalista, 2-Avulso, 3-Especial | Deixe em branco para manter '${ClientType_1.ClientType[cliente.getTipo()]}'): `);
        let novoTipo = cliente.getTipo();
        if (novoTipoInput) {
            novoTipo = parseInt(novoTipoInput);
        }
        const atualizado = this.controller.atualizarCliente(cpf, { nome: novoNome, tipo: novoTipo });
        if (atualizado) {
            console.log("Cliente atualizado com sucesso!");
        }
        else {
            console.log("Falha ao atualizar o cliente.");
        }
    }
    excluirCliente() {
        const cpf = this.prompt("Digite o CPF do cliente que deseja excluir: ");
        if (!this.controller.buscarClientePorCpf(cpf)) {
            console.log("Cliente não encontrado.");
            return;
        }
        const confirmacao = this.prompt(`Tem certeza que deseja excluir o cliente com CPF ${cpf}? (S/N): `).toUpperCase();
        if (confirmacao === 'S') {
            const excluido = this.controller.excluirCliente(cpf);
            if (excluido) {
                console.log("Cliente excluído com sucesso.");
            }
            else {
                console.log("Falha ao excluir o cliente.");
            }
        }
        else {
            console.log("Operação cancelada.");
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
    adicionarNovaVaga() {
        console.log("\n--- Adicionar Nova Vaga ---");
        const numeroInput = this.prompt("Digite o número da nova vaga: ");
        const numero = parseInt(numeroInput);
        if (isNaN(numero) || numero <= 0) {
            console.log("Número de vaga inválido.");
            return;
        }
        const tipoInput = this.prompt("Digite o tipo da vaga (carro, moto, caminhao): ").toLowerCase();
        if (!Object.values(TipoVeiculo_1.TipoVeiculo).includes(tipoInput)) {
            console.log("Tipo de vaga inválido.");
            return;
        }
        const sucesso = this.controller.addVaga(tipoInput, numero);
        if (sucesso) {
            console.log("Vaga adicionada com sucesso!");
        }
        else {
            console.log("Não foi possível adicionar a vaga (talvez o número já exista?).");
        }
    }
}
exports.default = TerminalView;
