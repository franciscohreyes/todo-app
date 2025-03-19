import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'auth_token';

  constructor() { }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  // Método para obtener el token si es necesario
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para guardar el token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para eliminar el token (logout)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
