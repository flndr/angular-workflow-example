import { OnInit }     from '@angular/core';
import { Component }  from '@angular/core';
import { FormGroup }  from '@angular/forms';
import { Router }     from '@angular/router';
import { v4 as uuid } from 'uuid';

import { AbholungArt } from '@tom/models';

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
            <h3>Wie soll die Hardware zugestellt werden?</h3>
            <div class="form-check" *ngFor="let c of checkboxes">
                <input class="form-check-input"
                       type="radio"
                       name="flexRadioDefault"
                       [value]="c.value"
                       [attr.id]="c.id"
                       [formControl]="fields['abholungArt']">
                <label class="form-check-label user-select-none" [attr.for]="c.id">
                    {{c.label}}
                </label>
            </div>
            
            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

        </form>`,
} )
export class AbholungSeite implements OnInit {
    
    fields    = FormService.SCHRITTE.ABHOLUNG;
    formGroup = new FormGroup( this.fields );
    
    checkboxes : Array<{ value : AbholungArt, label : string, id : string }> = [
        {
            value : AbholungArt.GOLD,
            label : 'Abholung am Standort Goldhammer',
            id    : uuid(),
        },
        {
            value : AbholungArt.EICH,
            label : 'Abholung am Standort Eichendorfstraße',
            id    : uuid(),
        },
        {
            value : AbholungArt.KURIER,
            label : 'Zustellung per Kurier',
            id    : uuid(),
        },
    ];
    
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
                VorgangBearbeitenSchritt.LIEFERANSCHRIFT
            )
        );
    }
}
