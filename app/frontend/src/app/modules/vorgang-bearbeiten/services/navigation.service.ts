import { Injectable } from '@angular/core';

import { VorgangBearbeitenSchritt as Schritt } from '../../shared/model/VorgangBearbeitenSchritt';
import { UrlService }                          from '../../shared/services/url.service';
import { NavigationItem }                      from '../model/Navigation';
import { Navigation }                          from '../model/Navigation';

const newNavItem = () : NavigationItem => ( {
    isValid    : false,
    isInvalid  : false,
    isVisible  : true,
    errorCount : 0
} );

@Injectable( {
    providedIn : 'root'
} )
export class NavigationService {
    
    private _vorgangId : string | null = null;
    
    constructor(
        private urlService : UrlService
    ) {}
    
    get routeBySchritt() : Record<Schritt, string> {
        return {
            [ Schritt.ABHOLUNG ]              : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.ABHOLUNG ),
            [ Schritt.BKZ_AUSWAHL ]           : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.BKZ_AUSWAHL ),
            [ Schritt.GENEHMIGUNG ]           : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.GENEHMIGUNG ),
            [ Schritt.INDIVIDUAL_BESTELLUNG ] : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.INDIVIDUAL_BESTELLUNG ),
            [ Schritt.LIEFERANSCHRIFT ]       : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.LIEFERANSCHRIFT ),
            [ Schritt.MITARBEITER_AUSWAHL ]   : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.MITARBEITER_AUSWAHL ),
            [ Schritt.STANDARD_HARDWARE ]     : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.STANDARD_HARDWARE ),
            [ Schritt.ABSCHLUSS ]             : this.urlService.routeToVorgangBearbeiten( this._vorgangId!, Schritt.ABSCHLUSS ),
        }
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
    
}
