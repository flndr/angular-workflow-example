import { StandardHardwareKategorie }     from '@tom/models';
import { StandardHardwareArtikel }       from '@tom/models';
import { StandardHardwareLadenResponse } from '@tom/models';
import { VorgangStatus }                 from '@tom/models';
import { AbholungArt }                   from '@tom/models';
import { VorgangSpeichernRequest }       from '@tom/models';
import { VorgangAnlegenResponse }        from '@tom/models';
import { ErrorCode }                     from '@tom/models';
import { ErrorResponse }                 from '@tom/models';
import { ApiUrl }                        from '@tom/models';
import { Vorgang }                       from '@tom/models';
import { VorgaengeLadenRequest }         from '@tom/models';
import { VorgangLadenResponse }          from '@tom/models';
import { v4 as uuid }                    from 'uuid';

import { Request }  from '../models/Request';
import { Response } from '../models/Response';

const id1 = '12345678-1111-uuid-1234-test-vorgang';
const id2 = '12345678-2222-uuid-1234-test-vorgang';
const id3 = '12345678-3333-uuid-1234-test-vorgang';
const id4 = '12345678-4444-uuid-1234-test-vorgang';
const id5 = '12345678-5555-uuid-1234-test-vorgang';

const hw1 = '12345678-1111-uuid-1234-abc-hardware';
const hw2 = '12345678-2222-uuid-1234-abc-hardware';
const hw3 = '12345678-3333-uuid-1234-abc-hardware';
const hw4 = '12345678-4444-uuid-1234-abc-hardware';
const hw5 = '12345678-5555-uuid-1234-abc-hardware';
const hw6 = '12345678-6666-uuid-1234-abc-hardware';
const hw7 = '12345678-7777-uuid-1234-abc-hardware';

export class ApiController {
    
    private vorgange : Record<string, Vorgang> = {
        [ id1 ] : {
            ...neuerVorgang(),
            id     : id1,
            status : VorgangStatus.ABGESCHLOSSEN
        },
        [ id2 ] : {
            ...neuerVorgang(),
            id     : id2,
            status : VorgangStatus.GENEHMIGT
        },
        [ id3 ] : {
            ...neuerVorgang(),
            id     : id3,
            status : VorgangStatus.ABGELEHNT
        },
        [ id4 ] : {
            ...neuerVorgang(),
            id     : id4,
            status : VorgangStatus.ZWISCHENGESPEICHERT
        },
        [ id5 ] : {
            ...neuerVorgang(),
            id     : id5,
            status : VorgangStatus.EINGEREICHT
        }
    };
    
    private standardHardware : Record<string, StandardHardwareArtikel> = {
        [ hw1 ] : {
            id           : hw1,
            kategorie    : StandardHardwareKategorie.RECHNER,
            titel        : 'Entwickler-Laptop',
            beschreibung : 'Der dicke Klotz mit mehr Arbeitsspeicher, den man nie mit sich rumtragen möchte.',
            imgUrl       : '/assets/standard-hardware/entwickler-laptop.jpg',
            kosten       : 1099.99
        },
        [ hw2 ] : {
            id           : hw2,
            kategorie    : StandardHardwareKategorie.RECHNER,
            titel        : 'Standard Laptop',
            beschreibung : 'Das normale Teil - nichts was man sich zu Weihnachten wünscht.',
            imgUrl       : '/assets/standard-hardware/standard-laptop.jpg',
            kosten       : 899.99
        },
        [ hw3 ] : {
            id           : hw3,
            kategorie    : StandardHardwareKategorie.RECHNER,
            titel        : 'Portabler Laptop',
            beschreibung : 'Schlanker, leichter, teurer, aber zu schwach für Entwickler.',
            imgUrl       : '/assets/standard-hardware/portabler-laptop.jpg',
            kosten       : 1299.99
        },
        [ hw4 ] : {
            id           : hw4,
            kategorie    : StandardHardwareKategorie.TASCHE,
            titel        : 'Die Schwarze',
            beschreibung : 'Ne Laptop Tasche halt.',
            imgUrl       : '/assets/standard-hardware/schwarze-tasche.jpg',
            kosten       : 39.99
        },
        [ hw5 ] : {
            id           : hw5,
            kategorie    : StandardHardwareKategorie.TASCHE,
            titel        : 'Die Graue',
            beschreibung : 'Ne Laptop Tasche halt.',
            imgUrl       : '/assets/standard-hardware/graue-tasche.jpg',
            kosten       : 39.99
        },
        [ hw6 ] : {
            id           : hw6,
            kategorie    : StandardHardwareKategorie.HEADSET,
            titel        : 'Jabra',
            beschreibung : 'Das standard Headset.',
            imgUrl       : '/assets/standard-hardware/jabra.jpg',
            kosten       : 129.99
        },
        [ hw7 ] : {
            id           : hw7,
            kategorie    : StandardHardwareKategorie.HEADSET,
            titel        : 'Jabra Kadabra',
            beschreibung : 'Das bessere Headset.',
            imgUrl       : '/assets/standard-hardware/jabra-kadabra.jpg',
            kosten       : 129.99
        }
    };
    
