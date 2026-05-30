import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-box blood-glow texture-overlay">
        <div class="skull-decoration" aria-hidden="true">
          <pre class="skull-ascii">
    ___
   /   \\
  | O O |
  |  ^  |
  | \\_/ |
   \\___/</pre>
        </div>

        <h1 class="login-title blood-text">Zugang zum Düsterwald</h1>
        <p class="login-subtitle">Nur für Eingeweihte</p>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="password" class="sr-only">Passwort</label>
            <div class="input-wrapper">
              <svg class="lock-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <input
                type="password"
                id="password"
                [(ngModel)]="password"
                name="password"
                placeholder="Passwort eingeben..."
                class="password-input"
                [class.error]="showError"
                required
                autofocus
              />
            </div>
          </div>

          <div class="error-message" *ngIf="showError" role="alert">
            <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Falsches Passwort. Der Zugang bleibt verwehrt.
          </div>

          <button type="submit" class="submit-btn" [disabled]="!password">
            Eintreten
            <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </form>

        <div class="hint">
          <p>Hinweis: Passwort erforderlich wegen Urheberrecht</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: var(--black);
      position: relative;
    }

    .login-container::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.15) 0%, transparent 60%);
      pointer-events: none;
      z-index: 0;
    }

    .login-box {
      position: relative;
      max-width: 500px;
      width: 100%;
      background: var(--black-soft);
      border: 2px solid var(--blood-red);
      padding: 3rem;
      z-index: 1;
    }

    .skull-decoration {
      text-align: center;
      margin-bottom: 2rem;
    }

    .skull-ascii {
      font-family: monospace;
      font-size: 1rem;
      line-height: 1.2;
      margin: 0;
      color: var(--blood-light);
      filter: drop-shadow(0 0 15px var(--blood-red));
      white-space: pre;
      display: inline-block;
      animation: textGlow 3s ease-in-out infinite;
    }

    @keyframes textGlow {
      0%, 100% {
        filter: drop-shadow(0 0 10px var(--blood-red));
      }
      50% {
        filter: drop-shadow(0 0 25px var(--blood-red)) drop-shadow(0 0 40px var(--blood-red));
      }
    }

    .login-title {
      margin: 0 0 0.5rem 0;
      font-size: 2.5rem;
      text-align: center;
      font-weight: 900;
      letter-spacing: -0.02em;
    }

    .login-subtitle {
      text-align: center;
      color: var(--white-dirty);
      margin: 0 0 3rem 0;
      font-size: 1rem;
      opacity: 0.8;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .login-form {
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    .input-wrapper {
      position: relative;
    }

    .lock-icon {
      position: absolute;
      left: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5rem;
      height: 1.5rem;
      color: var(--blood-red);
      pointer-events: none;
    }

    .password-input {
      width: 100%;
      padding: 1.25rem 1.5rem 1.25rem 4rem;
      font-size: 1rem;
      background: var(--black);
      border: 2px solid var(--gray-dark);
      color: var(--white);
      transition: all 0.2s ease-out;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
    }

    .password-input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .password-input:focus {
      outline: none;
      border-color: var(--blood-red);
      box-shadow: 0 0 0 3px var(--shadow-blood),
                  inset 0 0 20px rgba(139, 0, 0, 0.1);
    }

    .password-input.error {
      border-color: var(--blood-light);
      animation: shake 0.4s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: rgba(139, 0, 0, 0.2);
      border: 1px solid var(--blood-red);
      border-left: 4px solid var(--blood-red);
      color: var(--blood-light);
      margin-bottom: 1.5rem;
      font-weight: 500;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-icon {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--blood-light);
      flex-shrink: 0;
    }

    .submit-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.25rem 2rem;
      background: var(--blood-red);
      color: var(--white);
      border: 2px solid var(--blood-red);
      font-weight: 800;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: all 0.2s ease-out;
      font-family: 'Inter', sans-serif;
    }

    .submit-btn:hover:not(:disabled) {
      background: var(--blood-dark);
      border-color: var(--blood-light);
      box-shadow: 0 0 40px var(--shadow-blood);
      transform: translateY(-2px);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .submit-btn:focus {
      outline: 2px solid var(--blood-light);
      outline-offset: 2px;
    }

    .arrow-icon {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 0.2s ease-out;
    }

    .submit-btn:hover:not(:disabled) .arrow-icon {
      transform: translateX(6px);
    }

    .hint {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid var(--gray-dark);
    }

    .hint p {
      margin: 0;
      color: var(--white-dirty);
      font-size: 0.9rem;
      opacity: 0.7;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .login-box {
        padding: 2rem 1.5rem;
      }

      .login-title {
        font-size: 2rem;
      }

      .skull-ascii {
        font-size: 0.8rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .skull-ascii,
      .password-input.error {
        animation: none;
      }
    }
  `]
})
export class LoginComponent {
  password: string = '';
  showError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.authService.login(this.password)) {
      this.router.navigate(['/']);
    } else {
      this.showError = true;
      this.password = '';
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }
  }
}
