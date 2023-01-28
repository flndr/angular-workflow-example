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
                    headline="Übersicht aller Vorgänge"
            ></app-headline>

            <div class="spinner-border mt-5" role="status" *ngIf="isLoading">
                <span class="visually-hidden">Loading...</span>
            </div>

            <div *ngIf="!isLoading">

                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titel</th>
                        <th scope="col">Status</th>
                        <th scope="col">ID</th>
                        <th scope="col">Ersteller</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let vorgang of vorgaenge; index as i">
                        <td>
                            {{ i + 1 }}
                        </td>
                        <td>
                            <strong>{{ vorgang.titel }}</strong>
                        </td>
                        <td>
                            <app-status-badge [status]="vorgang.status"></app-status-badge>
                        </td>
                        <td>
                            {{ vorgang.id }}
                        </td>
                        <td>
                            {{ vorgang.erstellerKuerzel }}
                        </td>
                        <td>
                            <a class="btn"
                               [ngClass]="{ 'btn-primary'   : vorgang.status === VorgangStatus.ZWISCHENGESPEICHERT,
                                            'btn-secondary' : vorgang.status !== VorgangStatus.ZWISCHENGESPEICHERT }"
                               [routerLink]="vorgang.status === VorgangStatus.ZWISCHENGESPEICHERT
                                    ? urlService.routeToVorgangBearbeiten(vorgang.id)
                                    : urlService.routeToVorgangZusammenfassung(vorgang.id)">
                                {{ vorgang.status === VorgangStatus.ZWISCHENGESPEICHERT
                                    ? 'Bearbeiten'
                                    : 'Details' }}
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <button class="btn btn-primary">neuen Vorgang anlegen</button>
            </div>
        </div>`,
} )
export class VorgangUebersichtSeite implements OnInit {
    
    private _isLoading : boolean   = true;
    private _vorgaenge : Vorgang[] = [];
    VorgangStatus = VorgangStatus;
    
    constructor(
        public apiService : ApiService,
        public urlService : UrlService
    ) { }
    
    public async ngOnInit() {
        this._vorgaenge = await this.apiService.vorgaengeLaden();
        this._isLoading = false;
    }
    
    get vorgaenge() {
        return this._vorgaenge;
    }
    
    get isLoading() {
        return this._isLoading;
    }
}
