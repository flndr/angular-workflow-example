import { Component } from '@angular/core';

import { VorgangBearbeitenSchritt } from '@tom/models';

import { UrlService } from '../../../shared/services/url.service';

@Component( {
    styles   : [
        `
            .container {
                height : 100%;
            }
        
        `
    ],
    template : `
        <app-highlight-layout label="SeitenLayout" color="green">
            <app-holy-grail-layout>

                <!--    <div slot="top">-->
                <!--        errors etc can go hiere-->
                <!--    </div>-->

                <div slot="center-left" style="height: 100%; background-color: rgba(94,174,225,0.4)">
                    <ul>
                        <li><a [routerLink]="getRouteTo(Schritt.MITARBEITER_AUSWAHL)">MITARBEITER_AUSWAHL</a></li>
                        <li><a [routerLink]="getRouteTo(Schritt.BKZ_AUSWAHL)">BKZ_AUSWAHL</a></li>
                        <li><a [routerLink]="getRouteTo(Schritt.STANDARD_HARDWARE)">STANDARD_HARDWARE</a></li>
                    </ul>
                </div>

                <div slot="center-center" style="height: 100%">
                    <router-outlet></router-outlet>
                </div>

                <!--    <div slot="center-right">-->
                <!--        Center-Right-->
                <!--    </div>-->

            </app-holy-grail-layout>
        </app-highlight-layout>`,
} )
export class SeitenLayout {
    
    Schritt = VorgangBearbeitenSchritt;
    
    constructor(
        public urlService : UrlService,
    ) { }
    
    getRouteTo( schritt : VorgangBearbeitenSchritt ) : string {
        return this.urlService.routeToVorgangBearbeiten( schritt );
    }
    
}
