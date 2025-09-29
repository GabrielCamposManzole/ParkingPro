import { TipoVeiculo } from "./TipoVeiculo";

export default class Vaga {
    private numero: number;
    private ocupada: boolean;
    private tipoVaga: TipoVeiculo;

    constructor(numero: number, tipoVaga: TipoVeiculo) {
        this.numero = numero;
        this.ocupada = false;
        this.tipoVaga = tipoVaga;
    }
    public getNumero(): number {
        return this.numero;
    }
    public isOcupada(): boolean {
        return this.ocupada;
    }
    public ocupar(): void {
        this.ocupada = true;
    }
    public desocupar(): void {
        this.ocupada = false;
    }
    public getTipoVaga(): TipoVeiculo {
        return this.tipoVaga;
    }
}
