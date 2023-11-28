import { executeProcedure } from '../../utils/executeProcedure'
import { enviaPareclado } from './enviaParcelado'

export async function executeCron() {
  await executeProcedure()
  await enviaPareclado()
}
