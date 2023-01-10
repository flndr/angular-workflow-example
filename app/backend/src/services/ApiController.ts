import { v4 as uuid }               from 'uuid';
import { VorgangAnlegenResponse }   from '@tom/models';
import { ErrorCode }                from '@tom/models';
import { ErrorResponse }            from '@tom/models';
import { ApiUrl }                   from '@tom/models';
import { VorgangBearbeitenSchritt } from '@tom/models';
import { VorgangStatus }            from '@tom/models';
import { Vorgang }                  from '@tom/models';
import { VorgaengeLadenRequest }    from '@tom/models';
import { VorgangLadenResponse }     from '@tom/models';
import { Request }                  from '../models/Request';

import { Response } from '../models/Response';

export class ApiController {
    
    private vorgange : Record<string, Vorgang> = {
        'oh-hello'           : {
            ...neuerVorgang(),
            id : 'oh-hello'
        },
        'aaaand-another-one' : {
            ...neuerVorgang(),
            id : 'aaaand-another-one'
        }
    };
    
    constructor() {
        console.log( 'ApiController constructed', uuid() );
    }
    
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
    
}

function neuerVorgang() : Vorgang {
    return {
        id                   : '',
        erstellerKuerzel     : 'TFL',
        erstellungszeitpunkt : 'halber',
        status               : VorgangStatus.EINGEREICHT,
        schritte             : {
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
    };
}
