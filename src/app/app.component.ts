import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <!-- Blood drips animation -->
      <div class="blood-drips" aria-hidden="true">
        <div class="blood-drip" style="left: 10%; animation-delay: 0s;"></div>
        <div class="blood-drip" style="left: 30%; animation-delay: 1.5s;"></div>
        <div class="blood-drip" style="left: 50%; animation-delay: 3s;"></div>
        <div class="blood-drip" style="left: 70%; animation-delay: 2s;"></div>
        <div class="blood-drip" style="left: 90%; animation-delay: 0.5s;"></div>
      </div>

      <header class="header texture-overlay">
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
}
