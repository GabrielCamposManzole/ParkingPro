import Carro from "../model/Carro";
import Cliente from "../model/Cliente";

export default class Database{

   public carrosDB: Carro[] = []; // para armazenar cadastros
   public clienteDB: Cliente[] = []; //para armazenar cliente
   public vagasCarro: number = 20;
   public vagasMoto: number = 10;
   public vagasCaminhao: number = 5;

}