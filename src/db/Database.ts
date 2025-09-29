import Carro from "../model/Carro";
import Cliente from "../model/Cliente";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";
import Vaga from "../model/Vaga";
import { TipoVeiculo } from "../model/TipoVeiculo";

export default class Database {

   public carrosDB: Carro[] = [];
   public motosDB: Moto[] = [];
   public caminhoesDB: Caminhao[] = [];
   public clienteDB: Cliente[] = [];

   // As propriedades de vagas são agora arrays de objetos Vaga
   public vagasCarro: Vaga[] = [];
   public vagasMoto: Vaga[] = [];
   public vagasCaminhao: Vaga[] = [];
   
   constructor() {
     // Inicializa as vagas com os números e tipos definidos
     for (let i = 1; i <= 15; i++) {
        this.vagasCarro.push(new Vaga(i, TipoVeiculo.CARRO));
     }
     for (let i = 16; i <= 23; i++) {
        this.vagasMoto.push(new Vaga(i, TipoVeiculo.MOTO));
     }
     for (let i = 24; i <= 28; i++) {
        this.vagasCaminhao.push(new Vaga(i, TipoVeiculo.CAMINHAO));
     }
   }

   
}
