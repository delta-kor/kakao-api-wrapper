export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https'
}

export default abstract class Module {

  protected abstract protocol: Protocol;
  protected abstract host: string;
  protected key: string;

  protected constructor(apiKey: string) {

    this.key = apiKey;

  }

}
