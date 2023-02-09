import { getConstraints }                 from './getConstraints';
import { ConstraintsPerProperty }         from './getConstraints';
import { IndividualBestellungValidation } from './models/dtos/IndividualBestellungValidation';
import { VorgangBearbeitenValidierung }   from './models/VorgangBearbeitenValidierung';

export const validate = async ( data : VorgangBearbeitenValidierung ) : Promise<ConstraintsPerProperty> => {
    let constraints = await getConstraints( VorgangBearbeitenValidierung, data );
    
    for ( const id of Object.keys( data.individualBestellungen ) ) {
        constraints = [
            ...constraints,
            ...await getConstraints(
                IndividualBestellungValidation,
                data.individualBestellungen[ id ],
                [ 'individualBestellungen', id ].join( '.' )
            ),
        ];
    }
    
    return constraints;
}

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
