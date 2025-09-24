import Cliente from "./Cliente";

export default abstract class Veiculo {
  private placa: string;
  private modelo: string;
  private horaEntrada?: Date;
<<<<<<< HEAD
  private Cliente: Cliente = new Cliente();
  
  constructor(placa: string, modelo: string) {
=======
  private cor: string;

  constructor(placa: string, modelo: string, cor: string ) {
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
    this.placa = placa;
    this.modelo = modelo;
    this.cor = cor;
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

  public getCor(): string {
    return this.cor;
  }



}