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

async function getKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

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

// API
export async function generateUEK(): Promise<{ puek: string, suek: string}> {
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

  const publicKey = await window.crypto.subtle.exportKey(
    'spki',
    keyPair.publicKey,
  );

  const privateKey = await window.crypto.subtle.exportKey(
    'pkcs8',
    keyPair.privateKey,
  );

  return {
    puek: arrayBufferToBase64(publicKey),
    suek: arrayBufferToBase64(privateKey),
  };
}

export async function wrapSUEK(key: string, passphrase: string): Promise<KeyBundle> {
  const suek = await crypto.subtle.importKey(
    'pkcs8',
    base64ToArrayBuffer(key),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt'],
  );

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const wrappingKey = await getKey(passphrase, salt);
  const wrapAlgo = { name: 'AES-GCM', iv };

  const result = await window.crypto.subtle.wrapKey(
    'pkcs8',
    suek,
    wrappingKey,
    wrapAlgo,
  );

  return {
    key: arrayBufferToBase64(result),
    salt,
    iv,
  };
}

export async function unwrapSUEK(keyBundle: KeyBundle, passphrase: string): Promise<string> {
  const { key, salt, iv } = keyBundle;
  const unwrappingKey = await getKey(passphrase, salt);

  const unwrapped = await window.crypto.subtle.unwrapKey(
    'pkcs8',
    base64ToArrayBuffer(key),
    unwrappingKey,
    { name: 'AES-GCM', iv },
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    true,
    ['decrypt'],
  );

  const exportKey = await window.crypto.subtle.exportKey('pkcs8', unwrapped);
  return arrayBufferToBase64(exportKey);
}

export async function generateCEK(): Promise<string> {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );
  const exportKey = await window.crypto.subtle.exportKey('raw', key);
  return arrayBufferToBase64(exportKey);
}

export async function wrapCEK(key: string, publicKey: string): Promise<string> {
  const wrappingKey = await crypto.subtle.importKey(
    'spki',
    base64ToArrayBuffer(publicKey),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['wrapKey'],
  );

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    base64ToArrayBuffer(key),
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt'],
  );

  const result = await crypto.subtle.wrapKey(
    'raw',
    cryptoKey,
    wrappingKey,
    { name: 'RSA-OAEP' },
  );

  return arrayBufferToBase64(result);
}

export async function unwrapCEK(key: string, privateKey: string): Promise<string> {
  const unwrappingKey = await crypto.subtle.importKey(
    'pkcs8',
    base64ToArrayBuffer(privateKey),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['unwrapKey'],
  );

  const cryptoKey = await crypto.subtle.unwrapKey(
    'raw',
    base64ToArrayBuffer(key),
    unwrappingKey,
    { name: 'RSA-OAEP' },
    { name: 'AES-GCM' },
    true,
    ['decrypt', 'encrypt'],
  );

  const exportKey = await window.crypto.subtle.exportKey('raw', cryptoKey);
  return arrayBufferToBase64(exportKey);
}

export interface MessageBundle {
  text: string,
  iv: Uint8Array,
}

export async function encryptMessage(plain: string, key: string): Promise<MessageBundle> {
  const encryptionKey = await window.crypto.subtle.importKey(
    'raw',
    base64ToArrayBuffer(key),
    { name: 'AES-GCM' },
    true,
    ['encrypt'],
  );

  const enc = new TextEncoder();
  const encoded = enc.encode(plain);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
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
    { name: 'AES-GCM' },
    true,
    ['decrypt'],
  );
  const { text, iv } = cipher;

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
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

// Generates the default keys for back seed task
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

// Demo function - verify the API is not broken
// async function cryptoDemo() {
//   const password = '123456';

//   const { puek, suek } = await generateUEK();
//   console.log('suek', suek);
//   console.log('puek', puek);

//   const wrappedSUEK = await wrapSUEK(suek, password);
//   const unwrappedSUEK = await unwrapSUEK(wrappedSUEK, password);

//   console.log('wrappedSUEK', wrappedSUEK);
//   console.log('unwrappedSUEK', unwrappedSUEK);
//   console.log('suek == unwrappedSUEK', suek === unwrappedSUEK);

//   const cek = await generateCEK();
//   const wrappedCEK = await wrapCEK(cek, puek);
//   const unwrappedCEK = await unwrapCEK(wrappedCEK, suek);
//   console.log('cek:', cek);
//   console.log('wrappedCEK:', wrappedCEK);
//   console.log('unwrappedCEK:', unwrappedCEK);
//   console.log('CEK == unwrappedCEK', cek === unwrappedCEK);

//   const message = 'Hello world, here is a secret: 🌸';
//   const cipher = await encryptMessage(message, cek);
//   const plain = await decryptMessage(cipher, cek);

//   console.log('cipher', cipher);
//   console.log('plain', plain);
//   console.log('message == plain', message === plain);
// }
