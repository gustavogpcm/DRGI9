"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviaPareclado = void 0;
const database_1 = __importDefault(require("../../config/database"));
const admissionSend_1 = require("./admissionSend");
async function enviaPareclado() {
    const dataAtendimentoFromDatabase = await database_1.default
        .select('*')
        .from('INOVEMED.TBL_INM_ATENDIMENTO')
        .where({ TP_STATUS: 'A' })
        .orderBy('SITUACAO_INTERNACAO', 'ASC');
    if (!dataAtendimentoFromDatabase[0]) {
        console.log('NENHUM DADO ENCONTRADO.');
        return;
    }
    console.log('FEZ O SELECT DE ' + dataAtendimentoFromDatabase.length + ' INTERNACOES');
    let qtdSelecionada = dataAtendimentoFromDatabase.length;
    if (qtdSelecionada <= 15) {
        await (0, admissionSend_1.admission)(dataAtendimentoFromDatabase);
    }
    else {
        while (qtdSelecionada > 0) {
            const dataAtendimentoFromDatabase = await database_1.default
                .select('*')
                .from('INOVEMED.TBL_INM_ATENDIMENTO')
                .where({ TP_STATUS: 'A' })
                .orderBy('SITUACAO_INTERNACAO', 'ASC')
                .limit(15);
            await (0, admissionSend_1.admission)(dataAtendimentoFromDatabase);
            qtdSelecionada -= dataAtendimentoFromDatabase.length;
            console.log('FALTAM ' + qtdSelecionada + ' INTERNAÇOES');
        }
    }
}
exports.enviaPareclado = enviaPareclado;
