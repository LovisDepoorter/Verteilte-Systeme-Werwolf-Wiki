import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { WerwolfCard, CardTeam } from '../../models/werwolf-card.model';

@Component({
  selector: 'app-card-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="overview-container">
      <div class="search-section blood-glow texture-overlay">
        <h2 class="section-title">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Durchsuche alle Karten
        </h2>

        <div class="search-controls">
          <div class="search-input-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearch()"
              placeholder="Suche nach Name, Rolle oder Fähigkeiten..."
              class="search-input"
              aria-label="Suche nach Werwolf-Karten"
            />
          </div>

          <div class="filter-buttons">
            <button
              *ngFor="let team of teams"
              [class.active]="selectedTeam === team"
              (click)="filterByTeam(team)"
              class="filter-btn"
              [attr.aria-label]="'Filtern nach ' + getTeamLabel(team)"
              [attr.aria-pressed]="selectedTeam === team"
            >
              {{ getTeamLabel(team) }}
            </button>
          </div>
        </div>

        <div class="results-info" *ngIf="searchQuery || selectedTeam !== 'alle'" role="status" aria-live="polite">
          <div class="blood-accent"></div>
          <p>{{ filteredCards.length }} Karte(n) gefunden</p>
        </div>
      </div>

      <div class="cards-grid">
        <article *ngFor="let card of filteredCards" class="card-item" [class]="'team-' + card.team">
          <div class="card-image">
            <div class="placeholder-image texture-overlay">
              <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <div class="blood-splatter" aria-hidden="true"></div>
          </div>

          <div class="card-content">
            <h3>{{ card.name }}</h3>
            <span class="team-badge" [class]="'badge-' + card.team">
              {{ getTeamLabel(card.team) }}
            </span>
            <p class="card-description">{{ card.description }}</p>

            <div class="card-actions">
              <a
                [routerLink]="['/card', card.id]"
                class="detail-btn"
                [attr.aria-label]="'Details ansehen für ' + card.name"
              >
                Details ansehen
                <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <div *ngIf="filteredCards.length === 0" class="no-results" role="status">
          <svg class="no-results-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
          <p>Keine Karten gefunden. Versuche es mit einem anderen Suchbegriff.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overview-container {
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

    .search-section {
      position: relative;
      background: var(--black-soft);
      border-radius: 0;
      padding: 2.5rem;
      margin-bottom: 3rem;
      border: 2px solid var(--blood-red);
      border-left: none;
      border-right: none;
    }

    .section-title {
      margin: 0 0 2rem 0;
      color: var(--blood-light);
      font-size: 2.2rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      gap: 1rem;
      letter-spacing: -0.02em;
      text-transform: uppercase;
    }

    .section-title .icon {
      width: 2.5rem;
      height: 2.5rem;
      color: var(--blood-red);
      filter: drop-shadow(0 0 10px var(--blood-red));
    }

    .search-controls {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .search-input-wrapper {
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5rem;
      height: 1.5rem;
      color: var(--blood-red);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 1.25rem 1.5rem 1.25rem 4rem;
      font-size: 1rem;
      background: var(--black);
      border: 2px solid var(--gray-dark);
      border-radius: 0;
      color: var(--white);
      transition: all 0.2s ease-out;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
    }

    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--blood-red);
      box-shadow: 0 0 0 3px var(--shadow-blood),
                  inset 0 0 20px rgba(139, 0, 0, 0.1);
    }

    .filter-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.875rem 1.75rem;
      border: 2px solid var(--gray-dark);
      background: var(--black);
      border-radius: 0;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--white);
      transition: all 0.2s ease-out;
      font-family: 'Inter', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .filter-btn:hover {
      border-color: var(--blood-red);
      background: var(--blood-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px var(--shadow-blood);
    }

    .filter-btn:focus {
      outline: 2px solid var(--blood-red);
      outline-offset: 2px;
    }

    .filter-btn.active {
      background: var(--blood-red);
      border-color: var(--blood-red);
      color: var(--white);
      box-shadow: 0 0 30px var(--shadow-blood);
    }

    .results-info {
      position: relative;
      margin-top: 1.5rem;
      padding: 1rem 1.5rem;
      background: var(--black);
      border: 1px solid var(--blood-dark);
      border-left: none;
      border-right: none;
    }

    .blood-accent {
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: var(--blood-red);
      box-shadow: 0 0 10px var(--blood-red);
    }

    .results-info p {
      margin: 0;
      color: var(--white-dirty);
      font-weight: 600;
      letter-spacing: 0.03em;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2.5rem;
    }

    .card-item {
      background: var(--black-soft);
      border-radius: 0;
      overflow: hidden;
      border: 2px solid var(--gray-dark);
      transition: all 0.2s ease-out;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      position: relative;
    }

    .card-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--blood-red);
      transition: width 0.3s ease-out;
    }

    .card-item:hover {
      transform: translateY(-8px);
      border-color: var(--blood-red);
      box-shadow: 0 15px 40px var(--shadow-blood),
                  0 0 60px var(--shadow-blood);
    }

    .card-item:hover::before {
      width: 100%;
    }

    .card-image {
      height: 220px;
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
      width: 5rem;
      height: 5rem;
      color: var(--white);
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
      position: relative;
      z-index: 1;
    }

    .blood-splatter {
      position: absolute;
      bottom: -10px;
      right: -10px;
      width: 80px;
      height: 80px;
      background: radial-gradient(circle, var(--blood-dark) 0%, transparent 70%);
      opacity: 0.6;
      pointer-events: none;
    }

    .team-werwolf .placeholder-image {
      background: linear-gradient(135deg, var(--blood-dark) 0%, var(--black) 100%);
    }

    .team-werwolf .card-icon {
      color: var(--blood-light);
      filter: drop-shadow(0 0 15px var(--blood-red));
    }

    .team-dorfbewohner .placeholder-image {
      background: linear-gradient(135deg, var(--gray-dark) 0%, var(--black-soft) 100%);
    }

    .team-neutral .placeholder-image {
      background: linear-gradient(135deg, #3A3A3A 0%, var(--black) 100%);
    }

    .team-liebende .placeholder-image {
      background: linear-gradient(135deg, var(--blood-red) 0%, var(--blood-dark) 100%);
    }

    .card-content {
      padding: 2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-content h3 {
      margin: 0 0 1rem 0;
      font-size: 1.6rem;
      color: var(--white);
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .team-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0;
      font-size: 0.75rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      width: fit-content;
      border: 1px solid;
    }

    .badge-werwolf {
      background: var(--blood-dark);
      color: var(--blood-light);
      border-color: var(--blood-red);
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
    }

    .card-description {
      color: var(--white-dirty);
      line-height: 1.7;
      margin-bottom: 1.5rem;
      flex: 1;
      font-size: 0.95rem;
      opacity: 0.9;
    }

    .card-actions {
      margin-top: auto;
    }

    .detail-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      background: var(--blood-red);
      color: var(--white);
      text-decoration: none;
      border-radius: 0;
      font-weight: 800;
      transition: all 0.2s ease-out;
      font-family: 'Inter', sans-serif;
      border: 2px solid var(--blood-red);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 0.85rem;
    }

    .detail-btn:hover {
      background: var(--blood-dark);
      border-color: var(--blood-light);
      box-shadow: 0 0 30px var(--shadow-blood);
      transform: translateX(4px);
    }

    .detail-btn:focus {
      outline: 2px solid var(--blood-light);
      outline-offset: 2px;
    }

    .arrow-icon {
      width: 1.25rem;
      height: 1.25rem;
      transition: transform 0.2s ease-out;
    }

    .detail-btn:hover .arrow-icon {
      transform: translateX(6px);
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      background: var(--black-soft);
      border-radius: 0;
      border: 2px dashed var(--gray-dark);
    }

    .no-results-icon {
      width: 4rem;
      height: 4rem;
      color: var(--blood-red);
      margin-bottom: 1.5rem;
      opacity: 0.6;
    }

    .no-results p {
      color: var(--white-dirty);
      font-size: 1.1rem;
      margin: 0;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .cards-grid {
        grid-template-columns: 1fr;
      }

      .search-section {
        padding: 2rem 1.5rem;
      }

      .section-title {
        font-size: 1.8rem;
      }

      .filter-buttons {
        gap: 0.75rem;
      }

      .filter-btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.85rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .overview-container,
      .card-item,
      .detail-btn,
      .filter-btn {
        animation: none;
        transition: none;
      }

      .card-item:hover,
      .detail-btn:hover,
      .filter-btn:hover {
        transform: none;
      }
    }
  `]
})
export class CardOverviewComponent implements OnInit {
  cards: WerwolfCard[] = [];
  filteredCards: WerwolfCard[] = [];
  searchQuery: string = '';
  selectedTeam: CardTeam = 'alle';

  teams: CardTeam[] = ['alle', 'dorfbewohner', 'werwolf', 'neutral', 'liebende'];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getAllCards().subscribe(cards => {
      this.cards = cards;
      this.filteredCards = cards;
    });
  }

  onSearch(): void {
    this.cardService.searchCards(this.searchQuery).subscribe(cards => {
      this.filteredCards = this.selectedTeam === 'alle'
        ? cards
        : cards.filter(card => card.team === this.selectedTeam);
    });
  }

  filterByTeam(team: CardTeam): void {
    this.selectedTeam = team;
    this.onSearch();
  }

  getTeamLabel(team: string): string {
    const labels: { [key: string]: string } = {
      'alle': 'Alle',
      'dorfbewohner': 'Dorfbewohner',
      'werwolf': 'Werwölfe',
      'neutral': 'Neutral',
      'liebende': 'Liebende'
    };
    return labels[team] || team;
  }
}
