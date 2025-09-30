import { TipoVeiculo } from "./TipoVeiculo";
import Veiculo from "./Veiculo";

export default class Vaga {
    private numero: number;
    private ocupada: boolean;
    private tipoVaga: TipoVeiculo;
    private veiculoEstacionado: Veiculo | null; // NOVO: Armazena o veículo na vaga

    constructor(numero: number, tipoVaga: TipoVeiculo) {
        this.numero = numero;
        this.ocupada = false;
        this.tipoVaga = tipoVaga;
        this.veiculoEstacionado = null; // NOVO: Inicia como nulo
    }

    public getNumero(): number {
        return this.numero;
    }

    public isOcupada(): boolean {
        return this.ocupada;
    }

    // ALTERADO: Agora recebe o veículo que está ocupando
    public ocupar(veiculo: Veiculo): void {
        this.ocupada = true;
        this.veiculoEstacionado = veiculo;
    }

    // ALTERADO: Limpa a referência ao veículo
    public desocupar(): void {
        this.ocupada = false;
        this.veiculoEstacionado = null;
    }

    public getTipoVaga(): TipoVeiculo {
        return this.tipoVaga;
    }

    // NOVO: Permite ver qual veículo está na vaga
    public getVeiculoEstacionado(): Veiculo | null {
        return this.veiculoEstacionado;
    }
}