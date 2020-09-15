import { Protocol } from './module';
import axios, { AxiosResponse } from 'axios';

export class ApiError extends Error {

  constructor(description: string) {

    super(description);
    this.name = 'ApiError';

  }

}

export default class Util {

  public static join(protocol: Protocol, host: string, path: string): string {
    return `${protocol}://${host}${path}`;
  }

  public static reject(response: AxiosResponse): never {

    const data = response.data;
    let errorHeader;

    const status = response.status;
    if(status === 400) errorHeader = '400 Bad Request';
    if(status === 401) errorHeader = '401 Unauthorized';
    if(status === 403) errorHeader = '403 Forbidden';
    if(status === 500) errorHeader = '500 Internal Server Error';
    if(status === 502) errorHeader = '502 Bad Gateway';
    if(status === 503) errorHeader = '503 Service Unavailable';

    let error = `${data.errorType} [ ${errorHeader} ] - ${data.message}`;

    throw new ApiError(error);

  }

  public static key(apiKey: string): string {
    return `KakaoAK ${apiKey}`;
  }

  public static async request<T>(
    key: string,
    protocol: Protocol,
    host: string,
    path: string,
    params: any
  ): Promise<T> {

    const url = Util.join(protocol, host, path);

    let response: AxiosResponse;

    try {

      response = await axios.get(url, {
        params,
        headers: { 'Authorization': Util.key(key) }
      });

    } catch (e) {

      const response = e.response;
      Util.reject(response);

    }

    return response.data;

  }

}
