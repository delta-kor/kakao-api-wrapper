import axios, { AxiosResponse } from 'axios';
import Module, { Protocol } from '../module';
import Util from '../util';

type DaumSearchDocuments<D extends DaumSearchDocument> = D[];

interface DaumSearchDocument { }

export interface DaumSearch<D extends DaumSearchDocument> {
  meta: DaumSearchMeta;
  documents: DaumSearchDocuments<D>;
}

interface DaumSearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface DaumWebDocument extends DaumSearchDocument {
  datetime: string;
  contents: string;
  title: string;
  url: string;
}

export enum SearchSorting {
  ACCURACY = 'accuracy',
  RECENCY = 'recency'
}

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
  ): Promise<DaumSearch<DaumWebDocument>> {

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

    return response.data;

  }

}
