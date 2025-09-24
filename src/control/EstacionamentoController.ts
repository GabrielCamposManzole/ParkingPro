import EstacionarVeiculoService from "../service/EstacionarVeiculoService";
import EstacionarVeiculoView from "../view/EstacionarVeiculoView";
import Cadastro from "../view/Cadastro"; // Importação correta
import TerminalView from "../view/TerminalView";
import Cliente from "../model/Cliente";
import { ClientType } from "../model/ClientType";
import Database from "../db/Database";

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

}