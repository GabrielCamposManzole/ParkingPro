import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";
import Cadastro from "./Cadastro";
import EstacionarVeiculoView from "./EstacionarVeiculoView";

export default class TerminalView {
  private prompt: PromptSync.Prompt;
  private controller: EstacionamentoController;
  private cadastroView: Cadastro;
  private estacionarView: EstacionarVeiculoView;

  constructor(controller: EstacionamentoController) {
    this.prompt = PromptSync();
    this.controller = controller;
    this.cadastroView = new Cadastro(this.controller);
    this.estacionarView = new EstacionarVeiculoView(this.controller);
    this.exibirMenu();
  }

  public exibirMenu(): void {
    let continues: boolean = true;
    while (continues) {
      console.log("\n=== Menu do Estacionamento ===");
      console.log("1. Dashboard");
      console.log("2. Clientes");
      console.log("3. Veículos");
      console.log("4. Vagas");
      console.log("5. Gestão");
      console.log("6. Sair");

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
          this.exibirVagasDisponiveis();
          break;
        case "5":
          this.menuGestao();
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

  private menuClientes(): void {
    let subMenuContinues: boolean = true;
    while (subMenuContinues) {
      console.log("\n=== Menu de Clientes ===");
      console.log("1. Cadastrar Cliente");
      console.log("2. Listar Clientes");
      console.log("3. Voltar");
      const escolha = this.prompt("Escolha uma opção: ");
      switch (escolha) {
        case "1":
          this.cadastroView.cadastrarCliente();
          break;
        case "2":
          this.exibirClientes();
          break;
        case "3":
          subMenuContinues = false;
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }

  private menuVeiculos(): void {
    let subMenuContinues: boolean = true;
    while (subMenuContinues) {
      console.log("\n=== Menu de Veículos ===");
      console.log("1. Cadastrar Veículo");
      console.log("2. Estacionar Veículo");
      console.log("3. Listar Veículos Estacionados");
      console.log("4. Remover Veículo");
      console.log("5. Voltar");
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
          this.estacionarView.removerVeiculo();
          break;
        case "5":
          subMenuContinues = false;
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }

  private menuGestao(): void {
      console.log("\n=== Gestão ===");
      console.log("Funcionalidade em desenvolvimento...");
  }
  
  private exibirDashboard(): void {
      console.log("\n=== Dashboard ===");
      console.log("Funcionalidade em desenvolvimento...");
  }

  public exibirClientes(): void {
    const clientes = this.controller.listarClientes();
    console.log("\n=== Lista de Clientes ===");
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
    } else {
        clientes.forEach((cliente, index) => {
            console.log(`\nCliente ${index + 1}:`);
            console.log(`Nome: ${cliente.getNome()}`);
            console.log(`CPF: ${cliente.getCpf()}`);
            console.log(`Tipo: ${cliente.getTipo()}`);
        });
    }
  }

  public exibirVagasDisponiveis(): void {
    const vagas = this.controller.estacionarVeiculoService.vagasDisponiveis();
    console.log(`\nVagas disponíveis: ${vagas}`);
  }

  public exibirVeiculosEstacionados(): void {
    const veiculos = this.controller.estacionarVeiculoService.listarVeiculosEstacionados();
    console.log("\n=== Veículos Estacionados ===");
    if (veiculos.length === 0) {
      console.log("Nenhum veículo estacionado.");
    } else {
      veiculos.forEach((veiculo, index) => {
        console.log(`\nVeículo ${index + 1}:`);
        console.log(`Placa: ${veiculo.getPlaca()}`);
        console.log(`Modelo: ${veiculo.getModelo()}`);
        console.log(`Cor: ${veiculo.getCor()}`);
      });
    }
  }

}