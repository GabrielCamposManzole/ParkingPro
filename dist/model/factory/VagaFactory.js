"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaFactory = void 0;
class VagaFactory {
    getTipoDaVaga() {
        const vaga = this.criarVaga(0);
        return vaga.getTipoVaga();
    }
}
exports.VagaFactory = VagaFactory;
