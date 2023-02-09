import { AbholungArt }             from './Vorgang/AbholungArt';
import { IndividualBestellung }    from './Vorgang/IndividualBestellung';
import { Lieferanschrift }         from './Vorgang/Lieferanschrift';
import { StandardHardwareAuswahl } from './Vorgang/StandardHardwareAuswahl';
import { VorgangStatus }           from './VorgangStatus';

export interface Vorgang {
    id : string;
    erstellerKuerzel : string;
    status : VorgangStatus;
    erstellungZeitpunkt : string;
    
    // formData
    titel : string;
    genehmigerKuerzel : string;
    genehmigungAnmerkungen : string;
    beguenstigterKuerzel : string;
    bkz : string;
    standardHardwareAuswahl : StandardHardwareAuswahl;
    individualBestellungen : Record<string, IndividualBestellung>;
    abholungArt : AbholungArt;
    lieferanschrift : Lieferanschrift | null;
    checkboxAllesGeprueftUndBestaetigt : boolean;
}
