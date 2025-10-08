"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const EstacionarVeiculoView_1 = __importDefault(require("./EstacionarVeiculoView"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
const ClienteView_1 = __importDefault(require("./ClienteView"));
class TerminalView {
    prompt;
    controller;
    estacionarView;
    clienteView;
    constructor(controller) {
        this.prompt = (0, prompt_sync_1.default)();
        this.controller = controller;
        this.estacionarView = new EstacionarVeiculoView_1.default(this.controller);
        this.clienteView = new ClienteView_1.default(this.controller);
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
                    this.clienteView.exibirMenuClientes();
                    break;
                case "3":
                    this.estacionarView.menuVeiculos();
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
        console.log(`- Ocupação por Tipo:  Carro: ${ocupadasCarro} |  Moto: ${ocupadasMoto} |  Caminhão: ${ocupadasCaminhao}`);
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
    adicionarNovaVaga() {
        console.log("\n--- Adicionar Nova Vaga ---");
        const numeroInput = this.prompt("Digite o número da nova vaga: ");
        const numero = parseInt(numeroInput);
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
