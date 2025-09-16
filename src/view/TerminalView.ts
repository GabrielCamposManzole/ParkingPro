
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
      console.log("                     ");
      console.log("1. Dashboard");
      console.log("2. Clientes");
      console.log("3. Veículos");
      console.log("4. Vagas ");
      console.log("5. Gestão");
      console.log("6. Sair");

      const escolha = this.prompt("Escolha uma opção: ");

      switch (escolha) {
        case "1":
          console.log("Opção 1 Dashboard");
          break;
        case "2":
           this.controller.cadastraCliente.cadastrar(); 
           break;
        case "3":
          console.log("Opção 3 Veículos");
          break;  
          case "4":
          this.exibirVagasDisponiveis(50);
          break;  
          case "5":
          console.log("Opção 5 Gestão");
          break;
        case "6":
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
