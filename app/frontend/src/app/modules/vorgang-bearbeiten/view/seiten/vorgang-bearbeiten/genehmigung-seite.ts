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

            <div class="mb-3">
                <app-text-field [control]="fields['genehmigerKuerzel']"
                                label="Kürzel des Genehmigenden"></app-text-field>
            </div>
            

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class GenehmigungSeite  implements OnInit {
    
    fields = FormService.SCHRITTE.GENEHMIGUNG;
    
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
                VorgangBearbeitenSchritt.ABSCHLUSS
            )
        );
    }
}
