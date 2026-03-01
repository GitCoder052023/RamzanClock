export interface RamadanDay {
  date: string; // ISO format
  ramadanDay: number;
  sehri: string; // HH:mm
  iftar: string; // HH:mm
}

export interface RamadanEvent {
  type: 'Sehri' | 'Iftar';
  time: string;
  remainingSeconds: number;
}

export interface RamadanState {
  today: RamadanDay | null;
  nextEvent: RamadanEvent | null;
  forecast: RamadanDay[];
}
