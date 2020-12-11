/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

type headersType = {[key: string]: string};
type handlerType = (res: Response) => Promise<any>;
type paramsType = {route: string, payload?: any, headers?: headersType}

class Api {
  host: string;

  headers: headersType;

  handler: handlerType

  constructor(host: string, headers: headersType, handler: handlerType) {
    this.host = host;
    this.headers = headers;
    this.handler = handler;
  }

  async post(param: paramsType): Promise<any> {
    return fetch(`${this.host}/${param.route}`, {
      method: 'post',
      headers: {
        ...this.headers,
        ...param.headers,
      },
      body: JSON.stringify(param.payload),
    }).then(this.handler);
  }

  async get(param: paramsType): Promise<any> {
    return fetch(`${this.host}/${param.route}`, {
      method: 'get',
      headers: {
        ...this.headers,
        ...param.headers,
      },
      body: JSON.stringify(param.payload),
    }).then(this.handler);
  }

  async put(param: paramsType): Promise<any> {
    return fetch(`${this.host}/${param.route}`, {
      method: 'put',
      headers: {
        ...this.headers,
        ...param.headers,
      },
      body: JSON.stringify(param.payload),
    }).then(this.handler);
  }

  async delete(param: paramsType): Promise<any> {
    return fetch(`${this.host}/${param.route}`, {
      method: 'delete',
      headers: {
        ...this.headers,
        ...param.headers,
      },
      body: JSON.stringify(param.payload),
    }).then(this.handler);
  }
}

/**
  * Backend Api
 */
const BACKEND = process.env.REACT_APP_BASE_URL as string;

export async function backendHandler(response: Response): Promise<any> {
  const json = await response.json();
  if (!response.ok) {
    // discriminate type of errors
    // console.log(json);
    throw Error(json.description || response.statusText);
  }
  return json;
}

export const back = new Api(
  BACKEND,
  { 'Content-type': 'application/json' },
  backendHandler,
);
