import { OnInit }                   from '@angular/core';
import { Component }                from '@angular/core';
import { VorgangBearbeitenSchritt } from '@tom/models';
import { Vorgang }                  from '@tom/models';
import { ApiService }               from '../../../shared/services/api.service';
import { UrlService }               from '../../../shared/services/url.service';

@Component( {
    styles   : [
        `
            .container {
                height : 100%;
            }
        
        
        `
    ],
    template : `
        <div class="container">

            <a *ngFor="let vorgang of vorgaenge" [routerLink]="urlService.routeToVorgangBearbeiten(vorgang.id)">
                {{vorgang.id}}
            </a>

        </div>`,
} )
export class VorgangUebersichtSeite implements OnInit {
    
    Schritt = VorgangBearbeitenSchritt
    
    private _vorgaenge : Vorgang[] = [];
    
    constructor(
        public apiService : ApiService,
        public urlService : UrlService
    ) { }
    
    public async ngOnInit() {
        this._vorgaenge = await this.apiService.getVorgaenge();
    }
    
    get vorgaenge() : Vorgang[] {
        return this._vorgaenge;
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
