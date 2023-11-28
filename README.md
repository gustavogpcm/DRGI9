
# :point_right:	 API-DRGMV-FASTIFY

Um serviço que gera lote de internação e faz uma requisição SOAP 



## Documentação da API

#### Retorna todos os itens

```http
  GET /createxml
```

Pega os lotes e gera o conteúdo .txt no diretório esperado.




## Rodando localmente

Clone o projeto

```bash
  git clone [https://github.com/DataIntegraTeam/ser-marechal-txt-athena.git](https://github.com/DataIntegraTeam/api-drgmv-fastify-ghas)
```

Entre no diretório do projeto

```bash
  cd api-drgmv-fastify-ghas
```

Instale as dependências

```bash
  npm install
```

Altere o arquivo *.env.example* para *.env* e preencha os campos necessários.

O diretório do projeto deverá ter permissão de leitura e escrita, para que seja possível a criação de novas pastas dentro do diretório.

Inicie o servidor

```bash
  npm run dev
```
Após isso, basta chamar a rota GET /createxml e o lote de internação será gerado (XML) e enviado para a API SOAP.


------------------------------------------------------------------------------------------------------------------------
