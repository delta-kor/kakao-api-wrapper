import axios, { AxiosResponse } from 'axios';
import Module, { Protocol } from '../module';
import { SearchSorting } from '../types/daum';
import Util from '../util';

export default class DaumModule extends Module {

  protected protocol = Protocol.HTTPS;
  protected host = 'dapi.kakao.com';

  constructor(apiKey: string) {

    super(apiKey);

  }

  public async web(
    query: string,
    page: number = 1,
    size: number = 10,
    sort: SearchSorting = SearchSorting.ACCURACY
  ): Promise<any> {

    const path = '/v2/search/web';
    const url = Util.join(this.protocol, this.host, path);

    let response: AxiosResponse;

    try {

      response = await axios.get(url, {
        params: { query: encodeURI(query), page, size, sort },
        headers: { 'Authorization': Util.key(this.key) }
      });

    } catch (e) {

      const response = e.response;
      Util.reject(response);

    }

    const data = response.data;
    return data;

  }

}
