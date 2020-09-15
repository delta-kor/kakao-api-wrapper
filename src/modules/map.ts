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
  address: MapTotalAddress | null;
  road_address: MapTotalRoadAddress | null;
}

export interface MapCoordToRegionCodeDocument {
  region_type: 'H' | 'B';
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  code: string;
  x: number;
  y: number;
}

export interface MapCoordToAddressDocument {
  address: MapAddress;
  road_address: MapRoadAddress;
}

export interface MapTranscoordDocument {
  x: number;
  y: number;
}

export enum MapAddressType {
  REGION = 'REGION',
  ROAD = 'ROAD',
  REGION_ADDR = 'REGION_ADDR',
  ROAD_ADDR = 'ROAD_ADDR'
}

export enum CoordinateSystem {
  WGS84 = 'WGS84',
  WCONGNAMUL = 'WCONGNAMUL',
  CONGNAMUL = 'CONGNAMUL',
  WTM = 'WTM',
  TM = 'TM'
}

export interface MapTotalAddress {
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

export interface MapTotalRoadAddress {
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

export interface MapAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  mountain_yn: 'Y' | 'N';
  main_address_no: string;
  sub_address_no: string;
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

  public async coordToRegionCode(
    x: number,
    y: number,
    inputSystem: CoordinateSystem = CoordinateSystem.WGS84,
    outputSystem: CoordinateSystem = CoordinateSystem.WGS84
  ): Promise<MapSearch<MapCoordToRegionCodeDocument>> {

    const path = '/v2/local/geo/coord2regioncode.json';
    const params = { x, y, input_coord: inputSystem, output_coord: outputSystem };

    return await Util.request<MapSearch<MapCoordToRegionCodeDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

  public async coordToAddress(
    x: number,
    y: number,
    inputSystem: CoordinateSystem = CoordinateSystem.WGS84
  ): Promise<MapSearch<MapCoordToAddressDocument>> {

    const path = '/v2/local/geo/coord2address.json';
    const params = { x, y, input_coord: inputSystem };

    return await Util.request<MapSearch<MapCoordToAddressDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

  public async transcoord(
    x: number,
    y: number,
    inputSystem: CoordinateSystem = CoordinateSystem.WGS84,
    outputSystem: CoordinateSystem = CoordinateSystem.WGS84
  ): Promise<MapSearch<MapTranscoordDocument>> {

    const path = '/v2/local/geo/transcoord.json';
    const params = { x, y, input_coord: inputSystem, output_coord: outputSystem };

    return await Util.request<MapSearch<MapTranscoordDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

}
