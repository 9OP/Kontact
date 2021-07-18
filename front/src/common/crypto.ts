/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = '';
  for (let i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  const b64 = window.btoa(byteString);

  return b64;
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
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

async function wrapCryptoKey(keyToWrap: CryptoKey, password: string, format = 'pkcs8') {
  const keyMaterial = await getKeyMaterial(password);
  // const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const salt = new Uint8Array(16);
  const wrappingKey = await getKey(keyMaterial, salt);
  const iv = new Uint8Array(12);
  // const iv = window.crypto.getRandomValues(new Uint8Array(12));

  return window.crypto.subtle.wrapKey(
    format,
    keyToWrap,
    wrappingKey,
    {
      name: 'AES-GCM',
      iv,
    },
  );
}

export async function unwrapCryptoKey(keyToUnwrap: string, password: string, format = 'pkcs8', algo = 'RSA-OAEP'): Promise<CryptoKey> {
  const keyMaterial = await getKeyMaterial(password);
  const salt = new Uint8Array(16);
  const unwrappingKey = await getKey(keyMaterial, salt);
  const wrappedKeyBuffer = base64ToArrayBuffer(keyToUnwrap);
  // const ivBuffer = bytesToArrayBuffer(ivBytes);
  const iv = new Uint8Array(12);

  const unwrapped = await window.crypto.subtle.unwrapKey(
    format, // import format
    wrappedKeyBuffer, // ArrayBuffer representing key to unwrap
    unwrappingKey, // CryptoKey representing key encryption key
    { // algorithm params for key encryption key
      name: 'AES-GCM',
      iv,
    },
    { // algorithm params for key to unwrap
      name: algo, // name: 'RSA-PSS',
      length: 256,
      hash: { name: 'SHA-256' },
    },
    true, // extractability of key to unwrap
    ['encrypt', 'decrypt'], // ['sign'], // key usages for key to unwrap
  );

  return unwrapped;
}

/**
 * Generate an RSA key pair in PEM format with the private key wrapped with the password secret
 */
export async function generateKeyPair(password: string):
Promise<{ public: string, private: string}> {
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
    public: arrayBufferToBase64(publicKey), // 'public'),
    private: arrayBufferToBase64(privateKey), // 'private'),
  };
}

export async function generateKey(password: string): Promise<string> {
  // generated AES key wrapped with secret key
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
      hash: { name: 'SHA-256' },
    },
    true,
    ['encrypt', 'decrypt'],
  );

  const wrappedKey = await wrapCryptoKey(key, password, 'raw');
  return arrayBufferToBase64(wrappedKey);
  // return arrayBufferToBase64(encryptionKey);
}

export async function encryptMessage(plain: string, key: CryptoKey): Promise<string> {
  // const encryptionKey = await window.crypto.subtle.importKey(
  //   'raw',
  //   base64ToArrayBuffer(key),
  //   {
  //     name: 'AES-GCM',
  //     hash: 'SHA-256',
  //   },
  //   true,
  //   ['encrypt'],
  // );
  const encryptionKey = key;

  const enc = new TextEncoder();
  const encoded = enc.encode(plain);
  // const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const iv = new Uint8Array(12);
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    encryptionKey,
    encoded,
  );

  return arrayBufferToBase64(encrypted);
}

export async function decryptMessage(ciphertext: string, key: CryptoKey): Promise<string> {
  // const decryptionKey = await window.crypto.subtle.importKey(
  //   'raw',
  //   base64ToArrayBuffer(key),
  //   {
  //     name: 'AES-GCM',
  //     hash: 'SHA-256',
  //   },
  //   true,
  //   ['decrypt'],
  // );
  const decryptionKey = key;

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12),
    },
    decryptionKey,
    base64ToArrayBuffer(ciphertext),
  );

  const dec = new TextDecoder();
  const decoded = dec.decode(decrypted);
  return decoded;
}
