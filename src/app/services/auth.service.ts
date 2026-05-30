import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasStoredAuth());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Hardcoded password - für Production sollte dies über ein Backend laufen !BACKEND
  private readonly correctPassword = 'duesterwald2026';

  constructor() {}

  private hasStoredAuth(): boolean {
    return sessionStorage.getItem('authenticated') === 'true';
  }

  login(password: string): boolean {
    if (password === this.correctPassword) {
      sessionStorage.setItem('authenticated', 'true');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('authenticated');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
