import { Component } from '@angular/core';

import { VorgangBearbeitenSchritt } from '../../../shared/model/VorgangBearbeitenSchritt';
import { UrlService }               from '../../../shared/services/url.service';
import { FormService }              from '../../services/form.service';

@Component( {
    styles   : [
        `
            .container {
                height                 : 100%;

                --ngx-json-font-family : 11px;

            }

            .top {
                display         : flex;
                align-items     : baseline;
                justify-content : space-between;
                border-bottom   : 1px solid #d3d3d3;
                margin          : 3rem 0;
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

                <div slot="center-left" style="width: 16rem">
                    <div class="list-group">
                        <a *ngFor="let navItem of formService.navigation; index as i"
                           class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                           [ngClass]="{ 'list-group-item-danger' : formService.showErrors && navItem.isInvalid,
                                        'list-group-item-success' : false && formService.showErrors && navItem.isValid  }"
                           [routerLink]="getRouteTo(navItem.schritt)">
                            {{i + 1}}. {{labelBySchritt[ navItem.schritt ]}}
                            <span *ngIf="formService.showErrors && navItem.isInvalid"
                                  class="badge bg-danger rounded-pill"
                                  style="margin-left: 1rem;">
                                {{navItem.errorCount}}
                            </span>
                            <span *ngIf="false && formService.showErrors && navItem.isValid"
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

                <div slot="bottom" class="py-3">

                    <div class="form-check form-switch">
                        <input class="form-check-input"
                               type="checkbox"
                               id="checkbox-toggle-errors"
                               [value]="formService.showErrors"
                               (change)="formService.toggleShowErrors()"/>
                        <label class="form-check-label user-select-none" for="checkbox-toggle-errors">
                            Fehler in UI anzeigen
                        </label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input"
                               type="checkbox"
                               id="checkbox-toggle-json"
                               [(ngModel)]="showJson"/>
                        <label class="form-check-label user-select-none" for="checkbox-toggle-json">
                            Zustand als JSON zeigen
                        </label>
                    </div>

                    <div *ngIf="showJson" class="d-flex gap-3 my-3">
                        <div class="card w-50">
                            <div class="card-header">Aktuelle Formular-Werte</div>
                            <div class="card-body font-monospace" style="font-size: 13px;">
                                <ngx-json-viewer [json]="formService.vorgang"></ngx-json-viewer>
                            </div>
                        </div>
                        <div class="card w-50">
                            <div class="card-header">Aktuelle Restriktionen</div>
                            <div class="card-body font-monospace" style="font-size: 13px;">
                                <ngx-json-viewer [json]="constraintsNicer"></ngx-json-viewer>
                            </div>
                        </div>

                    </div>
                </div>

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
    
    showJson = false;
    
    constructor(
        public formService : FormService,
        public urlService : UrlService,
    ) { }
    
    get constraintsNicer() {
        const nicer : Record<string, Record<string, string>> = {};
        this.formService.constraints.forEach( c => nicer[ c.property ] = c.constraints );
        return nicer;
    }
    
    getRouteTo( schritt : VorgangBearbeitenSchritt ) : string {
        return this.urlService.routeToVorgangBearbeiten( this.formService.vorgang.id, schritt );
    }
    
}
