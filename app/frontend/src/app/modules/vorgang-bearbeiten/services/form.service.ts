import objectPath          from 'object-path';
import { BehaviorSubject } from 'rxjs';
import { debounce }        from 'throttle-debounce';
import { Injectable }      from '@angular/core';
import { FormControl }     from '@angular/forms';

import { Vorgang } from '@tom/models';

import { VorgangBearbeitenSchritt } from '../../shared/model/VorgangBearbeitenSchritt';
import { NavigationItem }           from '../model/Navigation';
import { Navigation }               from '../model/Navigation';
import { defaultValues }            from '../validation/defaultValues';
import { ConstraintsPerProperty }   from '../validation/getConstraints';
import { VorgangBearbeitenForm }    from '../validation/models/VorgangBearbeitenForm';
import { validate }                 from '../validation/validate';

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
    
    static SCHRITTE : Record<VorgangBearbeitenSchritt, Record<string, FormControl>> = {
        ABHOLUNG              : {
            'abholungArt' : new FormControl( defaultValues.abholungArt ),
        },
        BKZ_AUSWAHL           : {
            'bkz' : new FormControl( defaultValues.bkz ),
        },
        GENEHMIGUNG           : {
            'genehmigerKuerzel' : new FormControl( defaultValues.genehmigerKuerzel ),
        },
        INDIVIDUAL_BESTELLUNG : {
            'individualBestellungen' : new FormControl( defaultValues.individualBestellungen ),
        },
        LIEFERANSCHRIFT       : {
            'lieferanschrift.vorname'  : new FormControl( defaultValues.lieferanschrift?.vorname || '' ),
            'lieferanschrift.nachname' : new FormControl( defaultValues.lieferanschrift?.nachname || '' ),
            'lieferanschrift.strasse'  : new FormControl( defaultValues.lieferanschrift?.strasse || '' ),
            'lieferanschrift.plz'      : new FormControl( defaultValues.lieferanschrift?.plz || '' ),
            'lieferanschrift.ort'      : new FormControl( defaultValues.lieferanschrift?.ort || '' ),
            'lieferanschrift.land'     : new FormControl( defaultValues.lieferanschrift?.land || '' ),
        },
        MITARBEITER_AUSWAHL   : {
            'beguenstigterKuerzel' : new FormControl( defaultValues.beguenstigterKuerzel ),
        },
        STANDARD_HARDWARE     : {
            'standardHardwareAuswahl.laptopArtikelId'  : new FormControl( defaultValues.standardHardwareAuswahl.laptopArtikelId ),
            'standardHardwareAuswahl.headsetArtikelId' : new FormControl( defaultValues.standardHardwareAuswahl.headsetArtikelId ),
            'standardHardwareAuswahl.tascheArtikelId'  : new FormControl( defaultValues.standardHardwareAuswahl.tascheArtikelId ),
        },
        ABSCHLUSS             : {
            'checkboxAllesGeprueftUndBestaetigt' : new FormControl( defaultValues.checkboxAllesGeprueftUndBestaetigt ),
        },
    };
    
    private _vorgang : Vorgang | null = null;
    private _isValidating : boolean   = false;
    
    private _schritt : VorgangBearbeitenSchritt | null = null;
    
    private _showErrors : boolean = false;
    
    private _formularDaten : VorgangBearbeitenForm = defaultValues;
    //private _constraints : ConstraintsPerProperty  = [];
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
    
    private _debouncedValidationsRunning = 0;
    private _debouncedValidation;
    
    private _debounceValidation = false;
    
    private _constraintsSubject = new BehaviorSubject<ConstraintsPerProperty>( [] );
    //
    //private _navigationSubject = new BehaviorSubject<Navigation>( {
    //    [ VorgangBearbeitenSchritt.ABHOLUNG ]              : newNavItem(),
    //    [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ]           : newNavItem(),
    //    [ VorgangBearbeitenSchritt.GENEHMIGUNG ]           : newNavItem(),
    //    [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : newNavItem(),
    //    [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ]       : newNavItem(),
    //    [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ]   : newNavItem(),
    //    [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ]     : newNavItem(),
    //    [ VorgangBearbeitenSchritt.ABSCHLUSS ]             : newNavItem(),
    //} );
    //
    public constraints$ = this._constraintsSubject.asObservable();
    
    //public navigation$  = this._navigationSubject.asObservable();
    
    constructor() {
        this._debouncedValidation = debounce( 2000, this.validate.bind( this ), { atBegin : false } );
    }
    
    get vorgang() {
        if ( !this._vorgang ) {
            throw new Error( 'Vorgang wurde noch nicht gesetzt!' );
        }
        return this._vorgang;
    }
    
    get debounceValidation() {
        return this._debounceValidation;
    }
    
    get showErrors() {
        return this._showErrors;
    }
    
    //
    //get constraints() {
    //    return this._constraints;
    //}
    
    getAllConstraints() {
        return this._constraintsSubject.getValue();
    }
    
    get navigation() : Navigation {
        return this._navigation;
    }
    
    toggleShowErrors() : void {
        this._showErrors = !this._showErrors;
    }
    
    toggleDebounceValidation() : void {
        this._debounceValidation = !this._debounceValidation;
    }
    
    setShowErrors( show : boolean ) : void {
        this._showErrors = show;
    }
    
    getValues( fields : string[] ) : Record<string, any> {
        const ret : Record<string, any> = {};
        fields.forEach( field => {
            if ( objectPath.has( this._formularDaten, field ) ) {
                ret[ field ] = objectPath.get( this._formularDaten, field );
            } else {
                console.error( `Feld "${ field }" kann nicht gelesen werden, weil nicht gefunden.` );
            }
        } )
        
        return ret;
    }
    
    getConstraints( fields : string[] ) : ConstraintsPerProperty {
        return this.getAllConstraints().filter( c => fields.includes( c.property ) );
    }
    
    hasConstraints( fields : string[] ) : boolean {
        return this.getConstraints( fields ).length > 0;
    }
    
    async setVorgang( v : Vorgang ) {
        this._vorgang = v;
        await this.updateFormValues( v, { ignoreAdditionalFields : true } );
    }
    
    setSchritt( s : VorgangBearbeitenSchritt ) {
        this._schritt = s;
    }
    
    private async validate() {
        
        console.log( 'validating...' );
        
        this._isValidating = true;
        
        const constraints = await validate( {
            ...this._formularDaten,
            isManager            : false, // TODO set real value
            runBackendValidation : false, // TODO set real value
        } );
        
        const navigation = JSON.parse( JSON.stringify( this._navigation ) ) as Navigation;
        
        Object.keys( FormService.SCHRITTE ).forEach( key => {
            const schritt = key as VorgangBearbeitenSchritt;
            const fields  = Object.keys( FormService.SCHRITTE[ schritt ] );
            
            const constraintsForSchritt      = constraints.filter( c => fields.includes( c.property ) );
            navigation[ schritt ].isInvalid  = constraintsForSchritt.length > 0;
            navigation[ schritt ].isValid    = constraintsForSchritt.length === 0;
            navigation[ schritt ].errorCount = constraintsForSchritt.length;
        } );
        
        this._navigation = navigation;
        
        this._constraintsSubject.next( constraints );
        
        //console.log( constraints );
        //console.log( navigation );
        
        this._isValidating = false;
    }
    
    async updateFormValues(
        valueByProperty : Record<string, any>,
        option : { ignoreAdditionalFields : boolean } = { ignoreAdditionalFields : false }
    ) {
        
        for ( const property in valueByProperty ) {
            if ( objectPath.has( this._formularDaten, property ) ) {
                objectPath.set( this._formularDaten, property, valueByProperty[ property ] );
            } else {
                if ( !option.ignoreAdditionalFields ) {
                    console.error( `Property "${ property }" kann nicht aktualisiert werden, weil nicht gefunden.` );
                }
            }
        }
        
        this._vorgang = {
            ...this.vorgang,
            ...this._formularDaten
        };
        
        if ( this._debounceValidation ) {
            await this._debouncedValidation();
        } else {
            await this.validate();
        }
    }
    
}
