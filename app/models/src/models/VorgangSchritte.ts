import { VorgangBearbeitenSchritt } from './VorgangBearbeitenSchritt';
import { Abholung }                 from './VorgangBearbeitenSchritte/Abholung';
import { Abschluss }                from './VorgangBearbeitenSchritte/Abschluss';
import { BkzAuswahl }               from './VorgangBearbeitenSchritte/BkzAuswahl';
import { Genehmigung }              from './VorgangBearbeitenSchritte/Genehmigung';
import { IndividualBestellungen }   from './VorgangBearbeitenSchritte/IndividualBestellungen';
import { Lieferanschrift }          from './VorgangBearbeitenSchritte/Lieferanschrift';
import { MitarbeiterAuswahl }       from './VorgangBearbeitenSchritte/MitarbeiterAuswahl';
import { StandardHardwareAuswahl }  from './VorgangBearbeitenSchritte/StandardHardwareAuswahl';

export interface VorgangSchritte {
    [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ] : MitarbeiterAuswahl;
    [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ] : BkzAuswahl;
    [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ] : StandardHardwareAuswahl;
    [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : IndividualBestellungen;
    [ VorgangBearbeitenSchritt.ABHOLUNG ] : Abholung;
    [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ] : Lieferanschrift;
    [ VorgangBearbeitenSchritt.GENEHMIGUNG ] : Genehmigung;
    [ VorgangBearbeitenSchritt.ABSCHLUSS ] : Abschluss;
}
