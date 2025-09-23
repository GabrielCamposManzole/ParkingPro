
import EstacionarVeiculoService from "../service/EstacionarVeiculoService";
import EstacionarVeiculoView from "../view/EstacionarVeiculoView";
import CadastraCliente from "../view/CadastraCliente";
import TerminalView from "../view/TerminalView";
import Cliente from "../model/Cliente";
import { ClientType } from "../model/ClientType";

export default class EstacionamentoController {
     
     public estacionarVeiculoService: EstacionarVeiculoService;
     public estacionarVeiculoView: EstacionarVeiculoView;
     public cadastraCliente: CadastraCliente;
     public terminalView: TerminalView;

     constructor() {
          this.estacionarVeiculoService = new EstacionarVeiculoService();
          this.estacionarVeiculoView = new EstacionarVeiculoView(this); 
          this.cadastraCliente = new CadastraCliente(this);
          this.terminalView = new TerminalView(this);
          
     }

     public newCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
          const cliente = new Cliente(nome, cpf, tipo);
          return cliente;
     }

}