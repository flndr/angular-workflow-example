import { AbholungArt }          from './VorgangBearbeitenSchritte/AbholungArt';
import { IndividualBestellung } from './VorgangBearbeitenSchritte/IndividualBestellung';
import { Lieferanschrift }      from './VorgangBearbeitenSchritte/Lieferanschrift';
import { VorgangStatus }        from './VorgangStatus';

export interface Vorgang {
    id : string;
    erstellerKuerzel : string;
    status : VorgangStatus;
    erstellungZeitpunkt : string;
    
    // formData
    titel : string;
    genehmigerKuerzel : string;
    beguenstigterKuerzel : string;
    bkz : string;
    standardHardwareIds : Array<string>;
    individualBestellungen : Array<IndividualBestellung>;
    abholungArt : AbholungArt;
    lieferanschrift : Lieferanschrift | null;
    checkboxAllesGeprueftUndBestaetigt : boolean;
}
