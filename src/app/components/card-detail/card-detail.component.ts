import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardService } from '../../services/card.service';
import { WerwolfCard } from '../../models/werwolf-card.model';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-container" *ngIf="card">
      <a routerLink="/" class="back-link">
        <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Zurück zur Übersicht
      </a>

      <article class="card-header" [class]="'team-' + card.team">
        <div class="card-image-large texture-overlay">
          <div class="placeholder-image">
            <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <div class="blood-corner top-left"></div>
          <div class="blood-corner bottom-right"></div>
        </div>

        <div class="card-header-info">
          <h1>{{ card.name }}</h1>
          <span class="team-badge" [class]="'badge-' + card.team">
            {{ getTeamLabel(card.team) }}
          </span>
          <p class="description">{{ card.description }}</p>
        </div>
      </article>

      <div class="card-sections">
        <section class="section blood-glow">
          <div class="section-header">
            <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            <h2>Besondere Fähigkeiten</h2>
          </div>
          <ul class="abilities-list">
            <li *ngFor="let ability of card.specialAbilities">
              <div class="blood-marker"></div>
              {{ ability }}
            </li>
          </ul>
        </section>

        <section class="section blood-glow" *ngIf="card.wakeUpOrder !== undefined">
          <div class="section-header">
            <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2>Aufwachreihenfolge</h2>
          </div>
          <div class="wake-up-info">
            <span class="wake-up-badge">Phase {{ card.wakeUpOrder }}</span>
            <p>{{ getWakeUpDescription(card.wakeUpOrder) }}</p>
          </div>
        </section>

        <section class="section blood-glow" *ngIf="card.interactions && card.interactions.length > 0">
          <div class="section-header">
            <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <h2>Interaktionen mit anderen Rollen</h2>
          </div>
          <div class="interactions-list">
            <div *ngFor="let interaction of card.interactions" class="interaction-item">
              <div class="blood-marker"></div>
              <p>{{ interaction }}</p>
            </div>
          </div>
        </section>

        <section class="section blood-glow" *ngIf="card.tips && card.tips.length > 0">
          <div class="section-header">
            <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            <h2>Tipps & Strategien</h2>
          </div>
          <div class="tips-list">
            <div *ngFor="let tip of card.tips" class="tip-item">
              <div class="blood-marker"></div>
              <p>{{ tip }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="not-found" *ngIf="!card && !loading">
      <svg class="not-found-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <h2>Karte nicht gefunden</h2>
      <p>Die gesuchte Karte existiert nicht im dunklen Archiv.</p>
      <a routerLink="/" class="back-btn">Zurück zur Übersicht</a>
    </div>
  `,
  styles: [`
    .detail-container {
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--white);
      text-decoration: none;
      font-weight: 700;
      margin-bottom: 2.5rem;
      padding: 1rem 2rem;
      background: var(--black-soft);
      border: 2px solid var(--gray-dark);
      border-radius: 0;
      transition: all 0.2s ease-out;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.9rem;
    }

    .back-link:hover {
      background: var(--blood-dark);
      border-color: var(--blood-red);
      transform: translateX(-4px);
      box-shadow: 0 0 30px var(--shadow-blood);
    }

    .back-link:focus {
      outline: 2px solid var(--blood-red);
      outline-offset: 2px;
    }

    .back-icon {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 0.2s ease-out;
    }

    .back-link:hover .back-icon {
      transform: translateX(-6px);
    }

    .card-header {
      background: var(--black-soft);
      border-radius: 0;
      overflow: hidden;
      border: 2px solid var(--gray-dark);
      margin-bottom: 3rem;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 0;
      position: relative;
    }

    .card-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, transparent, var(--blood-red), transparent);
    }

    .card-image-large {
      height: 500px;
      overflow: hidden;
      position: relative;
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--black) 0%, var(--gray-dark) 100%);
      position: relative;
    }

    .card-icon {
      width: 10rem;
      height: 10rem;
      color: var(--white);
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.8));
      position: relative;
      z-index: 1;
    }

    .blood-corner {
      position: absolute;
      width: 100px;
      height: 100px;
      opacity: 0.4;
    }

    .blood-corner.top-left {
      top: 0;
      left: 0;
      background: radial-gradient(circle at top left, var(--blood-dark) 0%, transparent 70%);
    }

    .blood-corner.bottom-right {
      bottom: 0;
      right: 0;
      background: radial-gradient(circle at bottom right, var(--blood-dark) 0%, transparent 70%);
    }

    .team-werwolf .placeholder-image {
      background: linear-gradient(135deg, var(--blood-dark) 0%, var(--black) 100%);
    }

    .team-werwolf .card-icon {
      color: var(--blood-light);
      filter: drop-shadow(0 0 30px var(--blood-red));
    }

    .card-header-info {
      padding: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: var(--black-soft);
      border-left: 2px solid var(--blood-dark);
    }

    .card-header-info h1 {
      margin: 0 0 1.5rem 0;
      font-size: 3rem;
      color: var(--white);
      font-weight: 900;
      letter-spacing: -0.02em;
    }

    .team-badge {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 0;
      font-size: 0.85rem;
      font-weight: 800;
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      width: fit-content;
      border: 2px solid;
    }

    .badge-werwolf {
      background: var(--blood-dark);
      color: var(--blood-light);
      border-color: var(--blood-red);
      box-shadow: 0 0 20px var(--shadow-blood);
    }

    .badge-dorfbewohner {
      background: var(--gray-dark);
      color: var(--white);
      border-color: var(--white);
    }

    .badge-neutral {
      background: var(--black);
      color: var(--white-dirty);
      border-color: var(--gray-dark);
    }

    .badge-liebende {
      background: var(--blood-red);
      color: var(--white);
      border-color: var(--blood-light);
      box-shadow: 0 0 20px var(--shadow-blood);
    }

    .description {
      color: var(--white-dirty);
      line-height: 1.8;
      font-size: 1.1rem;
      margin: 0;
      opacity: 0.95;
    }

    .card-sections {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .section {
      position: relative;
      background: var(--black-soft);
      border-radius: 0;
      padding: 2.5rem;
      border: 2px solid var(--gray-dark);
      border-left: 4px solid var(--blood-red);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--gray-dark);
    }

    .section-header h2 {
      margin: 0;
      color: var(--blood-light);
      font-size: 1.8rem;
      font-weight: 900;
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }

    .section-icon {
      width: 2rem;
      height: 2rem;
      color: var(--blood-red);
      filter: drop-shadow(0 0 10px var(--blood-red));
    }

    .abilities-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .abilities-list li {
      position: relative;
      padding: 1.25rem 1.5rem 1.25rem 2.5rem;
      background: var(--black);
      border: 1px solid var(--gray-dark);
      color: var(--white);
      line-height: 1.7;
      font-weight: 500;
    }

    .blood-marker {
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: var(--blood-red);
      box-shadow: 0 0 10px var(--blood-red);
    }

    .wake-up-info {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
      background: var(--black);
      border: 1px solid var(--blood-dark);
    }

    .wake-up-badge {
      padding: 1rem 2rem;
      background: var(--blood-red);
      color: var(--white);
      border-radius: 0;
      font-weight: 900;
      font-size: 1.2rem;
      white-space: nowrap;
      box-shadow: 0 0 30px var(--shadow-blood);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 2px solid var(--blood-light);
    }

    .wake-up-info p {
      margin: 0;
      color: var(--white-dirty);
      line-height: 1.7;
      font-size: 1.05rem;
    }

    .interactions-list,
    .tips-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .interaction-item,
    .tip-item {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      padding: 1.5rem 1.5rem 1.5rem 2.5rem;
      background: var(--black);
      border: 1px solid var(--gray-dark);
    }

    .interaction-item p,
    .tip-item p {
      margin: 0;
      color: var(--white-dirty);
      line-height: 1.7;
      font-weight: 500;
    }

    .not-found {
      background: var(--black-soft);
      border-radius: 0;
      padding: 5rem 3rem;
      text-align: center;
      border: 2px solid var(--blood-dark);
    }

    .not-found-icon {
      width: 6rem;
      height: 6rem;
      color: var(--blood-red);
      margin-bottom: 2rem;
      filter: drop-shadow(0 0 20px var(--blood-red));
    }

    .not-found h2 {
      color: var(--white);
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-weight: 900;
    }

    .not-found p {
      color: var(--white-dirty);
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .back-btn {
      display: inline-block;
      padding: 1rem 2.5rem;
      background: var(--blood-red);
      color: var(--white);
      text-decoration: none;
      border-radius: 0;
      font-weight: 800;
      transition: all 0.2s ease-out;
      border: 2px solid var(--blood-red);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .back-btn:hover {
      background: var(--blood-dark);
      border-color: var(--blood-light);
      box-shadow: 0 0 40px var(--shadow-blood);
      transform: translateY(-3px);
    }

    .back-btn:focus {
      outline: 2px solid var(--blood-light);
      outline-offset: 2px;
    }

    @media (max-width: 968px) {
      .card-header {
        grid-template-columns: 1fr;
      }

      .card-image-large {
        height: 350px;
      }

      .card-header-info {
        padding: 2.5rem 2rem;
        border-left: none;
        border-top: 2px solid var(--blood-dark);
      }

      .card-header-info h1 {
        font-size: 2.2rem;
      }

      .wake-up-info {
        flex-direction: column;
        align-items: flex-start;
      }

      .section {
        padding: 2rem 1.5rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .detail-container,
      .back-link,
      .back-btn {
        animation: none;
        transition: none;
      }

      .back-link:hover,
      .back-btn:hover {
        transform: none;
      }
    }
  `]
})
export class CardDetailComponent implements OnInit {
  card: WerwolfCard | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id');
    if (cardId) {
      this.cardService.getCardById(cardId).subscribe(card => {
        this.card = card;
        this.loading = false;
      });
    }
  }

  getTeamLabel(team: string): string {
    const labels: { [key: string]: string } = {
      'dorfbewohner': 'Dorfbewohner',
      'werwolf': 'Werwolf',
      'neutral': 'Neutral',
      'liebende': 'Liebende'
    };
    return labels[team] || team;
  }

  getWakeUpDescription(order: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Erwacht nur in der ersten Nacht des Spiels.',
      1: 'Erwacht als erstes in der Nachtphase.',
      2: 'Erwacht nach den Werwölfen.',
      3: 'Erwacht nach der Seherin.'
    };
    return descriptions[order] || 'Erwacht in der Nachtphase.';
  }
}
