import Cliente from './Cliente';
import { TipoVeiculo } from './TipoVeiculo';

export default abstract class Veiculo {
  private placa: string;
  private modelo: string;
  private cor: string;
  private horaEntrada?: Date;
  private cliente?: Cliente;
  
  constructor(placa: string, modelo: string, cor: string) {
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

  public setCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  public getCliente(): Cliente | undefined {
      return this.cliente;
  }
  
  public abstract getTipo(): TipoVeiculo;
}