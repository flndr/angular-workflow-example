import { Injectable }  from '@angular/core';
import { FormControl } from '@angular/forms';
import objectPath      from 'object-path';

import { Vorgang }         from '@tom/models';
import { BehaviorSubject } from 'rxjs';
import { debounce }        from 'throttle-debounce';

import { VorgangBearbeitenSchritt }     from '../../shared/model/VorgangBearbeitenSchritt';
import { NavigationForUi }              from '../model/Navigation';
import { NavigationItem }               from '../model/Navigation';
import { Navigation }                   from '../model/Navigation';
import { defaultValues }                from '../validation/defaultValues';
import { ConstraintsPerProperty }       from '../validation/getConstraints';
import { VorgangBearbeitenForm }        from '../validation/models/VorgangBearbeitenForm';
import { VorgangBearbeitenValidierung } from '../validation/models/VorgangBearbeitenValidierung';
import { validate }                     from '../validation/validate';

const debouncedValidate = debounce( 1000, validate, { atBegin : false } );

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
    
    private _debouncedValidationsRunning = 0;
    private _debouncedValidation;
    
    //private _constraintsSubject = new BehaviorSubject<ConstraintsPerProperty>( [] );
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
    //public constraints$ = this._constraintsSubject.asObservable();
    //public navigation$  = this._navigationSubject.asObservable();
    
    constructor() {
        this._debouncedValidation = debounce( 3000, this.validate.bind( this ), { atBegin : false } );
    }
    
    get vorgang() {
        if ( !this._vorgang ) {
            throw new Error( 'Vorgang wurde noch nicht gesetzt!' );
        }
        return this._vorgang;
    }
    
    get isValidating() {
        return this._isValidating;
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
    
    toggleShowErrors() : void {
        this._showErrors = !this._showErrors;
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
        return this._constraints.filter( c => fields.includes( c.property ) );
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
        
        this._constraints = await validate( {
            ...this._formularDaten,
            isManager            : false, // TODO set real value
            runBackendValidation : false, // TODO set real value
        } );
        
        const navigation = JSON.parse( JSON.stringify( this._navigation ) ) as Navigation;
        
        Object.keys( FormService.SCHRITTE ).forEach( key => {
            const schritt     = key as VorgangBearbeitenSchritt;
            const constraints = this.getConstraints( Object.keys( FormService.SCHRITTE[ schritt ] ) );
            
            navigation[ schritt ].isInvalid  = constraints.length > 0;
            navigation[ schritt ].isValid    = constraints.length === 0;
            navigation[ schritt ].errorCount = constraints.length;
        } );
        
        this._navigation = navigation;
        
        this._formularDaten = {
            ...this._formularDaten
        };
        
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
        
        await this.validate();
        //await this._debouncedValidation();
    }
    
}
