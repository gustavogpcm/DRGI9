"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCateterVascularCentral = void 0;
const cateterVascularCentral_1 = require("../../../models/cateterVascularCentral");
const formatDate_yyyy_mm_dd_1 = require("../../../utils/formatDate_yyyy-mm-dd");
/** @description build a cateter vascular central */
async function buildCateterVascularCentral(item) {
    const cateterVascularCentral = new cateterVascularCentral_1.CateterVascularCentral();
    const formatedDataFinal = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_FINAL_CATETER);
    const formatedDataInicial = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_INICIAL_CATETER);
    cateterVascularCentral.setDataFinal(formatedDataFinal);
    cateterVascularCentral.setDataInicial(formatedDataInicial);
    return cateterVascularCentral;
}
exports.buildCateterVascularCentral = buildCateterVascularCentral;
