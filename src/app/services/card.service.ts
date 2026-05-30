import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { WerwolfCard } from '../models/werwolf-card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: WerwolfCard[] = [
    {
      id: 'werwolf',
      name: 'Werwolf',
      team: 'werwolf',
      imageUrl: 'assets/cards/werwolf.jpg',
      description: 'Die Werwölfe sind die Hauptschurken des Spiels. Jede Nacht erwachen sie gemeinsam und wählen ein Opfer aus dem Dorf.',
      specialAbilities: [
        'Erwacht jede Nacht mit allen anderen Werwölfen',
        'Tötet gemeinsam einen Dorfbewohner pro Nacht',
        'Kennt alle anderen Werwölfe'
      ],
      wakeUpOrder: 1,
      interactions: [
        'Seherin: Wird als Werwolf erkannt',
        'Leibwächter: Kann das Opfer beschützen',
        'Jäger: Kann beim Tod einen Werwolf mitnehmen'
      ],
      tips: [
        'Versuche tagsüber unauffällig zu bleiben',
        'Stimme mit den Dorfbewohnern ab, aber lenke Verdacht auf Unschuldige',
        'Koordiniere dich nachts mit deinen Mitspielern'
      ]
    },
    {
      id: 'seherin',
      name: 'Seherin',
      team: 'dorfbewohner',
      imageUrl: 'assets/cards/seherin.jpg',
      description: 'Die Seherin ist eine mächtige Verbündete der Dorfbewohner. Jede Nacht kann sie die wahre Identität eines Spielers erfahren.',
      specialAbilities: [
        'Erwacht jede Nacht nach den Werwölfen',
        'Darf einen Spieler auswählen und dessen Rolle erfahren',
        'Weiß, wer Werwolf ist und wer nicht'
      ],
      wakeUpOrder: 2,
      interactions: [
        'Werwölfe: Erkennt Werwölfe zuverlässig',
        'Dorfbewohner: Kann unschuldige Spieler bestätigen',
        'Amor: Kann die Liebenden nicht als solche erkennen'
      ],
      tips: [
        'Sei vorsichtig beim Teilen deiner Informationen',
        'Werwölfe werden versuchen, dich zu eliminieren',
        'Nutze deine Macht strategisch, um Verdächtige zu prüfen'
      ]
    },
    {
      id: 'hexe',
      name: 'Hexe',
      team: 'dorfbewohner',
      imageUrl: 'assets/cards/hexe.jpg',
      description: 'Die Hexe besitzt zwei mächtige Tränke: einen Heiltrank und einen Gifttrank. Jeden Trank kann sie einmal im Spiel einsetzen.',
      specialAbilities: [
        'Erfährt jede Nacht, wer das Opfer der Werwölfe ist',
        'Kann das Opfer mit dem Heiltrank retten (einmalig)',
        'Kann einen Spieler mit dem Gifttrank töten (einmalig)'
      ],
      wakeUpOrder: 3,
      interactions: [
        'Werwölfe: Kann deren Opfer retten oder einen von ihnen vergiften',
        'Leibwächter: Ihre Tränke wirken nach dessen Schutz',
        'Jäger: Kann den Jäger retten oder töten'
      ],
      tips: [
        'Überlege gut, wann du deine Tränke einsetzt',
        'Der Heiltrank kann dich selbst nicht retten',
        'Nutze den Gifttrank, wenn du dir sicher bist'
      ]
    },
    {
      id: 'jaeger',
      name: 'Jäger',
      team: 'dorfbewohner',
      imageUrl: 'assets/cards/jaeger.jpg',
      description: 'Der Jäger ist ein gefährlicher Gegner, selbst im Tod. Wenn er stirbt, kann er mit seinem letzten Atemzug einen anderen Spieler mit ins Grab nehmen.',
      specialAbilities: [
        'Wenn er stirbt, darf er sofort einen anderen Spieler erschießen',
        'Diese Fähigkeit gilt sowohl für Nacht als auch Tag',
        'Kann nicht erwachen, hat eine passive Fähigkeit'
      ],
      wakeUpOrder: undefined,
      interactions: [
        'Werwölfe: Gefährlich zu töten, da er zurückschießen kann',
        'Hexe: Wenn vergiftet, kann er trotzdem schießen',
        'Dorfbewohner: Muss aufpassen, keinen Unschuldigen zu erschießen'
      ],
      tips: [
        'Gib dich nicht zu früh als Jäger zu erkennen',
        'Werwölfe werden zögern, dich zu töten',
        'Überlege gut, wen du im Todesfall mitnimmst'
      ]
    },
    {
      id: 'amor',
      name: 'Amor',
      team: 'dorfbewohner',
      imageUrl: 'assets/cards/amor.jpg',
      description: 'Amor erwacht nur in der ersten Nacht und bestimmt zwei Spieler zu Liebenden. Diese sind für immer verbunden.',
      specialAbilities: [
        'Erwacht nur in der ersten Nacht',
        'Wählt zwei Spieler als Liebende aus',
        'Die Liebenden sterben beide, wenn einer von ihnen stirbt'
      ],
      wakeUpOrder: 0,
      interactions: [
        'Liebende: Erschafft ein neues Team, das nur gemeinsam gewinnen kann',
        'Werwölfe: Kann versehentlich eine Werwolf-Dorfbewohner-Verbindung schaffen',
        'Alle Rollen: Ändert die Dynamik des gesamten Spiels'
      ],
      tips: [
        'Wähle die Liebenden strategisch aus',
        'Eine Werwolf-Dorfbewohner-Verbindung kann spannend sein',
        'Die Liebenden haben ein eigenes Gewinnziel'
      ]
    },
    {
      id: 'leibwaechter',
      name: 'Leibwächter',
      team: 'dorfbewohner',
      imageUrl: 'assets/cards/leibwaechter.jpg',
      description: 'Der Leibwächter kann jede Nacht einen Spieler vor den Werwölfen beschützen. Er darf jedoch nie zweimal hintereinander dieselbe Person schützen.',
      specialAbilities: [
        'Erwacht nach den Werwölfen',
        'Wählt einen Spieler zum Schutz aus',
        'Kann nicht zweimal hintereinander denselben Spieler schützen',
        'Kann sich selbst schützen'
      ],
      wakeUpOrder: 2,
      interactions: [
        'Werwölfe: Verhindert deren Angriff auf den geschützten Spieler',
        'Hexe: Wenn beide dasselbe Ziel wählen, wird niemand getötet',
        'Seherin: Kann die Seherin beschützen'
      ],
      tips: [
        'Versuche wichtige Rollen zu beschützen',
        'Variiere deine Schutzauswahl',
        'Selbstschutz kann in kritischen Momenten Leben retten'
      ]
    },
    {
      id: 'dorfbewohner',
      name: 'Einfacher Dorfbewohner',
      team: 'dorfbewohner',
      imageUrl: 'assets/cards/dorfbewohner.jpg',
      description: 'Der einfache Dorfbewohner hat keine besonderen Fähigkeiten, ist aber dennoch wichtig für das Dorf. Er muss durch Beobachtung und Diskussion die Werwölfe entlarven.',
      specialAbilities: [
        'Keine speziellen Fähigkeiten',
        'Erwacht nicht nachts',
        'Stimmt tagsüber mit ab'
      ],
      wakeUpOrder: undefined,
      interactions: [
        'Alle Rollen: Muss durch Beobachtung und Logik die Werwölfe finden'
      ],
      tips: [
        'Beobachte das Verhalten der anderen Spieler genau',
        'Beteilige dich aktiv an Diskussionen',
        'Deine Stimme ist genauso wichtig wie die der Sonderrollen'
      ]
    },
    {
      id: 'maedchen',
      name: 'Mädchen',
      team: 'dorfbewohner',
      imageUrl: 'assets/cards/maedchen.jpg',
      description: 'Das kleine Mädchen ist neugierig und darf nachts heimlich spähen, wenn die Werwölfe erwachen. Aber Vorsicht - wenn sie erwischt wird, stirbt sie sofort.',
      specialAbilities: [
        'Darf während der Werwolf-Phase die Augen leicht öffnen',
        'Kann versuchen zu erkennen, wer die Werwölfe sind',
        'Stirbt sofort, wenn die Werwölfe sie beim Spähen erwischen'
      ],
      wakeUpOrder: undefined,
      interactions: [
        'Werwölfe: Kann sie beim Spähen identifizieren, riskiert aber den sofortigen Tod',
        'Spielleiter: Muss besonders aufmerksam sein'
      ],
      tips: [
        'Sei sehr vorsichtig beim Spähen',
        'Öffne die Augen nur ganz leicht',
        'Die Informationen können wertvoll sein, aber das Risiko ist hoch'
      ]
    }
  ];

  private cardsSubject = new BehaviorSubject<WerwolfCard[]>(this.cards);
  public cards$ = this.cardsSubject.asObservable();

  constructor() {}

  getAllCards(): Observable<WerwolfCard[]> {
    return this.cards$;
  }

  getCardById(id: string): Observable<WerwolfCard | undefined> {
    return of(this.cards.find(card => card.id === id));
  }

  searchCards(query: string): Observable<WerwolfCard[]> {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      return of(this.cards);
    }

    const filtered = this.cards.filter(card =>
      card.name.toLowerCase().includes(lowerQuery) ||
      card.description.toLowerCase().includes(lowerQuery) ||
      card.team.toLowerCase().includes(lowerQuery) ||
      card.specialAbilities.some(ability => ability.toLowerCase().includes(lowerQuery))
    );

    return of(filtered);
  }

  filterByTeam(team: string): Observable<WerwolfCard[]> {
    if (team === 'alle') {
      return of(this.cards);
    }

    const filtered = this.cards.filter(card => card.team === team);
    return of(filtered);
  }
}
