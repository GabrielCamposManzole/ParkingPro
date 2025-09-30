import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";
import { TipoVeiculo } from "../model/TipoVeiculo";
import Cliente from "../model/Cliente";

export default class EstacionarVeiculoView {
  private prompt: PromptSync.Prompt;
  private controller: EstacionamentoController;
  
  constructor(controller: EstacionamentoController) {
    this.prompt = PromptSync();
    this.controller = controller;
  }

  public estacionarVeiculo(): void {
    console.log("\n=== Estacionar Veículo ===");

    const cliente = this.selecionarCliente();
    const dadosVeiculo = this.obterDadosVeiculo();

    
    const sucesso = this.controller.estacionarVeiculo({ 
        ...dadosVeiculo, 
        ...(cliente && { cliente: cliente })
    });

    if (sucesso) {
      console.log(`\nVeículo de placa ${dadosVeiculo.placa} estacionado com sucesso!`);
    } else {
      console.log("\nNão há vagas disponíveis no momento para este tipo de veículo.");
    }
  }

  private selecionarCliente(): Cliente | undefined {
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

  private obterDadosVeiculo() {
    const placa = this.prompt("Placa do veículo: ");
    const modelo = this.prompt("Modelo do veículo: ");
    const cor = this.prompt("Cor do veículo: ");
    
    let tipoInput = this.prompt("Tipo do veículo (carro/moto/caminhao): ").toLowerCase();
    while (!Object.values(TipoVeiculo).includes(tipoInput as TipoVeiculo)) {
        tipoInput = this.prompt("Tipo de veículo inválido. Tente novamente: ").toLowerCase();
    }
    const tipo = tipoInput as TipoVeiculo;

    return { placa, modelo, cor, tipo };
  }

  public removerVeiculo(): void {
    console.log("\n=== Remover Veículo ===");
    const placa = this.prompt("Digite a placa do veículo a ser removido: ");
    
    const sucesso = this.controller.removerVeiculo(placa);

    if (sucesso) {
      console.log(`Veículo com placa ${placa} removido com sucesso!`);
    } else {
      console.log(`Veículo com placa ${placa} não encontrado.`);
    }
  }
}