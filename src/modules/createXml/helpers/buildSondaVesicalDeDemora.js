"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSondaVesicalDeDemora = void 0;
const sondaVesicalDeDemora_1 = require("../../../models/sondaVesicalDeDemora");
const formatDate_yyyy_mm_dd_1 = require("../../../utils/formatDate_yyyy-mm-dd");
/** @description build a sondaVesicalDeDemora */
async function buildSondaVesicalDeDemora(item) {
    const sondaVesicalDeDemora = new sondaVesicalDeDemora_1.SondaVesicalDeDemora();
    const formatedDataFinal = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_FINAL_SONDA);
    const formatedDataInicial = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_INICIAL_SONDA);
    sondaVesicalDeDemora.setDataFinal(formatedDataFinal);
    sondaVesicalDeDemora.setDataInicial(formatedDataInicial);
    return sondaVesicalDeDemora;
}
exports.buildSondaVesicalDeDemora = buildSondaVesicalDeDemora;
