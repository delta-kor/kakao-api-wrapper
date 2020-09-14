import DaumModule from './modules/daum';

export default class Kakao {

  private readonly key: string;
  public readonly daum: DaumModule;

  constructor(apiKey: string) {

    this.key = apiKey;
    this.daum = new DaumModule(this.key);

  }

}
