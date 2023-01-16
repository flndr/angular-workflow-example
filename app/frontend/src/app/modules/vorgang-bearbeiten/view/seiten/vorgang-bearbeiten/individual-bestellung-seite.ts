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
            <h3>Bestellung individueller Hardware</h3>
            <div class="mb-3">
                <app-text-field [control]="fields['individualBestellungen']"
                                label="IndividualBestellungSeite"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

        </form>`,
} )
export class IndividualBestellungSeite  implements OnInit {
    
    fields = FormService.SCHRITTE.INDIVIDUAL_BESTELLUNG;
    
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
                VorgangBearbeitenSchritt.ABHOLUNG
            )
        );
    }
}
