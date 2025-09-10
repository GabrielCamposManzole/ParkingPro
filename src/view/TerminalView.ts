
import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";

export default class TerminalView {
  private prompt: PromptSync.Prompt;
  private controller: EstacionamentoController;

  constructor(controller: EstacionamentoController) {
    this.prompt = PromptSync();
    this.controller = controller;
    this.exibirMenu();
  }

  public exibirMenu(): void {
    let continues: boolean = true;
    while (continues) {
      console.log("\n=== Menu do Estacionamento ===");
      console.log("1. Estacionar Veículo");
      console.log("2. Retirar Veículo");
      console.log("3. Ver Vagas Disponíveis");
      console.log("4. Cadastrar Cliente Mensalista");
      console.log("5. Sair");

      const escolha = this.prompt("Escolha uma opção: ");

      switch (escolha) {
        case "1":
           this.controller.estacionarVeiculoView.fluxoEstacionar(); 
          break;
        case "2":
          console.log("Opção 2 selecionada: Retirar Veículo");
          break;
        case "3":
          console.log("Opção 3 selecionada: Ver Vagas Disponíveis");
          break;
        case "4":
          this.controller.cadastraCliente.cadastrar(); 
          break;
        case "5":
          console.log("Saindo...");
          continues = false;
          break;
        default:
          console.log("Opção inválida. Tente novamente.");
      }
    }
  }

  public exibirVagasDisponiveis(vagas: number): void {
    console.log(`Vagas disponíveis: ${vagas}`);
  }
}
