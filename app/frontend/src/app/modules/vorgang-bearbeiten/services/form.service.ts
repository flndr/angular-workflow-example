import objectPath     from 'object-path';
import { Injectable } from '@angular/core';
import { FormGroup }  from '@angular/forms';

import { VorgangBearbeitenSchritt as Schritt } from '@tom/models';
import { VorgangBearbeitenSchritt }            from '@tom/models';

import { ApiService }                 from '../../shared/services/api.service';
import { NavigationForUi }            from '../model/Navigation';
import { NavigationItem }             from '../model/Navigation';
import { Navigation }                 from '../model/Navigation';
import { ConstraintsPerProperty }     from '../validation/index';
import { VorgangSchritteValidations } from '../validation/index';
import { validate }                   from '../validation/index';
import { vorgangSchritteDefaultData } from '../validation/index';

const newNavItem = () : NavigationItem => ( {
    isValid    : false,
    isInvalid  : false,
    isVisible  : true,
    errorCount : 0
} );

@Injectable( {
    providedIn : 'root'
} )
export class FormService {
    
    private _vorgangId : string | null = null;
    private _showErrors : boolean      = false;
    
    private _schritte : VorgangSchritteValidations = vorgangSchritteDefaultData;
    private _constraints : ConstraintsPerProperty  = [];
    private _navigation : Navigation               = {
        [ VorgangBearbeitenSchritt.ABHOLUNG ]              : newNavItem(),
        [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ]           : newNavItem(),
        [ VorgangBearbeitenSchritt.GENEHMIGUNG ]           : newNavItem(),
        [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : newNavItem(),
        [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ]       : newNavItem(),
        [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ]   : newNavItem(),
        [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ]     : newNavItem(),
        [ VorgangBearbeitenSchritt.ABSCHLUSS ]             : newNavItem(),
    };
    
    constructor(
        private apiService : ApiService,
    ) {}
    
    get schritte() {
        return this._schritte;
    }
    
    get showErrors() {
        return this._showErrors;
    }
    
    get constraints() {
        return this._constraints;
    }
    
    get navigation() : NavigationForUi {
        return Object.values( VorgangBearbeitenSchritt ).map( schritt => {
            return {
                ...this._navigation[ schritt ],
                schritt
            }
        } );
    }
    
    constraintsFilteredBy( schritt : VorgangBearbeitenSchritt ) : ConstraintsPerProperty {
        return this._constraints.filter( c => c.property.startsWith( schritt ) );
    }
    
    schritt( schritt : VorgangBearbeitenSchritt ) {
        return this._schritte[ schritt ];
    }
    
    hasConstraints( schritt : VorgangBearbeitenSchritt ) : boolean {
        return this.constraintsFilteredBy( schritt ).length > 0;
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
    
    async updateFormValues( valueByProperty : Record<string, any> ) {
        for ( const property in valueByProperty ) {
            if ( objectPath.has( this._schritte, property ) ) {
                objectPath.set( this._schritte, property, valueByProperty[ property ] );
            } else {
                console.error( `Property "${ property }" kann nicht aktualisiert werden, weil nicht gefunden.` );
            }
        }
        
        await this.updateConstraints();
    }
    
    async updateConstraints() : Promise<void> {
        this._constraints = await validate( this._schritte );
        
        Object.values( VorgangBearbeitenSchritt ).forEach( schritt => {
            const constraints                      = this.constraintsFilteredBy( schritt );
            this._navigation[ schritt ].isInvalid  = constraints.length > 0;
            this._navigation[ schritt ].isValid    = constraints.length === 0;
            this._navigation[ schritt ].errorCount = constraints.length;
        } );
    }
    
}
