import { OnInit }      from '@angular/core';
import { Component }   from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup }   from '@angular/forms';
import { Router }      from '@angular/router';

import { Mitarbeiter } from '@tom/models';

import { VorgangBearbeitenSchritt } from '../../../../shared/model/VorgangBearbeitenSchritt';
import { ApiService }               from '../../../../shared/services/api.service';
import { UrlService }               from '../../../../shared/services/url.service';
import { FormService }              from '../../../services/form.service';
import { connectForm }              from '../../../util/connectForm';

@Component( {
    styles   : [
        `
            .is-invalid ::ng-deep .ng-select .ng-select-container {
                border-color : #dc3545;
            }

            .is-invalid .invalid-feedback {
                display : block;
            }
        `
    ],
    template : `
        <form>
            <h3>Für welchen Mitarbeiter wird der Vorgang angelegt?</h3>
            
            <div class="mb-3" [class.is-invalid]="formService.showErrors && field.invalid">
                <label class="form-label user-select-none">
                    Begünstigten Mitarbeiter wählen:
                </label>
                <ng-select (change)="handleChange($event)"
                           [ngModel]="this.field.value"
                           [ngModelOptions]="{standalone: true}">
                    <ng-option *ngFor="let m of mitarbeiter"
                               [value]="m.kuerzel">
                        {{m.nachname}}, {{m.vorname}} ({{m.kuerzel}})
                    </ng-option>
                </ng-select>
                <div class="invalid-feedback">
                    {{ field.errors | json }}
                </div>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">
                Speichern und weiter
            </button>

        </form>`,
} )
export class MitarbeiterAuswahlSeite implements OnInit {
    
    readonly fields    = FormService.SCHRITTE.MITARBEITER_AUSWAHL;
    readonly formGroup = new FormGroup( this.fields );
    
    mitarbeiter : Mitarbeiter[] = [];
    
    kuerzel : string | null = null;
    
    constructor(
        public formService : FormService,
        private urlService : UrlService,
        private apiService : ApiService,
        private router : Router,
    ) {}
    
    get field() : FormControl {
        return this.fields[ 'beguenstigterKuerzel' ];
    }
    
    async ngOnInit() {
        await connectForm( this.formService, this.formGroup, this.fields );
        
        this.mitarbeiter = await this.apiService.mitarbeiterLaden();
        this.kuerzel     = this.field.value;
    }
    
    async handleChange( kuerzel : string | undefined ) {
        this.field.setValue( kuerzel || null );
        this.field.markAsDirty();
        await this.apiService.vorgangSpeichern( this.formService.vorgang );
    }
    
    async senden( e : Event ) {
        e.preventDefault();
        await this.apiService.vorgangSpeichern( this.formService.vorgang );
        
        await this.router.navigateByUrl(
            this.urlService.routeToVorgangBearbeiten(
                this.formService.vorgang.id,
                VorgangBearbeitenSchritt.BKZ_AUSWAHL
            )
        );
    }
}
