"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCti = void 0;
const cti_1 = require("../../../models/cti");
const formatDate_yyyy_mm_dd_1 = require("../../../utils/formatDate_yyyy-mm-dd");
async function buildCti(ctiItens) {
    const cti = new cti_1.Cti();
    const formatedDataInicial = (0, formatDate_yyyy_mm_dd_1.converterData)(ctiItens.DT_INICIAL_CTI);
    const formatedDataFinal = (0, formatDate_yyyy_mm_dd_1.converterData)(ctiItens.DT_FINAL_CTI);
    cti.setDataInicial(formatedDataInicial);
    cti.setDataFinal(formatedDataFinal);
    cti.setCodigoCidPrincipal(ctiItens.CD_CID_PRINCIPAL);
    cti.setCondicaoAlta(ctiItens.CONDICAO_ALTA_CTI);
    cti.setUf(ctiItens.UF_CTI);
    cti.setCrm(ctiItens.CRM_CTI);
    cti.setCodigoHospital(ctiItens.CD_HOSPITAL);
    cti.setNomeHospital(ctiItens.NM_HOSPITAL);
    cti.setTipo(ctiItens.TIPO);
    cti.setLeito(ctiItens.DS_LEITO);
    return cti;
}
exports.buildCti = buildCti;
