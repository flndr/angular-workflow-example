import { Vorgang } from '@tom/models';

export type VorgangBearbeitenForm = Omit<Vorgang, 'id' | 'erstellungZeitpunkt' | 'erstellerKuerzel' | 'status'>
