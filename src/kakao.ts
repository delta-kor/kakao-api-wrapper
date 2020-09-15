import DaumModule from './modules/daum';
import MapModule from './modules/map';

export default class Kakao {

  private readonly key: string;
  public readonly daum: DaumModule;
  public readonly map: MapModule;

  constructor(apiKey: string) {

    this.key = apiKey;
    this.daum = new DaumModule(this.key);
    this.map = new MapModule(this.key);

  }

}
