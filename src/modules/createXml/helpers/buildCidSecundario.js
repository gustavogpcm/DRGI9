"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCidSecundario = void 0;
const cidSecundario_1 = require("../../../models/cidSecundario");
/** @description CidSecundario builder, recive a item of itens in the select, return a CidSecundario */
async function buildCidSecundario(cidItens) {
    const cidSecundario = new cidSecundario_1.CidSecundario();
    cidSecundario.setCidSecundario(cidItens.CD_CID_SECUNDARIO);
    return cidSecundario;
}
exports.buildCidSecundario = buildCidSecundario;
