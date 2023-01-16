import { AbholungArt }           from '@tom/models';
import { VorgangBearbeitenForm } from './models/VorgangBearbeitenForm';

export const defaultValues : VorgangBearbeitenForm = {
    abholungArt                        : AbholungArt.KURIER,
    beguenstigterKuerzel               : '',
    bkz                                : '',
    checkboxAllesGeprueftUndBestaetigt : false,
    genehmigerKuerzel                  : '',
    genehmigungAnmerkungen             : '',
    individualBestellungen             : [],
    standardHardwareAuswahl            : {
        headsetArtikelId : null,
        tascheArtikelId  : null,
        laptopArtikelId  : null
    },
    titel                              : '',
    lieferanschrift                    : {
        vorname  : 'hans',
        nachname : '',
        strasse  : '',
        plz      : '',
        ort      : '',
        land     : '',
    }
}
