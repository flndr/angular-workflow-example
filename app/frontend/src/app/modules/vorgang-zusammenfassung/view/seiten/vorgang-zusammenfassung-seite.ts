import { OnInit }        from '@angular/core';
import { Component }     from '@angular/core';
import { VorgangStatus } from '@tom/models';

import { Vorgang } from '@tom/models';

import { ApiService } from '../../../shared/services/api.service';
import { UrlService } from '../../../shared/services/url.service';

@Component( {
    styles   : [
        `
            .table td {
                vertical-align : middle;
            }

            .table td:last-child {
                text-align : right;
            }
        
        `
    ],
    template : `
        <div class="container">

            <app-headline
                    headline="Vorgang Zusammenfassung"
                    routerLink="/"
                    routerLinkLabel="zurück zur Übersicht"
            ></app-headline>

            <div class="spinner-border mt-5" role="status" *ngIf="isLoading">
                <span class="visually-hidden">Loading...</span>
            </div>

            <div *ngIf="!isLoading">

                To be implemented....

            </div>
        </div>`,
} )
export class VorgangZusammenfassungSeite implements OnInit {
    
    VorgangStatus = VorgangStatus;
    
    private _isLoading : boolean = true;
    
    constructor(
        public apiService : ApiService,
        public urlService : UrlService
    ) { }
    
    public async ngOnInit() {
        this._isLoading = false;
    }
    
    get isLoading() {
        return this._isLoading;
    }
}
