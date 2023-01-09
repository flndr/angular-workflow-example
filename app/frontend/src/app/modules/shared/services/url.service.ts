import { Injectable } from '@angular/core';

import { VorgangBearbeitenSchritt } from '@tom/models';

@Injectable( {
    providedIn : 'root'
} )
export class UrlService {
    
    private _vorgangId : string | null = null;
    
    static MODUL_URL = {
        VORGANG_UEBERSICHT      : '',
        VORGANG_BEARBEITEN      : 'vorgang-bearbeiten',
        VORGANG_ZUSAMMENFASSUNG : 'vorgang-zusammenfassung',
        FEHLER                  : 'fehler',
    };
    
    static SEITEN_URL = {
        VORGANG_BEARBEITEN : 'vorgang-bearbeiten',
        VORGANG_DETAILS    : 'vorgang-details',
        FEHLER             : 'fehler',
    };
    
    static BEARBEITUNG_SCHRITT_URL : Record<VorgangBearbeitenSchritt, string> = {
        [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ]   : 'mitarbeiter',
        [ VorgangBearbeitenSchritt.ABHOLUNG ]              : 'abholung',
        [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ]           : 'bkz-auswahl',
        [ VorgangBearbeitenSchritt.GENEHMIGUNG ]           : 'genehmigung',
        [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : 'individualbestellung',
        [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ]       : 'lieferung',
        [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ]     : 'standard-hardware',
        [ VorgangBearbeitenSchritt.ABSCHLUSS ]             : 'abschluss',
    }
    
    setVorgangId( id : string ) : void {
        this._vorgangId = id;
    }
    
    getVorgangId() : string {
        if ( !this._vorgangId ) {
            throw new Error( 'VorgangID wurde noch nicht gesetzt!' );
        }
        return this._vorgangId;
    }
    
    routeToVorgangBearbeiten( schritt : VorgangBearbeitenSchritt, vorgangId ? : string ) : string {
        return '/' + [
            UrlService.SEITEN_URL.VORGANG_BEARBEITEN,
            vorgangId || this.getVorgangId(),
            UrlService.BEARBEITUNG_SCHRITT_URL[ schritt ],
        ].join( '/' );
    }
    
}
