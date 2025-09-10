import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";

export default class EstacionarVeiculoView {
  private prompt: PromptSync.Prompt;
  private controller: EstacionamentoController;

  constructor(controller: EstacionamentoController) {
    this.prompt = PromptSync();
    this.controller = controller;
  }

  public fluxoEstacionar(): void {
    console.log("\n=== Estacionar Veículo ===");
    let tipoCliente = this.prompt("Tipo de cliente (1 - Mensalista, 2 - Avulso): ");
    while (tipoCliente !== "1" && tipoCliente !== "2") {
      tipoCliente = this.prompt("Opção inválida. Digite 1 para Mensalista ou 2 para Avulso: ");
    }

    let nome = "";
    let cpf = "";
    let categoria = "";
    
    if (tipoCliente === "2") { // Avulso
      console.log("\n=== Dados do Cliente Avulso ===");
      nome = this.prompt("Nome: ");
      cpf = this.prompt("CPF: ");
      categoria = this.prompt("Categoria do veículo (moto/carro/caminhao): ").toLowerCase();
    } else if (tipoCliente === "1") { // Mensalista
      console.log("\n=== Cliente Mensalista ===");
      nome = this.prompt("Nome do cliente cadastrado: ");
      cpf = this.prompt("CPF do cliente cadastrado: ");
      categoria = this.prompt("Categoria do veículo para estacionar (moto/carro/caminhao): ").toLowerCase();
    }

    while (!["moto", "carro", "caminhao"].includes(categoria)) {
      categoria = this.prompt("Categoria inválida. Digite moto, carro ou caminhao: ").toLowerCase();
    }
    const placa = this.prompt("Placa do veículo: ");
    const modelo = this.prompt("Modelo do veículo: ");

    
  }
  }

