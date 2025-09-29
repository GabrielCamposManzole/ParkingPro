import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";
import { TipoVeiculo } from "../model/TipoVeiculo";

export default class EstacionarVeiculoView {
  private prompt: PromptSync.Prompt;
  private controller: EstacionamentoController;
  
  constructor(controller: EstacionamentoController) {
    this.prompt = PromptSync();
    this.controller = controller;
  }

  public estacionarVeiculo(): void {
    console.log("\n=== Estacionar Veículo ===");

    const placa = this.prompt("Placa do veículo: ");
    const modelo = this.prompt("Modelo do veículo: ");
    const cor = this.prompt("Cor do veículo: ");
    
    let tipoInput = this.prompt("Tipo do veículo (carro/moto/caminhao): ").toLowerCase();
    while (!Object.values(TipoVeiculo).includes(tipoInput as TipoVeiculo)) {
        tipoInput = this.prompt("Tipo de veículo inválido. Tente novamente: ").toLowerCase();
    }
    const tipo = tipoInput as TipoVeiculo;

    const sucesso = this.controller.estacionarVeiculo(placa, modelo, cor, tipo);

    if (sucesso) {
      console.log(`Veículo ${placa} estacionado com sucesso!`);
    } else {
      console.log("Não há vagas disponíveis no momento.");
    }
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