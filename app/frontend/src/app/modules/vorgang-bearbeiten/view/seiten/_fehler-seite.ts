import { OnInit }                from '@angular/core';
import { Component }             from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Fehlerseite }      from '../../vorgang-bearbeiten.module';
import { FehlerseiteGrund } from '../errors/FehlerseiteGrund';

@Component( {
    styles   : [
        `
            .container {
                height : 100%;
            }

            nav {
                display         : flex;
                justify-content : stretch;
                flex-wrap       : nowrap;
                align-items     : stretch;
                margin          : 0 -0.25rem;

                a {
                    width            : 25%;
                    display          : flex;
                    justify-content  : flex-start;
                    align-items      : center;
                    padding          : 1rem;
                    margin           : 0.25rem;
                    text-decoration  : none;
                    background-color : #364d56;
                    color            : white;
                    border-radius    : 5px;
                }

            }

            .debug {
                display         : flex;
                justify-content : space-between;
                color           : gray;

                & > * {
                    width : 50%;
                }
            }
        
        `
    ],
    template : `
        <div class="container">

            <h3>Da ist etwas schief gelaufen...</h3>
            <p>{{description}}</p>

        </div>`,
} )
export class FehlerSeite implements OnInit {
    
    private _reason : FehlerseiteGrund | null = null;
    
    constructor(
        public route : ActivatedRoute
    ) {}
    
    ngOnInit() {
        this.route.data.subscribe( ( data : Fehlerseite ) => {
            this._reason = data.grund || null;
        } );
    }
    
    get description() : string {
        
        switch ( this._reason ) {
            case FehlerseiteGrund.UNGUELTIGE_ROUTE:
                return 'Der Teil der URL nach der VorgangID stimmt nicht!';
            case FehlerseiteGrund.VORGANG_ID_FEHLT:
                return 'Die VorgangID fehlt in der URL!';
            default:
                return 'Aber wirklich!';
        }
        
    }

//
//debugValidation() : string {
//    return JSON.stringify( this.dynamicForm.validation, null, 2 );
//}
//
//debugValues() : string {
//    return JSON.stringify( this.dynamicForm.formData, null, 2 );
//}

}
