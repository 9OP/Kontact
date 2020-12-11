const TOKEN = 'encrypted-authorization-bearer';

// Implement encryption / decryption of Token

export function getToken(): string {
  return localStorage.getItem(TOKEN) || '';
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN, token);
}

export function clearToken(): void {
  localStorage.setItem(TOKEN, '');
}
