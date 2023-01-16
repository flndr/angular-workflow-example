import { OnInit }    from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router }    from '@angular/router';

import { VorgangBearbeitenSchritt } from '../../../../shared/model/VorgangBearbeitenSchritt';
import { ApiService }               from '../../../../shared/services/api.service';
import { UrlService }               from '../../../../shared/services/url.service';
import { FormService }              from '../../../services/form.service';
import { connectForm }              from '../../../util/connectForm';

@Component( {
    styles   : [
        `
        
        `
    ],
    template : `
        <form [formGroup]="formGroup">
            <h3>Auf welches Buchungskennzeichen werden die Kosten verbucht?</h3>
            <div class="mb-3">
                <app-text-field [control]="fields['bkz']" label="BKZ"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

        </form>`,
} )
export class BkzAuswahlSeite implements OnInit {
    
    fields = FormService.SCHRITTE.BKZ_AUSWAHL;
    
    formGroup = new FormGroup( this.fields );
    
    constructor(
        private formService : FormService,
        private urlService : UrlService,
        private apiService : ApiService,
        private router : Router,
    ) {}
    
    async ngOnInit() {
        await connectForm( this.formService, this.formGroup, this.fields );
    }
    
    async senden( e : Event ) {
        e.preventDefault();
        await this.apiService.vorgangSpeichern( this.formService.vorgang );
        
        await this.router.navigateByUrl(
            this.urlService.routeToVorgangBearbeiten(
                this.formService.vorgang.id,
                VorgangBearbeitenSchritt.STANDARD_HARDWARE
            )
        );
    }
}
