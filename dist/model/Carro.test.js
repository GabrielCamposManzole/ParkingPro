"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carro_1 = __importDefault(require("./Carro"));
// 1. Instanciamos o Carro (nada de novo aqui)
const meuFusca = new Carro_1.default("ABC-1234", "Fusca", "Azul");
console.log("--- TESTANDO SOBRECARGA ---");
// ---------------------------------------------------------
// CENÁRIO A: Chamando a primeira assinatura
// fazAlgo(n: number): void
// ---------------------------------------------------------
console.log("\n1. Chamando com APENAS UM NÚMERO:");
meuFusca.fazAlgo(100);
// O console vai mostrar o log interno do método.
// ---------------------------------------------------------
// CENÁRIO B: Chamando a segunda assinatura
// fazAlgo(s: string, n: number): string
// ---------------------------------------------------------
console.log("\n2. Chamando com STRING e NÚMERO:");
const resultado = meuFusca.fazAlgo("Aceleração", 50);
console.log("Retorno do método:", resultado);
// Aqui capturamos a string retornada.
console.log("\n---------------------------");
