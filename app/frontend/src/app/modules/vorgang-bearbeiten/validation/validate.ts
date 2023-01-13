import { getConstraints }               from './getConstraints';
import { ConstraintsPerProperty }       from './getConstraints';
import { VorgangBearbeitenValidierung } from './models/VorgangBearbeitenValidierung';

export const validate = async ( data : VorgangBearbeitenValidierung ) : Promise<ConstraintsPerProperty> => {
    return getConstraints( VorgangBearbeitenValidierung, data );
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
