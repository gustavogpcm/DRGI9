"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCron = void 0;
const executeProcedure_1 = require("../../utils/executeProcedure");
const enviaParcelado_1 = require("./enviaParcelado");
async function executeCron() {
    await (0, executeProcedure_1.executeProcedure)();
    await (0, enviaParcelado_1.enviaPareclado)();
}
exports.executeCron = executeCron;
