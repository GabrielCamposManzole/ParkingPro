"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EstacionarVeiculoService {
    veiculosEstacionados = [];
    limiteVagas;
    constructor(limiteVagas = 100) {
        this.limiteVagas = limiteVagas;
    }
}
exports.default = EstacionarVeiculoService;
