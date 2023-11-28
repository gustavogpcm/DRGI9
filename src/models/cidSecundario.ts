export class CidSecundario {
  private cidSecundario: string

  constructor() {
    this.cidSecundario = ''
  }

  public setCidSecundario(cidSecundario) {
    this.cidSecundario = cidSecundario
  }

  public getData(): object {
    return {
      cidSecundario: this.cidSecundario,
    }
  }
}
