import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, User } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
//
import { AuthenticationService } from '@services/authentication.service';
import { Users } from '@modules/auth/models/users.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private auth: Auth, private authService: AuthenticationService) {
    // Escuchamos cambios en el estado de autenticación
    this.checkAuthStatus();
  }

  // Verifica si el usuario está autenticado desde el localStorage
  private checkAuthStatus(): void {
    const storedUser = localStorage.getItem('auth_token');
    if (storedUser) {
      this.isAuthenticatedSubject.next(true); // Usuario autenticado
    } else {
      this.isAuthenticatedSubject.next(false); // Usuario no autenticado
    }
  }

  register(email: string): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/auth/users`, { email });
  }

  login(email: string): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/auth/login`, { email });
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('auth_token');
      this.isAuthenticatedSubject.next(false);
    });
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check/${email}`);
  }

  getUser(): Observable<User | null> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged(observer);
    });
  }

  get isAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }
}
