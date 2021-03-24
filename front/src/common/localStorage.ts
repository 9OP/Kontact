/* eslint-disable class-methods-use-this */
import CryptoJS from 'crypto-js';

class LocalEncryptedStorage {
  #secret = 'secret'

  key(secret: string) {
    this.#secret = secret;
  }

  private encrypt(value: string): string {
    const b64 = CryptoJS.AES.encrypt(value, this.#secret).toString();
    const e64 = CryptoJS.enc.Base64.parse(b64);
    const eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  }

  private decrypt(value: string): string {
    const reb64 = CryptoJS.enc.Hex.parse(value);
    const bytes = reb64.toString(CryptoJS.enc.Base64);
    const decrypt = CryptoJS.AES.decrypt(bytes, this.#secret);
    const plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  }

  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string {
    const cipher = localStorage.getItem(key) || '';
    return this.decrypt(cipher);
  }

  setItem(key: string, value: string): void {
    const encrypted = this.encrypt(value);
    localStorage.setItem(key, encrypted);
  }
}

export default new LocalEncryptedStorage();
