import { FastifyInstance } from 'fastify/fastify'
import { executeProcedure } from '../../utils/executeProcedure'
import { enviaPareclado } from './enviaParcelado'

/** @description create a XML route, only for test. */
export async function createXmlRoutes(app: FastifyInstance) {
  app.get('/createxml', async () => {
    await executeProcedure()
    await enviaPareclado()
  })
}
