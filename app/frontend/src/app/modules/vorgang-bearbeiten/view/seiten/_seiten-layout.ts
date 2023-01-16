import { Component } from '@angular/core';

import { VorgangBearbeitenSchritt } from '../../../shared/model/VorgangBearbeitenSchritt';
import { UrlService }               from '../../../shared/services/url.service';
import { FormService }              from '../../services/form.service';

@Component( {
    styles   : [
        `
            .container {
                height : 100%;
            }

            .top {
                display         : flex;
                align-items     : baseline;
                justify-content : space-between;
                border-bottom   : 1px solid #d3d3d3;
                margin-bottom   : 2rem;
            }

        `
    ],
    template : `
        <div class="container">
            <app-holy-grail-layout>

                <div slot="top" class="top">
                    <h1 class="d-inline">
                        Vorgang bearbeiten
                    </h1>
                    <a [routerLink]="'/'">zurück zur Übersicht</a>
                </div>

                <div slot="center-left" style="width: 15rem">
                    <div class="list-group">
                        <a *ngFor="let navItem of formService.navigation; index as i"
                           class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                           [ngClass]="{ 'list-group-item-danger' : navItem.isInvalid,
                                        'list-group-item-success' : navItem.isValid  }"
                           [routerLink]="getRouteTo(navItem.schritt)">
                            {{labelBySchritt[ navItem.schritt ]}}
                            <span *ngIf="navItem.isInvalid"
                                  class="badge bg-danger rounded-pill"
                                  style="margin-left: 1rem;">
                                {{navItem.errorCount}}
                            </span>
                            <span *ngIf="navItem.isValid"
                                  class="badge bg-success rounded-pill"
                                  style="margin-left: 1rem;">
                                ok
                            </span>
                        </a>
                    </div>
                </div>

                <div slot="center-center" style="height: 100%; padding-left: 2rem;">
                    <router-outlet></router-outlet>
                </div>

                <!--    <div slot="center-right">-->
                <!--        Center-Right-->
                <!--    </div>-->

            </app-holy-grail-layout>
        </div>
    `,
} )
export class SeitenLayout {
    
    readonly labelBySchritt : Record<VorgangBearbeitenSchritt, string> = {
        ABHOLUNG              : 'Abholung',
        BKZ_AUSWAHL           : 'BKZ',
        GENEHMIGUNG           : 'Genehmigung',
        INDIVIDUAL_BESTELLUNG : 'Individual-Bestellung',
        LIEFERANSCHRIFT       : 'Lieferanschrift',
        MITARBEITER_AUSWAHL   : 'Mitarbeiter',
        STANDARD_HARDWARE     : 'Standard-Hardware',
        ABSCHLUSS             : 'Abschluss',
    };
    
    constructor(
        public formService : FormService,
        public urlService : UrlService,
    ) { }
    
    getRouteTo( schritt : VorgangBearbeitenSchritt ) : string {
        return this.urlService.routeToVorgangBearbeiten( this.formService.vorgang.id, schritt );
    }
    
}
