export interface WerwolfCard {
  id: string;
  name: string;
  team: 'dorfbewohner' | 'werwolf' | 'neutral' | 'liebende';
  imageUrl: string;
  description: string;
  specialAbilities: string[];
  wakeUpOrder?: number;
  interactions?: string[];
  tips?: string[];
}

export type CardTeam = 'dorfbewohner' | 'werwolf' | 'neutral' | 'liebende' | 'alle';
