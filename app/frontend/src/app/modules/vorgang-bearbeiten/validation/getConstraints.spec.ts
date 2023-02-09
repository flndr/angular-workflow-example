import { validate }                     from './validate';
import { ConstraintsPerProperty }       from './getConstraints';
import { VorgangBearbeitenValidierung } from './models/VorgangBearbeitenValidierung';
import { defaultValues }                from './defaultValues';

describe( 'Form Validation', () => {
    
    let data : VorgangBearbeitenValidierung;
    let errors : ConstraintsPerProperty;
    
    beforeAll( () => {
        data = {
            ...JSON.parse( JSON.stringify( defaultValues ) ),
            isManager            : false,
            runBackendValidation : false
        };
    } );
    
    describe( 'Kürzel Begünstigter', () => {
        
        test( 'Kürzel muss gesetzt sein', async () => {
            
            data.beguenstigterKuerzel = '';
            
            errors = await validate( data );
            expect( errors ).toEqual( errorListContaining( 'beguenstigterKuerzel', 'isNotEmpty' ) );
            
            data.beguenstigterKuerzel = 'TFL';
            
            errors = await validate( data );
            expect( errors ).not.toEqual( errorListContaining( 'beguenstigterKuerzel', 'isNotEmpty' ) );
            
        } );
        
    } );
    
    describe( 'BKZ', () => {
        
        test( 'BKZ muss gesetzt sein', async () => {
            
            data.bkz = '';
            
            errors = await validate( data );
            expect( errors ).toEqual( errorListContaining( 'bkz', 'isNotEmpty' ) );
            
            data.bkz = 'IPU Tischtennis Club';
            
            errors = await validate( data );
            expect( errors ).not.toEqual( errorListContaining( 'bkz', 'isNotEmpty' ) );
            
        } );
        
    } );
    
    describe( 'Kürzel Genehmiger', () => {
        
        test( 'Kürzel nur prüfen, wenn User kein Manager ist', async () => {
            
            data.isManager         = false;
            data.genehmigerKuerzel = '';
            
            errors = await validate( data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'isNotEmpty' ) );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'TFL';
            
            errors = await validate( data );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'isNotEmpty' ) );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
        } );
        
        test( 'Kürzel muss aus 3 Grossbuchstaben bestehen', async () => {
            
            data.isManager = false;
            
            data.genehmigerKuerzel = '123';
            
            errors = await validate( data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'AS';
            
            errors = await validate( data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'abc';
            
            errors = await validate( data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'TFL';
            
            errors = await validate( data );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
        } );
        
        test( 'Kürzel ignorieren, wenn User Manager ist', async () => {
            
            data.isManager         = true;
            data.genehmigerKuerzel = '';
            
            errors = await validate( data );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'isNotEmpty' ) );
            
        } );
        
    } );
    
    describe( 'Individual Bestellungen', () => {
    
        describe( 'Felder', () => {
            
            test( 'Titel darf nicht leer sein', async () => {
                
                const bestellungId1 = 'bestellung-id-1';
                const bestellungId2 = 'bestellung-id-2';
                
                const path1 = [ 'individualBestellungen', bestellungId1, 'titel' ].join( '.' );
                const path2 = [ 'individualBestellungen', bestellungId2, 'titel' ].join( '.' );
                
                data.individualBestellungen[ bestellungId1 ] = {
                    titel        : '',
                    bestellungId : '',
                    kosten       : 0,
                    beschreibung : ''
                };
                
                data.individualBestellungen[ bestellungId2 ] = {
                    titel        : '',
                    bestellungId : '',
                    kosten       : 0,
                    beschreibung : ''
                };
                
                errors = await validate( data );
                expect( errors ).toEqual( errorListContaining( path1, 'isNotEmpty' ) );
                expect( errors ).toEqual( errorListContaining( path2, 'isNotEmpty' ) );
                
                data.individualBestellungen[ bestellungId2 ].titel = 'blah';
                
                errors = await validate( data );
                expect( errors ).toEqual( errorListContaining( path1, 'isNotEmpty' ) );
                expect( errors ).not.toEqual( errorListContaining( path2, 'isNotEmpty' ) );
                
            } );
            
            test( 'Beschreibung darf nicht leer sein', async () => {
                
                const bestellungId1 = 'bestellung-id-1';
                
                const path1 = [ 'individualBestellungen', bestellungId1, 'beschreibung' ].join( '.' );
                
                data.individualBestellungen[ bestellungId1 ] = {
                    titel        : '',
                    bestellungId : '',
                    kosten       : 0,
                    beschreibung : ''
                };
                
                errors = await validate( data );
                expect( errors ).toEqual( errorListContaining( path1, 'isNotEmpty' ) );
                
                data.individualBestellungen[ bestellungId1 ].beschreibung = 'blah';
                
                errors = await validate( data );
                expect( errors ).not.toEqual( errorListContaining( path1, 'isNotEmpty' ) );
                
            } );
            
            test( 'Kosten müssen größer gleich 0 sein', async () => {
                
                const bestellungId1 = 'bestellung-id-1';
                
                const path1 = [ 'individualBestellungen', bestellungId1, 'kosten' ].join( '.' );
                
                data.individualBestellungen[ bestellungId1 ] = {
                    titel        : '',
                    bestellungId : '',
                    kosten       : -1,
                    beschreibung : ''
                };
                
                errors = await validate( data );
                
                expect( errors ).toEqual( errorListContaining( path1, 'min' ) );
                
                data.individualBestellungen[ bestellungId1 ].kosten = 5;
                
                errors = await validate( data );
                expect( errors ).not.toEqual( errorListContaining( path1, 'min' ) );
                
            } );
            
            test( 'Kosten muss eine Zahl sein', async () => {
                
                const bestellungId1 = 'bestellung-id-1';
                
                const path1 = [ 'individualBestellungen', bestellungId1, 'kosten' ].join( '.' );
                
                data.individualBestellungen[ bestellungId1 ] = {
                    titel        : '',
                    bestellungId : '',
                    kosten       : 'etz' as unknown as number,
                    beschreibung : ''
                };
                
                errors = await validate( data );
                expect( errors ).toEqual( errorListContaining( path1, 'isNumber' ) );
                
                data.individualBestellungen[ bestellungId1 ].kosten = 1.123;
                
                errors = await validate( data );
                expect( errors ).not.toEqual( errorListContaining( path1, 'min' ) );
                
            } );
            
        } );
    } );
    
} );

/*
    [
      {
        property: 'abholung.abholungArt',
        constraints: { isEnum: 'abholungArt must be a valid enum value' }
      },
      {
        property: 'bkzAuswahl.bkz',
        constraints: { isNotEmpty: 'bkz should not be empty' }
      },
      {
        property: 'mitarbeiterAuswahl.kuerzel',
        constraints: { isNotEmpty: 'Bitte wähle einen Mitarbeiter aus.' }
      }
    ]
 */

function errorListContaining( property : string, constraint : string ) {
    return expect.arrayContaining( [
        expect.objectContaining( {
            property,
            constraints : expect.objectContaining( {
                [ constraint ] : expect.any( String )
            } )
        } )
    ] );
}
