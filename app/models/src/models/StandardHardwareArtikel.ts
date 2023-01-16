import { StandardHardwareKategorie } from './StandardHardwareKategorie';

export interface StandardHardwareArtikel {
    kategorie : StandardHardwareKategorie;
    id : string;
    titel : string;
    beschreibung : string;
    imgUrl : string;
    kosten : number;
}
