import CryptoJS from 'crypto-js';

const TOKEN = 'kontact-auth-bearer';

function enc(message: string, secret: string): string {
  const b64 = CryptoJS.AES.encrypt(message, secret).toString();
  const e64 = CryptoJS.enc.Base64.parse(b64);
  const eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
}

function dec(cipher: string, secret: string): string {
  const reb64 = CryptoJS.enc.Hex.parse(cipher);
  const bytes = reb64.toString(CryptoJS.enc.Base64);
  const decrypt = CryptoJS.AES.decrypt(bytes, secret);
  const plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
}

export function getToken(key: string): string {
  const cipher = localStorage.getItem(TOKEN) || '';
  return dec(cipher, key);
}

export function saveToken(token: string, key: string): void {
  const encrypted = enc(token, key);
  localStorage.setItem(TOKEN, encrypted);
}

export function clearToken(): void {
  localStorage.setItem(TOKEN, '');
}
