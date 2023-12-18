"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createXmlParams = exports.createXmlRoutes = void 0;
const executeProcedure_1 = require("../../utils/executeProcedure");
const enviaParcelado_1 = require("./enviaParcelado");
const admissionSend_1 = require("./admissionSend");
const database_1 = __importDefault(require("../../config/database"));
const zod_1 = require("zod");
/** @description create a XML route, only for test. */
async function createXmlRoutes(app) {
    app.get('/createxml', async () => {
        await (0, executeProcedure_1.executeProcedure)();
        await (0, enviaParcelado_1.enviaPareclado)();
    });
}
exports.createXmlRoutes = createXmlRoutes;
async function createXmlParams(app) {
    app.get('/createxml/:nr_atendimento', async (request, reply) => {
        const createXmlParamsSchema = zod_1.z.object({
            nr_atendimento: zod_1.z.coerce.number(),
        });
        const { nr_atendimento } = createXmlParamsSchema.parse(request.params);
        const dataAtendimentoFromDatabase = await database_1.default
            .select('*')
            .from('INOVEMED.TBL_INM_ATENDIMENTO')
            .where({ TP_STATUS: 'A', NR_ATENDIMENTO: nr_atendimento })
            .orderBy('SITUACAO_INTERNACAO', 'ASC');
        if (!dataAtendimentoFromDatabase[0]) {
            console.log('NENHUM DADO ENCONTRADO.');
            return reply.send({ message: 'Nenhum dado encontrado' });
        }
        await (0, admissionSend_1.admission)(dataAtendimentoFromDatabase);
        return reply.send({ message: 'Envio realizado.' });
    });
}
exports.createXmlParams = createXmlParams;
