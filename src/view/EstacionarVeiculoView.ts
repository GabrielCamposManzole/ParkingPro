import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";

export default class EstacionarVeiculoView {
  private prompt: PromptSync.Prompt;
  private controller: EstacionamentoController;

  constructor(controller: EstacionamentoController) {
    this.prompt = PromptSync();
    this.controller = controller;
  }

  public estacionarVeiculo(): void {

    console.log("\n=== Estacionar Veículo ===");
    const tipo = this.prompt("Tipo do veículo (carro/moto/caminhao): ").toLowerCase();
    if (!["carro", "moto", "caminhao"].includes(tipo)) {
      console.log("Tipo de veículo inválido. Tente novamente.");
      return;
    }
    const modelo = this.prompt("Modelo do veículo: ");
    const placa = this.prompt("Placa do veículo: ");
    const cor = this.prompt("Cor do veículo: ");




    const sucesso = this.controller.estacionarVeiculo(placa, modelo, cor, tipo);

    if (sucesso) {
      console.log(`Veículo ${placa} estacionado com sucesso!`);
    } else {
      console.log("Não há vagas disponíveis no momento.");
    }
  }

  public exibirVagasDisponiveis(): void {
    const vagas = this.controller.estacionarVeiculoService.vagasDisponiveis();
    console.log(`Vagas disponíveis: ${vagas}`);
  }
}