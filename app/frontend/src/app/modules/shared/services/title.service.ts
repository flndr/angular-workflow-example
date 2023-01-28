import { Injectable } from '@angular/core';

import { VorgangBearbeitenSchritt } from '../model/VorgangBearbeitenSchritt';

@Injectable( {
    providedIn : 'root'
} )
export class TitleService {
    
    static BASE = 'Workflow Example';
    
    static VORGANG_UEBERSICHT      = 'Vorgang Übersicht - ' + TitleService.BASE;
    static VORGANG_ZUSAMMENFASSUNG = 'Vorgang Zusammenfassung - ' + TitleService.BASE;
    
    static bearbeitenSchritt( schritt : VorgangBearbeitenSchritt ) : string {
        const BEARBEITEN_SCHRITT : Record<Partial<VorgangBearbeitenSchritt>, string> = {
            [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ]   : 'Mitarbeiter',
            [ VorgangBearbeitenSchritt.ABHOLUNG ]              : 'Abholung',
            [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ]           : 'BKZ',
            [ VorgangBearbeitenSchritt.GENEHMIGUNG ]           : 'Genehmigung',
            [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : 'Individualbestellung',
            [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ]       : 'Lieferanschrift',
            [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ]     : 'Hardware',
            [ VorgangBearbeitenSchritt.ABSCHLUSS ]             : 'Abschluss',
        };
        return [
            'Vorgang bearbeiten',
            BEARBEITEN_SCHRITT[ schritt ],
            TitleService.BASE
        ].join( ' - ' );
    }
    
}
