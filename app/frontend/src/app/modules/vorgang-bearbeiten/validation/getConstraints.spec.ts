import { getConstraints }               from './getConstraints';
import { ConstraintsPerProperty }       from './getConstraints';
import { VorgangBearbeitenValidierung } from './models/VorgangBearbeitenValidierung';
import { defaultValues }                from './defaultValues';

describe( 'Form Validation', () => {
    
    let data : VorgangBearbeitenValidierung;
    let errors : ConstraintsPerProperty;
    
    beforeAll( () => {
        data = JSON.parse( JSON.stringify( defaultValues ) );
    } );
    
    describe( 'Kürzel Begünstigter', () => {
        
        test( 'Kürzel muss gesetzt sein', async () => {
            
            data.beguenstigterKuerzel = '';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).toEqual( errorListContaining( 'beguenstigterKuerzel', 'isNotEmpty' ) );
            
            data.beguenstigterKuerzel = 'TFL';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).not.toEqual( errorListContaining( 'beguenstigterKuerzel', 'isNotEmpty' ) );
            
        } );
        
    } );
    
    describe( 'BKZ', () => {
        
        test( 'BKZ muss gesetzt sein', async () => {
            
            data.bkz = '';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).toEqual( errorListContaining( 'bkz', 'isNotEmpty' ) );
            
            data.bkz = 'IPU Tischtennis Club';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).not.toEqual( errorListContaining( 'bkz', 'isNotEmpty' ) );
            
        } );
        
    } );
    
    describe( 'Kürzel Genehmiger', () => {
        
        test( 'Kürzel nur prüfen, wenn User kein Manager ist', async () => {
            
            data.isManager         = false;
            data.genehmigerKuerzel = '';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'isNotEmpty' ) );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'TFL';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'isNotEmpty' ) );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
        } );
        
        test( 'Kürzel muss aus 3 Grossbuchstaben bestehen', async () => {
            
            data.isManager = false;
            
            data.genehmigerKuerzel = '123';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'AS';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'abc';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
            data.genehmigerKuerzel = 'TFL';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'matches' ) );
            
        } );
        
        test( 'Kürzel ignorieren, wenn User Manager ist', async () => {
            
            data.isManager         = true;
            data.genehmigerKuerzel = '';
            
            errors = await getConstraints( VorgangBearbeitenValidierung, data );
            expect( errors ).not.toEqual( errorListContaining( 'genehmigerKuerzel', 'isNotEmpty' ) );
            
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
