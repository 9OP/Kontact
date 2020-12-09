/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

export async function handleApiErrors(response: Response): Promise<any> {
  const json = await response.json();
  if (!response.ok) {
    // discriminate type of errors
    // console.log(json);
    throw Error(json.description || response.statusText);
  }
  return json;
}
