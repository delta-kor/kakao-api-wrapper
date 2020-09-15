import Module, { Protocol } from '../module';
import Util from '../util';

interface MapSearchDocument { }

export type MapSearchDocuments<D extends MapSearchDocument> = D[];

export interface MapSearch<D extends MapSearchDocument> {
  meta: MapSearchMeta;
  documents: D;
}

export interface MapSearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface MapAddressDocument {
  address_name: string;
  address_type: MapAddressType;
  x: number;
  y: number;
  address: MapAddress | null;
  road_address: MapRoadAddress | null;
}

export enum MapAddressType {
  REGION = 'REGION',
  ROAD = 'ROAD',
  REGION_ADDR = 'REGION_ADDR',
  ROAD_ADDR = 'ROAD_ADDR'
}

export interface MapAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: 'Y' | 'N';
  main_address_no: string;
  sub_address_no: string;
  x: number;
  y: number;
}

export interface MapRoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: 'Y' | 'N';
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: number;
  y: number;
}

export default class MapModule extends Module {

  protected protocol = Protocol.HTTPS;
  protected host = 'dapi.kakao.com';

  constructor(apiKey: string) {

    super(apiKey);

  }

  public async address(
    query: string,
    size: number = 10,
    page: number = 1
  ): Promise<MapSearch<MapAddressDocument>> {

    const path = '/v2/local/search/address.json';
    const params = { query, page, size };

    return await Util.request<MapSearch<MapAddressDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

}
