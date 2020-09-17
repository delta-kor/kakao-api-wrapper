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
  same_name?: MapRegionInfo;
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

export interface MapKeywordDocument {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: number;
  y: number;
  place_url: string;
  distance: string;
}

export interface MapCategoryDocument {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: MapCategory;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
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

export enum MapSearchSorting {
  ACCURACY = 'accuracy',
  DISTANCE = 'distance'
}

export enum MapCategory {
  MART = 'MT1',
  CONVENIENCE_STORE = 'CS2',
  PRE_SCHOOL = 'PS3',
  SCHOOL = 'SC4',
  ACADEMY = 'AC5',
  PARKING = 'PK6',
  OIL = 'OL7',
  SUBWAY = 'SW8',
  BANK = 'BK9',
  CULTURAL_FACILITY = 'CT1',
  AGENCY = '중개업소',
  PUBLIC_ENTERPRISE = 'PO3',
  ATTRACTION = 'AT4',
  ACCOMMODATION = 'AD5',
  FOOD = 'FD6',
  CAFE = 'CE7',
  HOSPITAL = 'HP8',
  PHARMACY = 'PM9'
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

export interface MapKeywordSearchParams {
  query: string;
  category?: MapCategory;
  x?: number;
  y?: number;
  radius?: number;
  rect?: string;
  page?: number;
  size?: number;
  sort?: MapSearchSorting;
}

export interface MapCategorySearchParams {
  category_group_code?: MapCategory;
  x?: string;
  y?: string;
  radius?: number;
  rect?: string;
  page?: number;
  size?: number;
  sort?: MapSearchSorting;
}

export interface MapRegionInfo {
  region: string[];
  keyword: string;
  selected_region: string;
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

  public async keyword(params: MapKeywordSearchParams): Promise<MapSearch<MapKeywordDocument>>;
  public async keyword(query: string, size?: number, page?: number): Promise<MapSearch<MapKeywordDocument>>;
  public async keyword(
    query: any,
    size: number = 10,
    page: number = 1
  ): Promise<MapSearch<MapKeywordDocument>> {

    const path = '/v2/local/search/keyword.json';
    let params: any;

    if(typeof query === 'object') {

      params = query;

    } else {

      params = {
        query, page, size
      };

    }

    return await Util.request<MapSearch<MapKeywordDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

  public async category(params: MapCategorySearchParams): Promise<MapSearch<MapCategoryDocument>>;
  public async category(
    category: MapCategory,
    x: number,
    y: number,
    radius: number,
    size: number,
    page: number
  ): Promise<MapSearch<MapCategoryDocument>>;
  public async category(
    category: any,
    x?: number,
    y?: number,
    radius?: number,
    size: number = 10,
    page: number = 1
  ): Promise<MapSearch<MapCategoryDocument>> {

    const path = '/v2/local/search/category.json';
    let params: any;

    if(typeof category === 'object') {

      params = category;

    } else {

      params = {
        category_group_code: category,
        x, y, radius, size, page
      };

    }

    return await Util.request<MapSearch<MapCategoryDocument>>(
      this.key,
      this.protocol,
      this.host,
      path, params
    );

  }

}
