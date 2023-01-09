import { VorgaengeLadenRequest }  from "./api/VorgaengeLadenRequest";
import { VorgaengeLadenResponse } from "./api/VorgaengeLadenResponse";

import { Abholung }                from "./models/VorgangBearbeitenSchritte/Abholung";
import { AbholungArt }             from "./models/VorgangBearbeitenSchritte/AbholungArt";
import { Abschluss }               from "./models/VorgangBearbeitenSchritte/Abschluss";
import { BkzAuswahl }              from "./models/VorgangBearbeitenSchritte/BkzAuswahl";
import { Genehmigung }             from "./models/VorgangBearbeitenSchritte/Genehmigung";
import { IndividualBestellung }    from "./models/VorgangBearbeitenSchritte/IndividualBestellung";
import { IndividualBestellungen }  from "./models/VorgangBearbeitenSchritte/IndividualBestellungen";
import { Lieferanschrift }         from "./models/VorgangBearbeitenSchritte/Lieferanschrift";
import { MitarbeiterAuswahl }      from "./models/VorgangBearbeitenSchritte/MitarbeiterAuswahl";
import { StandardHardwareAuswahl } from "./models/VorgangBearbeitenSchritte/StandardHardwareAuswahl";

import { Vorgang }                    from "./models/Vorgang";
import { VorgangBearbeitenSchritt }   from "./models/VorgangBearbeitenSchritt";
import { VorgangSchritte }            from "./models/VorgangSchritte";
import { VorgangStatus }              from "./models/VorgangStatus";
import { VorgangZwischengespeichert } from "./models/VorgangZwischengespeichert";

const helloFromModels = () => console.log( 'helloFromModels' );

export {
    
    helloFromModels,
    
    VorgaengeLadenRequest,
    VorgaengeLadenResponse,
    
    Abholung,
    AbholungArt,
    Abschluss,
    BkzAuswahl,
    Genehmigung,
    IndividualBestellung,
    IndividualBestellungen,
    Lieferanschrift,
    MitarbeiterAuswahl,
    StandardHardwareAuswahl,
    
    Vorgang,
    VorgangBearbeitenSchritt,
    VorgangSchritte,
    VorgangStatus,
    VorgangZwischengespeichert,
    
};
