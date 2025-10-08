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

  public menuVeiculos(): void {
    let subMenuContinues: boolean = true;
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
        case "1": this.cadastrarVeiculo();
          break;
        case "2": this.estacionarVeiculo();
          break;
        case "3": this.exibirVeiculosEstacionados();
          break;
        case "4": this.exibirTodosCadastrados();
          break;
        case "5": this.removerVeiculo();
          break;
        case "6": subMenuContinues = false;
          break;
        default: console.log("Opção inválida.");
      }
    }
  }


  public cadastrarVeiculo(): void {
    console.log("\n=== Cadastro de Veículo para Cliente ===");

    if (this.controller.getClientesCadastrados() === 0) {
      console.log("Não há clientes cadastrados no sistema. Por favor, cadastre um cliente primeiro.");
      return;
    }

    const cpf = this.prompt("Digite o CPF do cliente proprietário do veículo: ");
    const clienteSelecionado = this.controller.buscarClientePorCpf(cpf);

    if (!clienteSelecionado) {
      console.log(`\nErro: Nenhum cliente encontrado com o CPF '${cpf}'. Operação cancelada.`);
      return;
    }

    console.log(`Cliente encontrado: ${clienteSelecionado.getNome()}`);

    let continuarCadastrando = true;
    while (continuarCadastrando) {
      console.log("\n-- Adicionando novo veículo --");
      const categoriaInput = this.prompt("Categoria do veículo (carro, moto, caminhao): ").toLowerCase();
      const categoria = categoriaInput as TipoVeiculo;

      if (!Object.values(TipoVeiculo).includes(categoria)) {
        console.log("Categoria inválida. Tente novamente.");
        continue;
      }

      const placa = this.prompt("Placa do veículo: ");
      const modelo = this.prompt("Modelo do veículo: ");
      const cor = this.prompt("Cor do veículo: ");

      switch (categoria) {
        case TipoVeiculo.CARRO:
          this.controller.criarCarro(placa, modelo, cor, clienteSelecionado);
          break;
        case TipoVeiculo.MOTO:
          this.controller.criarMoto(placa, modelo, cor, clienteSelecionado);
          break;
        case TipoVeiculo.CAMINHAO:
          this.controller.criarCaminhao(placa, modelo, cor, clienteSelecionado);
          break;
      }

      console.log(`\nVeículo de placa ${placa} cadastrado com sucesso para ${clienteSelecionado.getNome()}!`);

      const resposta = this.prompt("Deseja cadastrar outro veículo para este mesmo cliente? (S/N): ").toUpperCase();
      if (resposta !== 'S') {
        continuarCadastrando = false;
      }
    }
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

  private exibirVeiculosEstacionados(): void {
    const veiculos = this.controller.listarVeiculosEstacionados();
    console.log("\n--- Veículos Estacionados Atualmente ---");
    if (veiculos.length === 0) {
      console.log("Nenhum veículo estacionado no momento.");
    } else {
      veiculos.forEach((veiculo) => {
        console.log(`- Placa: ${veiculo.getPlaca()} | Modelo: ${veiculo.getModelo()} | Cor: ${veiculo.getCor()}`);
      });
    }
  }

  private exibirTodosCadastrados(): void {
    const veiculos = this.controller.listarTodosCadastrados();
    console.log("\n--- Todos os Veículos Cadastrados no Sistema ---");
    if (veiculos.length === 0) {
      console.log("Nenhum veículo cadastrado no sistema.");
    } else {
      veiculos.forEach((veiculo) => {
        const clienteNome = veiculo.getCliente() ? veiculo.getCliente()!.getNome() : "Sem cliente associado";
        console.log(`- Placa: ${veiculo.getPlaca()} | Modelo: ${veiculo.getModelo()} | Proprietário: ${clienteNome}`);
      });
    }
  }
}