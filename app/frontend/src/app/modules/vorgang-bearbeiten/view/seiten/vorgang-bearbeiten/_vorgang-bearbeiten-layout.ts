import { Component } from '@angular/core';

import { VorgangBearbeitenSchritt } from '../../../../shared/model/VorgangBearbeitenSchritt';
import { UrlService }               from '../../../../shared/services/url.service';

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
        <app-highlight-layout label="VorgangBearbeitenLayout" color="blue">

            <nav>
                <a [routerLink]="urlService.routeToVorgangBearbeiten(VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL)">1 -
                    MITARBEITER_AUSWAHL</a>
                <a [routerLink]="urlService.routeToVorgangBearbeiten(VorgangBearbeitenSchritt.BKZ_AUSWAHL)">2 -
                    BKZ_AUSWAHL</a>
                <a [routerLink]="">3 - Payment Options</a>
                <a [routerLink]="">4 - Summary</a>
            </nav>

            <hr/>

            <router-outlet></router-outlet>


        </app-highlight-layout>`,
} )
export class VorgangBearbeitenLayout {
    
    VorgangBearbeitenSchritt = VorgangBearbeitenSchritt;
    
    constructor(
        public urlService : UrlService
    ) { }
    
    //
    //debugValidation() : string {
    //    return JSON.stringify( this.dynamicForm.validation, null, 2 );
    //}
    //
    //debugValues() : string {
    //    return JSON.stringify( this.dynamicForm.formData, null, 2 );
    //}
    
}
