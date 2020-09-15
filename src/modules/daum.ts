import Module, { Protocol } from '../module';
import Util from '../util';

interface DaumSearchDocument { }

export type DaumSearchDocuments<D extends DaumSearchDocument> = D[];

export interface DaumSearch<D extends DaumSearchDocument> {
  meta: DaumSearchMeta;
  documents: DaumSearchDocuments<D>;
}

export interface DaumSearchMeta {
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

export interface DaumVideoDocument extends DaumSearchDocument {
  title: string;
  play_time: number;
  thumbnail: string;
  url: string;
  datetime: string;
  author: string;
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
    size: number = 10,
    page: number = 1,
    sort: SearchSorting = SearchSorting.ACCURACY
  ): Promise<DaumSearch<DaumWebDocument>> {

    const path = '/v2/search/web';
    const params = { query, page, size, sort };

    return await Util.request<DaumSearch<DaumWebDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

  public async video(
    query: string,
    size: number = 10,
    page: number = 1,
    sort: SearchSorting = SearchSorting.ACCURACY
  ): Promise<DaumSearch<DaumVideoDocument>> {

    const path = '/v2/search/vclip';
    const params = { query, page, size, sort };

    return await Util.request<DaumSearch<DaumVideoDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

}
