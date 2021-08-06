/* eslint-disable max-len */
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

interface KeyBundle {
  key: string,
  salt: Uint8Array,
  iv: Uint8Array,
}

async function wrapCryptoKey(keyToWrap: CryptoKey, password: string, format = 'pkcs8'): Promise<KeyBundle> {
  const keyMaterial = await getKeyMaterial(password);
  const salt = window.crypto.getRandomValues(new Uint8Array(16));

  const wrappingKey = await getKey(keyMaterial, salt);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const wrappedKey = await window.crypto.subtle.wrapKey(
    format,
    keyToWrap,
    wrappingKey,
    {
      name: 'AES-GCM',
      iv,
    },
  );

  return {
    key: arrayBufferToBase64(wrappedKey),
    salt,
    iv,
  };
}

async function unwrapCryptoKey(keyToUnwrap: KeyBundle, password: string, usages: KeyUsage[], format: string, unwrappedKeyAlgo: any): Promise<CryptoKey> {
  const { key, salt, iv } = keyToUnwrap;
  const keyMaterial = await getKeyMaterial(password);
  const unwrappingKey = await getKey(keyMaterial, salt);
  const wrappedKeyBuffer = base64ToArrayBuffer(key);

  const unwrapAlgo = {
    name: 'AES-GCM',
    iv,
  };

  const unwrapped = await window.crypto.subtle.unwrapKey(
    format, // import format
    wrappedKeyBuffer, // ArrayBuffer representing key to unwrap
    unwrappingKey, // CryptoKey representing key encryption key
    unwrapAlgo, // algorithm params for key encryption key
    unwrappedKeyAlgo, // algotounwrap
    true, // extractability of key to unwrap
    usages, // key usages for key to unwrap
  );

  return unwrapped;
}

// API
export async function generateUserEncryptionKeyPair(password: string): Promise<{ public: string, private: KeyBundle}> {
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

  const privateKeyBundle = await wrapCryptoKey(keyPair.privateKey, password, 'pkcs8');
  const publicKey = await window.crypto.subtle.exportKey(
    'spki',
    keyPair.publicKey,
  );

  return {
    public: arrayBufferToBase64(publicKey),
    private: privateKeyBundle,
  };
}

export async function generateChannelEncryptionKey(passphrase: string): Promise<KeyBundle> {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
      hash: { name: 'SHA-256' },
    },
    true,
    ['encrypt', 'decrypt'],
  );

  return wrapCryptoKey(key, passphrase, 'raw');
}

export async function unwrapChannelEncryptionKey(key: KeyBundle, password: string): Promise<string> {
  const format = 'raw';
  const usages: KeyUsage[] = ['decrypt', 'encrypt'];
  const algo = {
    name: 'AES-GCM',
  };

  const cryptoKey = await unwrapCryptoKey(key, password, usages, format, algo);
  const aesKey = await window.crypto.subtle.exportKey(
    'raw',
    cryptoKey,
  );
  return arrayBufferToBase64(aesKey);
}

export async function unwrapUserEncryptionKey(key: KeyBundle, password: string): Promise<string> {
  const format = 'pkcs8';
  const usages: KeyUsage[] = ['sign'];
  const algo = {
    name: 'RSA-PSS',
    hash: 'SHA-256',
  };

  const cryptoKey = await unwrapCryptoKey(key, password, usages, format, algo);
  const userKey = await window.crypto.subtle.exportKey(
    'pkcs8',
    cryptoKey,
  );
  return arrayBufferToBase64(userKey);
}

export interface MessageBundle {
  text: string,
  iv: Uint8Array,
}

export async function encryptMessage(plain: string, key: string): Promise<MessageBundle> {
  const encryptionKey = await window.crypto.subtle.importKey(
    'raw',
    base64ToArrayBuffer(key),
    {
      name: 'AES-GCM',
      hash: 'SHA-256',
    },
    true,
    ['encrypt'],
  );

  const enc = new TextEncoder();
  const encoded = enc.encode(plain);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    encryptionKey,
    encoded,
  );

  return {
    text: arrayBufferToBase64(encrypted),
    iv,
  };
}

export async function decryptMessage(cipher: MessageBundle, key: string): Promise<string> {
  const decryptionKey = await window.crypto.subtle.importKey(
    'raw',
    base64ToArrayBuffer(key),
    {
      name: 'AES-GCM',
      hash: 'SHA-256',
    },
    true,
    ['decrypt'],
  );
  const { text, iv } = cipher;

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    decryptionKey,
    base64ToArrayBuffer(text),
  );

  const dec = new TextDecoder();
  const decoded = dec.decode(decrypted);
  return decoded;
}

export async function publicKeyFingerprint(publicKey: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(publicKey); // encode comme (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8); // fait le condensé
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convertit le buffer en tableau d'octet
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convertit le tableau en chaîne hexadélimale

  const fingerprint = hashHex.toUpperCase().match(/.{1,4}/g); // split in packets of 2 bytes (4 hexas)
  return fingerprint?.join('-') || '';
}

// //
// //
// // Generates the default keys for back seed task
// function addNewLines(str: string) {
//   let finalString = '';
//   while (str.length > 0) {
//     finalString += `${str.substring(0, 64)}\n`;
//     str = str.substring(64);
//   }

//   return finalString;
// }

// const cryptoGenerateSeedKeys = async () => {
//   // Pass: '123456' sha256 x2
//   const pass = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';
//   const keyPair = await generateUserEncryptionKeyPair(pass);

//   console.log('public', addNewLines(keyPair.public));
//   console.log('private', addNewLines(keyPair.private.key));
//   console.log('salt', Array.from(keyPair.private.salt));
//   console.log('iv', Array.from(keyPair.private.iv));

//   const privateKey = await unwrapUserEncryptionKey(keyPair.private, pass);
//   const aesKey = await generateChannelEncryptionKey(privateKey);

//   console.log('aes', addNewLines(aesKey.key));
//   console.log('salt', Array.from(aesKey.salt));
//   console.log('iv', Array.from(aesKey.iv));
// };

// cryptoGenerateSeedKeys();
