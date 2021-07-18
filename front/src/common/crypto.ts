/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = '';
  for (let i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  const b64 = window.btoa(byteString);

  return b64;
}

function addNewLines(str: string) {
  let finalString = '';
  while (str.length > 0) {
    finalString += `${str.substring(0, 64)}\n`;
    str = str.substring(64);
  }

  return finalString;
}

function toPem(key: ArrayBuffer, domain: 'public' | 'private') {
  const b64 = addNewLines(arrayBufferToBase64(key));
  const pem = domain === 'public'
    ? `-----BEGIN PUBLIC KEY-----\n${b64}-----END PUBLIC KEY-----`
    : `-----BEGIN PRIVATE KEY-----\n${b64}-----END PRIVATE KEY-----`;
  return pem;
}

/*
Get some key material to use as input to the deriveKey method.
The key material is a password supplied by the user.
*/
function getKeyMaterial(password: string) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );
}

/*
Given some key material and some random salt
derive an AES-GCM key using PBKDF2.
*/
function getKey(keyMaterial: CryptoKey, salt: Uint8Array) {
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );
}

async function wrapCryptoKey(keyToWrap: CryptoKey, password: string) {
  // get the key encryption key
  const keyMaterial = await getKeyMaterial(password);
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const wrappingKey = await getKey(keyMaterial, salt);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  return window.crypto.subtle.wrapKey(
    'pkcs8',
    keyToWrap,
    wrappingKey,
    {
      name: 'AES-GCM',
      iv,
    },
  );
}

/**
 * Generate an RSA key pair in PEM format with the private key wrapped with the password secret
 */
const generateKeyPair = async (password: string): Promise<{ public: string, private: string}> => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: 'SHA-256' },
    },
    true,
    ['encrypt', 'decrypt'],
  );

  const privateKey = await wrapCryptoKey(keyPair.privateKey, password);

  const publicKey = await window.crypto.subtle.exportKey(
    'spki',
    keyPair.publicKey,
  );

  return {
    public: toPem(publicKey, 'public'),
    private: toPem(privateKey, 'private'),
  };
};

export default generateKeyPair;

// todo:
// unwrap private key
// encrypt / decrypt
