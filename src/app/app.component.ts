import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <!-- Blood drips animation -->
      <div class="blood-drips" [class.hidden]="!bloodEffectEnabled" aria-hidden="true">
        <div class="blood-drip" style="left: 10%; animation-delay: 0s;"></div>
        <div class="blood-drip" style="left: 30%; animation-delay: 1.5s;"></div>
        <div class="blood-drip" style="left: 50%; animation-delay: 3s;"></div>
        <div class="blood-drip" style="left: 70%; animation-delay: 2s;"></div>
        <div class="blood-drip" style="left: 90%; animation-delay: 0.5s;"></div>
      </div>

      <header class="header texture-overlay">
        <button
          class="blood-toggle"
          (click)="toggleBloodEffect()"
          [class.active]="bloodEffectEnabled"
          [attr.aria-label]="bloodEffectEnabled ? 'Blutfluss deaktivieren' : 'Blutfluss aktivieren'"
          [title]="bloodEffectEnabled ? 'Blutfluss deaktivieren' : 'Blutfluss aktivieren'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" [attr.fill]="bloodEffectEnabled ? 'currentColor' : 'none'" [attr.stroke]="bloodEffectEnabled ? 'none' : 'currentColor'" stroke-width="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
          <span class="slash" *ngIf="!bloodEffectEnabled"></span>
        </button>

        <div class="header-content">
          <h1 class="logo blood-text">
            <pre class="wolf-ascii" aria-label="Wolf ASCII Art">
       /\\
    /__-\\/---_\\__
 //--/-\\ _ - 0\\  ---_\\\\\\---_
///-/|  _ -- _  \\____--   \\
//_  _  _\\/\\  |//\\/\\//\\/\\__\\
///-/   |\\ /\\  | ||         \\/-
/__  |  \\-\\ \\__ | |  \\\\
-    /-\\    \\  -\\/\\|__ /\\|\\-\\/\\/
     -\\   \\/\\-\\   ___\\/___/-
         \\
           ___ _
                \\</pre>
            Werwölfe von Düsterwald Wiki
          </h1>
          <p class="tagline">Die dunkle Enzyklopädie des legendären Rollenspiels</p>
        </div>
      </header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <div class="blood-border"></div>
        <p>&copy; 2026 Werwölfe von Düsterwald Wiki - Im Schatten der Nacht</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--black);
      position: relative;
      overflow-x: hidden;
    }

    .app-container::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background:
        radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(74, 0, 0, 0.15) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    .blood-drips {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
      transition: opacity 0.3s ease-out;
    }

    .blood-drips.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .blood-toggle {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 3rem;
      height: 3rem;
      background: var(--black-soft);
      border: 2px solid var(--blood-red);
      border-radius: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-out;
      z-index: 100;
      padding: 0;
    }

    .blood-toggle:hover {
      background: var(--blood-dark);
      box-shadow: 0 0 20px var(--shadow-blood);
      transform: scale(1.1);
    }

    .blood-toggle:focus {
      outline: 2px solid var(--blood-light);
      outline-offset: 2px;
    }

    .blood-toggle svg {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--blood-light);
      transition: all 0.2s ease-out;
    }

    .blood-toggle.active svg {
      filter: drop-shadow(0 0 8px var(--blood-red));
    }

    .slash {
      position: absolute;
      width: 2px;
      height: 2.5rem;
      background: var(--blood-light);
      transform: rotate(-45deg);
      pointer-events: none;
    }

    .header {
      position: relative;
      background: var(--black-soft);
      padding: 2.5rem 1rem;
      text-align: center;
      border-bottom: 3px solid var(--blood-red);
      box-shadow: 0 4px 20px var(--shadow-blood);
      z-index: 10;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .logo {
      font-size: 2.2rem;
      margin: 0;
      font-weight: 900;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      letter-spacing: -0.03em;
    }

    .wolf-ascii {
      font-family: monospace;
      font-size: 0.7rem;
      line-height: 1;
      margin: 0;
      color: var(--blood-light);
      filter: drop-shadow(0 0 15px var(--blood-red));
      white-space: pre;
      text-align: left;
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

    .tagline {
      font-size: 1.1rem;
      color: var(--white-dirty);
      margin: 1rem 0 0 0;
      font-weight: 400;
      opacity: 0.9;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .main-content {
      flex: 1;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      padding: 3rem 1rem;
      position: relative;
      z-index: 1;
    }

    .footer {
      position: relative;
      background: var(--black-soft);
      text-align: center;
      padding: 2rem 1rem;
      color: var(--white-dirty);
      margin-top: auto;
      z-index: 10;
    }

    .blood-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg,
        transparent,
        var(--blood-red) 20%,
        var(--blood-dark) 50%,
        var(--blood-red) 80%,
        transparent
      );
    }

    .footer p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .blood-toggle {
        top: 1rem;
        right: 1rem;
        width: 2.5rem;
        height: 2.5rem;
      }

      .blood-toggle svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .logo {
        font-size: 1.5rem;
        gap: 1rem;
      }

      .wolf-ascii {
        font-size: 0.5rem;
      }

      .tagline {
        font-size: 0.8rem;
      }

      .main-content {
        padding: 2rem 1rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .wolf-ascii {
        animation: none;
      }

      .blood-drip {
        display: none;
      }
    }
  `]
})
export class AppComponent {
  title = 'Werwölfe von Düsterwald Wiki';
  bloodEffectEnabled = true;

  toggleBloodEffect(): void {
    this.bloodEffectEnabled = !this.bloodEffectEnabled;
  }
}
