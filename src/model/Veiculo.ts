export default abstract class Veiculo {
  private placa: string;
  private modelo: string;
  private horaEntrada?: Date;

  constructor(placa: string, modelo: string) {
    this.placa = placa;
    this.modelo = modelo;
  }
  public getPlaca(): string {
    return this.placa;
  }
  public getModelo(): string {
    return this.modelo;
  }
  public setHoraEntrada(hora: Date): void {
    this.horaEntrada = hora;
  }
  public getHoraEntrada(): Date | undefined {
    return this.horaEntrada;
  }


}