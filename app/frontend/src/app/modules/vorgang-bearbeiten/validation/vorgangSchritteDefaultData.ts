import { VorgangBearbeitenSchritt }   from '@tom/models';
import { VorgangSchritteValidations } from './models/VorgangSchritteValidations';

export const vorgangSchritteDefaultData : VorgangSchritteValidations = {
    
    isManager : false,
    
    [ VorgangBearbeitenSchritt.ABHOLUNG ] : {
        abholungArt : null
    },
    
    [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ] : {
        bkz : null
    },
    
    [ VorgangBearbeitenSchritt.GENEHMIGUNG ] : {
        kuerzel     : null,
        anmerkungen : null
    },
    
    [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : {
        bestellungen : []
    },
    
    [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ] : {
        vorname  : '',
        nachname : '',
        strasse  : '',
        plz      : '',
        ort      : '',
        land     : '',
    },
    
    [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ] : {
        kuerzel : null
    },
    
    [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ] : {
        artikel : []
    },
    
    [ VorgangBearbeitenSchritt.ABSCHLUSS ] : {
        checkboxAllesGeprueftUndBestaetigt : false
    }
    
}