    public vorgaengeLaden(
        req : Request<{}>,
        res : Response<VorgaengeLadenRequest>
    ) {
        try {
            res.status( 200 ).jsonp( {
                vorgaenge : Object.values( this.vorgange )
            } );
        } catch ( e ) {
            return res.status( 500 ).jsonp( {} );
        }
    }
    
    public vorgangLaden(
        req : Request<{}>,
        res : Response<VorgangLadenResponse | ErrorResponse>
    ) {
        try {
            const vorgangId = req.params[ ApiUrl.vorgangIdParam ];
            
            if ( !vorgangId ) {
                return res.status( 400 ).jsonp( {
                    code : ErrorCode.VORGANG_ID_FEHLT,
                } );
            }
            
            if ( !this.vorgange.hasOwnProperty( vorgangId ) ) {
                return res.status( 404 ).jsonp( {
                    code : ErrorCode.VORGANG_NICHT_GEFUNDEN,
                } );
            }
            
            return res.status( 200 ).jsonp(
                this.vorgange[ vorgangId ]
            );
            
        } catch ( e ) {
            return res.status( 500 ).jsonp( {} );
        }
    }
    
    public vorgangSpeichern(
        req : Request<VorgangSpeichernRequest>,
        res : Response<{} | ErrorResponse>
    ) {
        try {
            const vorgangId = req.params[ ApiUrl.vorgangIdParam ];
            
            if ( !vorgangId ) {
                return res.status( 400 ).jsonp( {
                    code : ErrorCode.VORGANG_ID_FEHLT,
                } );
            }
            
            if ( !this.vorgange.hasOwnProperty( vorgangId ) ) {
                return res.status( 404 ).jsonp( {
                    code : ErrorCode.VORGANG_NICHT_GEFUNDEN,
                } );
            }
            
            this.vorgange[ vorgangId ] = req.body;
            
            return res.status( 204 ).jsonp( {} );
            
        } catch ( e ) {
            console.log( e );
            return res.status( 500 ).jsonp( {} );
        }
    }
    
    public vorgangAnlegen(
        req : Request<{}>,
        res : Response<VorgangAnlegenResponse | ErrorResponse>
    ) {
        try {
            const vorgangId = uuid();
            
            this.vorgange[ vorgangId ] = {
                ...neuerVorgang(),
                id : vorgangId
            };
            
            return res.status( 200 ).jsonp( {
                vorgangId
            } );
            
        } catch ( e ) {
            return res.status( 500 ).jsonp( {} );
        }
    }
    
    public standardHardwareLaden(
        req : Request<{}>,
        res : Response<StandardHardwareLadenResponse | ErrorResponse>
    ) {
        try {
            return res.status( 200 ).jsonp( {
                artikel : Object.values( this.standardHardware )
            } );
        } catch ( e ) {
            return res.status( 500 ).jsonp( {} );
        }
    }
    
}

function neuerVorgang() : Vorgang {
    return {
        id                  : '',
        titel               : 'Neuer Vorgang',
        status              : VorgangStatus.ZWISCHENGESPEICHERT,
        erstellungZeitpunkt : '',
        erstellerKuerzel    : 'TFL',
        
        bkz                    : '',
        genehmigerKuerzel      : '',
        genehmigungAnmerkungen : '',
        beguenstigterKuerzel   : '',
        abholungArt            : AbholungArt.KURIER,
        
        individualBestellungen : [],
        
        standardHardwareAuswahl : {
            laptopArtikelId  : null,
            tascheArtikelId  : null,
            headsetArtikelId : null
        },
        
        lieferanschrift : {
            vorname  : 'hans',
            nachname : '',
            strasse  : '',
            plz      : '',
            ort      : '',
            land     : '',
        },
        
        checkboxAllesGeprueftUndBestaetigt : false
    };
    
}
