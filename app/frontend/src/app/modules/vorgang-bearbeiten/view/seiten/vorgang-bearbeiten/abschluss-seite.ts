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
            <h3>Abschluss des Vorganges</h3>
            <div class="mb-3">
                <app-checkbox-field
                        [control]="fields['checkboxAllesGeprueftUndBestaetigt']"
                        label="Ich habe alle Angaben geprüft und bestätige deren Richtigkeit."
                ></app-checkbox-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>
            
        </form>`,
} )
export class AbschlussSeite  implements OnInit {
    
    fields = FormService.SCHRITTE.ABSCHLUSS;
    
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
        
        //await this.router.navigateByUrl(
        //    this.urlService.routeToVorgangBearbeiten(
        //        this.formService.vorgang.id,
        //        VorgangBearbeitenSchritt.GENEHMIGUNG
        //    )
        //);
    }
}
