import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

/** @description Performs the request regardless of the configuration */
export async function makeRequest(xml: any) {
  try {
    const usuarioIAG = process.env.API_USER
    const senhaIAG = process.env.API_PASSWORD
    const wsdlUrl =
      'https://iagwebservice.sigquali.com.br/iagwebservice/importaInternacao?wsdl'

    const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.iagwebservice.sigquali.com.br/">
      <soapenv:Header/>
      <soapenv:Body>
        <ser:importaInternacao>
          <!--Optional:-->
          <xml><![CDATA[${xml}]]></xml>
          <!--Optional:-->
          <usuarioIAG>${usuarioIAG}</usuarioIAG>
          <!--Optional:-->
          <senhaIAG>${senhaIAG}</senhaIAG>
        </ser:importaInternacao>
      </soapenv:Body>
    </soapenv:Envelope>
  `

    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
    }
    const response = await axios.post(wsdlUrl, soapEnvelope, { headers })

    return response
  } catch (error) {
    return error
  }
}
