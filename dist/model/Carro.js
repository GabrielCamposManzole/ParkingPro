"use strict";
/* import Veiculo from './Veiculo';
import { TipoVeiculo } from './TipoVeiculo';


export default class Carro extends Veiculo {

  constructor(placa: string, modelo: string, cor: string) {
    super(placa, modelo, cor);
  }

  public getTipo(): TipoVeiculo {
    return TipoVeiculo.CARRO;
  }

  public getDescricao(): string {
    return "Carro: " + super.getDescricao() + " " + this.getTipo();
  }
  public abstract fazAlgo(): void {
  }
  public fazAlgo(n: number): void {

  }
  public fazAlgo(s: string, n: number): string {
    return s + n;
  }


} */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Veiculo_1 = __importDefault(require("./Veiculo"));
const TipoVeiculo_1 = require("./TipoVeiculo");
class Carro extends Veiculo_1.default {
    constructor(placa, modelo, cor) {
        super(placa, modelo, cor);
    }
    getTipo() {
        return TipoVeiculo_1.TipoVeiculo.CARRO;
    }
    //A IMPLEMENTAÇÃO REAL 
    fazAlgo(s, n) {
        // Cenário A: Se o primeiro argumento for número
        if (typeof s === 'number') {
            console.log(`Lógica A: Apenas o número ${s}`);
            return; // Retorna void
        }
        // Cenário B: Se o primeiro for string e o segundo número
        if (typeof s === 'string' && typeof n === 'number') {
            return `Lógica B: String "${s}" e número ${n}`;
        }
    }
}
exports.default = Carro;
