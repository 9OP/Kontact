/* eslint-disable import/prefer-default-export */
import Api from './api';

const BACKEND = process.env.REACT_APP_BASE_URL as string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function backendHandler(response: Response): Promise<any> {
  const json = await response.json();
  if (!response.ok) {
    // discriminate type of errors
    // console.log(json);
    throw Error(json.description || response.statusText);
  }
  return json;
}

export const back = new Api({
  host: BACKEND,
  handler: backendHandler,
});
