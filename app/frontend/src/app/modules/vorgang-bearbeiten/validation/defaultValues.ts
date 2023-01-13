import { AbholungArt }           from '@tom/models';
import { VorgangBearbeitenForm } from './models/VorgangBearbeitenForm';

export const defaultValues : VorgangBearbeitenForm = {
    abholungArt                        : AbholungArt.KURIER,
    beguenstigterKuerzel               : '',
    bkz                                : '',
    checkboxAllesGeprueftUndBestaetigt : false,
    genehmigerKuerzel                  : '',
    individualBestellungen             : [],
    standardHardwareIds                : [],
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
