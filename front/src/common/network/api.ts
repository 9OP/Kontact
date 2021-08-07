/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { emit, toast } from '../../components/toast';
import { store } from '../../store';
import { resetUserAction } from '../../store/authentication/auth.actions';
import LES from '../localStorage';

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
      credentials: 'include', // include cookies
    }).then(this.handler.bind(this));
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

/**
 * Backend API
 */
const BACKEND = `${window.location.origin}/api/back`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function backendHandler(this: Api, response: Response): Promise<any> {
  const json = await response.json();
  if (!response.ok) {
    switch (json.app_code) {
      case 421: // UNAUTHORIZED - token expired
        LES.clear();
        this.authorization = null;
        store.dispatch(resetUserAction());
        emit(toast.auth_token_expired());
        break;

      default:
        throw Error(json.description || response.statusText);
    }
  }
  return json;
}

export const back = new Api({
  host: BACKEND,
  handler: backendHandler,
});

/**
 * Bearer API
 */
const BEARER = `${window.location.origin}/api/bearer`;

async function bearerHandler(this: Api, response: Response): Promise<any> {
  const json = await response.json();
  if (!response.ok) {
    throw Error(json.description || response.statusText);
  }
  return json;
}

export const bearer = new Api({
  host: BEARER,
  handler: bearerHandler,
});

/**
 * Beacon  API
 */
const BEACON = `${window.location.origin}/api/beacon`;

async function beaconHandler(this: Api, response: Response): Promise<any> {
  const json = await response.json();
  if (!response.ok) {
    throw Error(json.description || response.statusText);
  }
  return json;
}

export const beacon = new Api({
  host: BEACON,
  handler: beaconHandler,
});
