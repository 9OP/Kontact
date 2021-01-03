/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

type headersType = { [key: string]: string };
type handlerType = (res: Response) => Promise<any>;
type paramsType = { route: string; payload?: any; headers?: headersType };
const methods = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};

const defaultHost = '';
const defaultHeaders: headersType = { 'Content-type': 'application/json' };
const defautlHandler: handlerType = async (res: Response) => res;
const defaultAuth = null;

class Api {
  host: string;

  headers: headersType;

  handler: handlerType;

  authorization: headersType | null;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor({
    host = defaultHost,
    headers = defaultHeaders,
    handler = defautlHandler,
    authorization = defaultAuth,
  }) {
    this.host = host;
    this.headers = headers;
    this.handler = handler;
    this.authorization = authorization;
  }

  private async request(req: string, param: paramsType): Promise<any> {
    return fetch(`${this.host}/${param.route}`, {
      method: req,
      headers: {
        ...this.headers,
        ...this.authorization,
        ...param.headers,
      },
      body: JSON.stringify(param.payload),
      credentials: 'include',
    }).then(this.handler);
  }

  async post(param: paramsType): Promise<any> {
    return this.request(
      methods.POST,
      param,
    );
  }

  async get(param: paramsType): Promise<any> {
    return this.request(
      methods.GET,
      param,
    );
  }

  async put(param: paramsType): Promise<any> {
    return this.request(
      methods.PUT,
      param,
    );
  }

  async delete(param: paramsType): Promise<any> {
    return this.request(
      methods.DELETE,
      param,
    );
  }
}

export default Api;
