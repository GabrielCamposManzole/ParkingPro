import { TipoVeiculo } from "./TipoVeiculo";
import Veiculo from "./Veiculo";

export default class Vaga {
    private numero: number;
    private ocupada: boolean;
    private tipoVaga: TipoVeiculo;
    private veiculoEstacionado: Veiculo | null; 

    constructor(numero: number, tipoVaga: TipoVeiculo) {
        this.numero = numero;
        this.ocupada = false;
        this.tipoVaga = tipoVaga;
        this.veiculoEstacionado = null; 
    }

    public getNumero(): number {
        return this.numero;
    }

    public isOcupada(): boolean {
        return this.ocupada;
    }


    public ocupar(veiculo: Veiculo): void {
        this.ocupada = true;
        this.veiculoEstacionado = veiculo;
    }


    public desocupar(): void {
        this.ocupada = false;
        this.veiculoEstacionado = null;
    }

    public getTipoVaga(): TipoVeiculo {
        return this.tipoVaga;
    }

    public getVeiculoEstacionado(): Veiculo | null {
        return this.veiculoEstacionado;
    }
}