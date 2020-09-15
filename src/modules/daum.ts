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
  title: string;
  contents: string;
  url: string;
  datetime: string;
}

export interface DaumVideoDocument extends DaumSearchDocument {
  title: string;
  url: string;
  datetime: string;
  play_time: number;
  thumbnail: string;
  author: string;
}

export interface DaumImageDocument extends DaumSearchDocument {
  collection: string;
  thumbnail_url: string;
  image_url: string;
  width: number;
  height: number;
  display_sitename: string;
  doc_url: string;
  datetime: string;
}

export interface DaumBlogDocument extends DaumSearchDocument {
  title: string;
  contents: string;
  url: string;
  blogname: string;
  thumbnail: string;
  datetime: string;
}

export interface DaumBookDocument extends DaumSearchDocument {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface DaumCafeDocument extends DaumSearchDocument {
  title: string;
  contents: string;
  url: string;
  cafename: string;
  thumbnail: string;
  datetime: string;
}

export enum DaumSearchSorting {
  ACCURACY = 'accuracy',
  RECENCY = 'recency'
}

export enum DaumBookSearchTarget {
  TITLE = 'title',
  ISBN = 'isbn',
  PUBLISHER = 'publisher',
  PERSON = 'person'
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
    sort: DaumSearchSorting = DaumSearchSorting.ACCURACY
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
    sort: DaumSearchSorting = DaumSearchSorting.ACCURACY
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

  public async image(
    query: string,
    size: number = 10,
    page: number = 1,
    sort: DaumSearchSorting = DaumSearchSorting.ACCURACY
  ): Promise<DaumSearch<DaumImageDocument>> {

    const path = '/v2/search/image';
    const params = { query, page, size, sort };

    return await Util.request<DaumSearch<DaumImageDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

  public async blog(
    query: string,
    size: number = 10,
    page: number = 1,
    sort: DaumSearchSorting = DaumSearchSorting.ACCURACY
  ): Promise<DaumSearch<DaumBlogDocument>> {

    const path = '/v2/search/blog';
    const params = { query, page, size, sort };

    return await Util.request<DaumSearch<DaumBlogDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

  public async book(
    query: string,
    size: number = 10,
    page: number = 1,
    sort: DaumSearchSorting = DaumSearchSorting.ACCURACY,
    target: DaumBookSearchTarget = DaumBookSearchTarget.TITLE
  ): Promise<DaumSearch<DaumBookDocument>> {

    const path = '/v3/search/book';
    const params = { query, page, size, sort, target };

    return await Util.request<DaumSearch<DaumBookDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

  public async cafe(
    query: string,
    size: number = 10,
    page: number = 1,
    sort: DaumSearchSorting = DaumSearchSorting.ACCURACY
  ): Promise<DaumSearch<DaumCafeDocument>> {

    const path = '/v2/search/cafe';
    const params = { query, page, size, sort };

    return await Util.request<DaumSearch<DaumCafeDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

}
