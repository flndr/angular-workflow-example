import { Injectable }               from '@angular/core';
import { VorgangBearbeitenSchritt } from '../model/VorgangBearbeitenSchritt';

@Injectable( {
    providedIn : 'root'
} )
export class UrlService {
    
    static MODUL_URL = {
        VORGANG_UEBERSICHT      : '',
        VORGANG_BEARBEITEN      : 'vorgang-bearbeiten',
        VORGANG_ZUSAMMENFASSUNG : 'vorgang-zusammenfassung',
        FEHLER                  : 'fehler',
    };
    
    static SEITEN_URL = {
        VORGANG_BEARBEITEN      : 'vorgang-bearbeiten',
        VORGANG_ZUSAMMENFASSUNG : 'vorgang-zusammenfassung',
        FEHLER                  : 'fehler',
    };
    
    static ERSTER_SCHRITT : VorgangBearbeitenSchritt = VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL;
    
    static BEARBEITUNG_SCHRITT_URL : Record<Partial<VorgangBearbeitenSchritt>, string> = {
        [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ]   : 'mitarbeiter',
        [ VorgangBearbeitenSchritt.ABHOLUNG ]              : 'abholung',
        [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ]           : 'bkz-auswahl',
        [ VorgangBearbeitenSchritt.GENEHMIGUNG ]           : 'genehmigung',
        [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : 'individualbestellung',
        [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ]       : 'lieferung',
        [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ]     : 'standard-hardware',
        [ VorgangBearbeitenSchritt.ABSCHLUSS ]             : 'abschluss',
    };
    
    static PARAM_INDIVIDUAL_HARDWARE_ID = 'id';
    
    routeToVorgangBearbeiten( vorgangId : string, schritt ? : VorgangBearbeitenSchritt ) : string {
        return '/' + [
            UrlService.SEITEN_URL.VORGANG_BEARBEITEN,
            vorgangId,
            schritt
            ? UrlService.BEARBEITUNG_SCHRITT_URL[ schritt ]
            : UrlService.BEARBEITUNG_SCHRITT_URL[ UrlService.ERSTER_SCHRITT ],
        ].join( '/' );
    }
    
    routeToVorgangBearbeitenIndividualHardware( vorgangId : string, id : string ) : string {
        return this.routeToVorgangBearbeiten( vorgangId, VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ) + '/' + id;
    }
    
    routeToVorgangZusammenfassung( vorgangId : string ) : string {
        return '/' + [
            UrlService.SEITEN_URL.VORGANG_ZUSAMMENFASSUNG,
            vorgangId,
        ].join( '/' );
    }
    
}
