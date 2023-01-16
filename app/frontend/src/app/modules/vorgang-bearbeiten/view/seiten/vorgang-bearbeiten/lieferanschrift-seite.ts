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
    styles   : [ `` ],
    template : `
        <form [formGroup]="formGroup">
            <h3>Bei Lieferungen per Kurier benötigen wir eine Lieferanschrift:</h3>
            <div class="mb-3">
                <app-text-field [control]="fields['lieferanschrift.vorname']" label="Vorname"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields['lieferanschrift.nachname']" label="Nachname"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields['lieferanschrift.strasse']"
                                label="Strasse und Hausnummer"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields['lieferanschrift.plz']" label="PLZ"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields['lieferanschrift.ort']" label="Ort"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields['lieferanschrift.land']" label="Land"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

        </form>`,
} )
export class LieferanschriftSeite implements OnInit {
    
    fields = FormService.SCHRITTE.LIEFERANSCHRIFT;
    
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
                VorgangBearbeitenSchritt.GENEHMIGUNG
            )
        );
    }
}
