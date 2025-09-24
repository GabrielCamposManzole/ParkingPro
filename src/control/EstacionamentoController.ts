import EstacionarVeiculoService from "../service/EstacionarVeiculoService";
import EstacionarVeiculoView from "../view/EstacionarVeiculoView";
<<<<<<< HEAD
import Cadastro from "../view/Cadastro"; // Importação correta
=======
import clienteView from "../view/ClienteView";
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
import TerminalView from "../view/TerminalView";
import Cliente from "../model/Cliente";
import CadastrarClieneteService from "../service/CadastrarClineteService";
import { ClientType } from "../model/ClientType";
<<<<<<< HEAD
import Database from "../db/Database";
import Veiculo from "../model/Veiculo";

export default class EstacionamentoController {

    public database: Database = new Database();
    public estacionarVeiculoService: EstacionarVeiculoService;
    public estacionarVeiculoView: EstacionarVeiculoView;
    public cadastraCliente: Cadastro = new Cadastro(this);
    public terminalView: TerminalView;

    constructor() {
        this.estacionarVeiculoService = new EstacionarVeiculoService();
        this.estacionarVeiculoView = new EstacionarVeiculoView(this);
        // this.cadastraCliente = new CadastraCliente(this);
        this.terminalView = new TerminalView(this);

    }

    public getNewCliente(): Cliente {
        return new Cliente();
    }

    public getNewVeiculo() {
        return new Veiculo();

    }

    public listarClientes(): Cliente[] {
    return this.database.clienteDB;
}
=======
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";

import Veiculo from "../model/Veiculo";

export default class EstacionamentoController {
     public estacionarVeiculoService: EstacionarVeiculoService;
     public estacionarVeiculoView: EstacionarVeiculoView;
     public clienteView: clienteView;
     public cadastrarClienteService: CadastrarClieneteService = new CadastrarClieneteService(this);
     public terminalView: TerminalView;
     public veiculos: Veiculo[] = [];


     constructor() {
          this.estacionarVeiculoService = new EstacionarVeiculoService();
          this.estacionarVeiculoView = new EstacionarVeiculoView(this);
          this.clienteView = new clienteView(this);
          this.terminalView = new TerminalView(this);
          this.veiculos = new Array<Veiculo>();
     }

     public newCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
          const cliente = new Cliente(nome, cpf, tipo);
          return cliente;
     }

     public estacionarVeiculo(placa: string, modelo: string, cor: string, tipo: string): boolean {
          let veiculo: Veiculo;
          if (tipo === "carro") {
               veiculo = new Carro(placa, modelo, cor);
          } else if (tipo === "moto") {
               veiculo = new Moto(placa, modelo, cor);
          } else if (tipo === "caminhao") {
               veiculo = new Caminhao(placa, modelo, cor);
          } else {
               return false;
          }
          const sucesso = this.estacionarVeiculoService.estacionarVeiculo(veiculo);
          if (sucesso) {
               this.veiculos.push(veiculo);
          }
          return sucesso;
     }
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
}