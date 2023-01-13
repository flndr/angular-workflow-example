import { VorgangStatus }           from '@tom/models';
import { AbholungArt }             from '@tom/models';
import { VorgangSpeichernRequest } from '@tom/models';
import { VorgangAnlegenResponse }  from '@tom/models';
import { ErrorCode }               from '@tom/models';
import { ErrorResponse }           from '@tom/models';
import { ApiUrl }                  from '@tom/models';
import { Vorgang }                 from '@tom/models';
import { VorgaengeLadenRequest }   from '@tom/models';
import { VorgangLadenResponse }    from '@tom/models';
import { v4 as uuid }              from 'uuid';

import { Request }  from '../models/Request';
import { Response } from '../models/Response';

const id1 = '12345678-1111-uuid-1234-test-vorgang';
const id2 = '12345678-2222-uuid-1234-test-vorgang';
const id3 = '12345678-3333-uuid-1234-test-vorgang';
const id4 = '12345678-4444-uuid-1234-test-vorgang';
const id5 = '12345678-5555-uuid-1234-test-vorgang';

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
    
}

function neuerVorgang() : Vorgang {
    return {
        id                  : '',
        titel               : 'Neuer Vorgang',
        status              : VorgangStatus.ZWISCHENGESPEICHERT,
        erstellungZeitpunkt : '',
        
        bkz                    : '',
        erstellerKuerzel       : '',
        genehmigerKuerzel      : '',
        beguenstigterKuerzel   : '',
        abholungArt            : AbholungArt.KURIER,
        individualBestellungen : [],
        standardHardwareIds    : [],
        
        lieferanschrift : {
            vorname  : 'hans',
            nachname : '',
            strasse  : '',
            plz      : '',
            ort      : '',
            land     : '',
        },
        
        checkboxAllesGeprueftUndBestaetigt : false,
        
    };
    
}
