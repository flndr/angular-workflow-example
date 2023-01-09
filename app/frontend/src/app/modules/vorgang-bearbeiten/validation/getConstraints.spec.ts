import { VorgangBearbeitenSchritt } from '@tom/models';

import { vorgangSchritteDefaultData } from './vorgangSchritteDefaultData';
import { getConstraints }             from './getConstraints';
import { ConstraintsPerProperty }     from './getConstraints';
import { VorgangSchritteValidations } from './models/VorgangSchritteValidations';

describe( 'Form Validation', () => {
    
    let data : VorgangSchritteValidations;
    let errors : ConstraintsPerProperty;
    
    beforeAll( () => {
        data = JSON.parse( JSON.stringify( vorgangSchritteDefaultData ) );
    } );
    
    describe( 'MITARBEITER_AUSWAHL', () => {
        
        test( 'Kürzel muss gesetzt sein', async () => {
            
            data[ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ].kuerzel = null;
            
            errors = await getConstraints( VorgangSchritteValidations, data );
            expect( errors )
            .toEqual( errorListContaining( VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL + '.kuerzel', 'isNotEmpty' ) );
            
            data[ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ].kuerzel = 'TFL';
            
            errors = await getConstraints( VorgangSchritteValidations, data );
            expect( errors )
            .not
            .toEqual( errorListContaining( VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL + '.kuerzel', 'isNotEmpty' ) );
            
        } );
        
    } );
    
    describe( 'BKZ_AUSWAHL', () => {
        
        test( 'BKZ muss gesetzt sein', async () => {
            
            data[ VorgangBearbeitenSchritt.BKZ_AUSWAHL ].bkz = null;
            
            errors = await getConstraints( VorgangSchritteValidations, data );
            expect( errors )
            .toEqual( errorListContaining( VorgangBearbeitenSchritt.BKZ_AUSWAHL + '.bkz', 'isNotEmpty' ) );
            
            data[ VorgangBearbeitenSchritt.BKZ_AUSWAHL ].bkz = 'IPU Tischtennis Club';
            
            errors = await getConstraints( VorgangSchritteValidations, data );
            expect( errors )
            .not
            .toEqual( errorListContaining( VorgangBearbeitenSchritt.BKZ_AUSWAHL + '.bkz', 'isNotEmpty' ) );
            
        } );
        
    } );
    
    describe( 'GENEHMIGUNG', () => {
        
        test( 'Kürzel nur prüfen, wenn User kein Manager ist', async () => {
            
            data.isManager                                       = false;
            data[ VorgangBearbeitenSchritt.GENEHMIGUNG ].kuerzel = null;
            
            errors = await getConstraints( VorgangSchritteValidations, data );
            expect( errors )
            .toEqual( errorListContaining( VorgangBearbeitenSchritt.GENEHMIGUNG + '.kuerzel', 'isNotEmpty' ) );
            
            data[ VorgangBearbeitenSchritt.GENEHMIGUNG ].kuerzel = 'TFL';
            
            errors = await getConstraints( VorgangSchritteValidations, data );
            expect( errors )
            .not
            .toEqual( errorListContaining( VorgangBearbeitenSchritt.GENEHMIGUNG + '.kuerzel', 'isNotEmpty' ) );
            
        } );
        
        test( 'Kürzel ignorieren, wenn User Manager ist', async () => {
            
            data.isManager                                       = true;
            data[ VorgangBearbeitenSchritt.GENEHMIGUNG ].kuerzel = null;
            
            errors = await getConstraints( VorgangSchritteValidations, data );
            expect( errors )
            .not
            .toEqual( errorListContaining( VorgangBearbeitenSchritt.GENEHMIGUNG + '.kuerzel', 'isNotEmpty' ) );
            
        } );
        
    } );
    
} );

/*
    error list looks like this:
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
