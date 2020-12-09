const TOKEN = process.env.REACT_APP_AUTH_TOKEN as string;

// Implement encryption / decryption of Token

export function getToken(): string {
  return localStorage.getItem(TOKEN) || '';
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN, token);
}
