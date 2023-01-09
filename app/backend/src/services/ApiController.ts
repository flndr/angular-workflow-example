import { VorgangBearbeitenSchritt } from '@tom/models';
import { VorgangStatus }            from '@tom/models';
import { Vorgang }                  from '@tom/models';
import { VorgaengeLadenRequest }    from '@tom/models';
import { VorgaengeLadenResponse }   from '@tom/models';

import { Response } from '../models/Response';
import { Request }  from '../models/Request';

export class ApiController {
    
    public vorgaengeLaden( req : Request<VorgaengeLadenRequest>, res : Response<VorgaengeLadenResponse> ) {
        
        const v : Vorgang = {
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
        }
        
        res.status( 200 ).jsonp( {
            vorgaenge : [
                v
            ]
        } );
    }
    
    //private returnError( res : Response, e : Error | any ) {
    //    let status  = 500;
    //    let message = 'Something went wrong';
    //    if ( e instanceof ExcelParserError || e instanceof ApiError ) {
    //        status = 400;
    //    }
    //    if ( e instanceof Error ) {
    //        message = e.message;
    //    }
    //    res.status( status ).jsonp( { message } );
    //}
    
}
