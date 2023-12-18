"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSuporteVentilatorioFromDatabase = void 0;
const condicaoAdquiridaSuporteVentilatorio_1 = require("../../../models/condicaoAdquiridaSuporteVentilatorio");
const suporteVentilatorio_1 = require("../../../models/suporteVentilatorio");
const formatDate_yyyy_mm_dd_1 = require("../../../utils/formatDate_yyyy-mm-dd");
/** @description build a sondaVesicalDeDemora */
async function buildSuporteVentilatorioFromDatabase(item) {
    const suporteVentilatorio = new suporteVentilatorio_1.SuporteVentilatorio();
    const formatedDataFinal = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_FINAL_SUP_VENTILATORIO);
    const formatedDataInicial = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_INICIAL_SUP_VENTILATORIO);
    suporteVentilatorio.setDataFinal(formatedDataFinal);
    suporteVentilatorio.setDataInicial(formatedDataInicial);
    const condicaoAdquiridaSuporteVentilatorio = new condicaoAdquiridaSuporteVentilatorio_1.CondicaoAdquiridaSuporteVentilatorio();
    condicaoAdquiridaSuporteVentilatorio.setCodigoCondicaoAdquirida(item.CD_CONDICAO_ADQUIRIDA);
    condicaoAdquiridaSuporteVentilatorio.setDataOcorrencia(item.DT_OCORRENCIA_SUP);
    suporteVentilatorio.addCondicaoAdquiridaSuporteVentilatorio(condicaoAdquiridaSuporteVentilatorio);
    return suporteVentilatorio;
}
exports.buildSuporteVentilatorioFromDatabase = buildSuporteVentilatorioFromDatabase;
