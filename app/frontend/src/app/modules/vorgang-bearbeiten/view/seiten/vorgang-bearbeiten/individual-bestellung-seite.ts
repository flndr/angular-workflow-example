import { OnInit }         from '@angular/core';
import { Component }      from '@angular/core';
import { FormControl }    from '@angular/forms';
import { FormGroup }      from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router }         from '@angular/router';

import { VorgangBearbeitenSchritt } from '../../../../shared/model/VorgangBearbeitenSchritt';
import { ApiService }               from '../../../../shared/services/api.service';
import { UrlService }               from '../../../../shared/services/url.service';

import { FormService } from '../../../services/form.service';
import { connectForm } from '../../../util/connectForm';

enum FieldName {
    TITEL        = 'titel',
    BESCHREIBUNG = 'beschreibung',
    KOSTEN       = 'kosten'
}

@Component( {
    styles   : [
        `
            .modal {
                display : block;
            }

            .alter {
                position         : absolute;
                left             : 0;
                right            : 0;
                bottom           : 0;
                top              : 0;
                background-color : rgba(0, 0, 0, 0.4);
                z-index          : 1;
            }
        `
    ],
    template : `
        <form>
            <h3>Bestellung individueller Hardware</h3>

            <div *ngIf="showForm">
                <div class="modal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Individual Bestellung bearbeiten</h5>
                                <button type="button" class="btn-close"
                                        [routerLink]="routeSchliessen"
                                        aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <form [formGroup]="formGroup">
                                    <div class="mb-3">
                                        <app-text-field
                                                [control]="fields[this.fieldPath + FieldName.TITEL]"
                                                label="Titel"
                                        ></app-text-field>
                                    </div>
                                    <div class="mb-3">
                                        <app-textarea-field
                                                [control]="fields[this.fieldPath + FieldName.BESCHREIBUNG]"
                                                label="Beschreibung"
                                        ></app-textarea-field>
                                    </div>
                                    <div class="mb-3">
                                        <app-number-field
                                                [control]="fields[this.fieldPath + FieldName.KOSTEN]"
                                                label="Kosten"
                                        ></app-number-field>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                        [routerLink]="routeSchliessen">
                                    Abbrechen
                                </button>
                                <button type="button" class="btn btn-primary"
                                        (click)="dialogSpeichernUndSchliessen($event)">
                                    Speichern
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="alter"></div>
            </div>


            <div class="d-flex gap-3 flex-wrap my-5">
                <div class="card w-50" *ngFor="let bestellungId of bestellungenIds">
                    <div class="card-body">
                        <h6 class="card-title mb-3">
                            {{ bestellungen[ bestellungId ].titel }}
                        </h6>
                        <p class="card-text small mb-1">
                            {{ bestellungen[ bestellungId ].beschreibung }}
                        </p>
                        <p class="card-text small">
                            Kosten: {{ bestellungen[ bestellungId ].kosten | currency : 'EUR' }}
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class=" d-flex w-100 justify-content-between ">
                            <a class="btn btn-outline-secondary" [routerLink]="routeBearbeiten(bestellungId)">
                                Löschen
                            </a>
                            <a class="btn btn-outline-primary" [routerLink]="routeBearbeiten(bestellungId)">
                                Bearbeiten
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <!--            <div class="mb-3">-->
            <!--                <app-text-field-->
            <!--                        [control]="fields['individualBestellungen']"-->
            <!--                        label="IndividualBestellungSeite"-->
            <!--                ></app-text-field>-->
            <!--            </div>-->


            <div class="d-flex gap-3">
                <button class="btn btn-outline-primary" (click)="senden($event)">Neue Individual-Bestellung</button>
                <button class="btn btn-primary" (click)="senden($event)">Weiter</button>
            </div>

        </form>`,
} )
export class IndividualBestellungSeite implements OnInit {
    
    FieldName = FieldName;
    fieldPath : string;
    fields : Record<string, FormControl>;
    formGroup : FormGroup;
    
    private _id : string | null = null;
    
    constructor(
        private formService : FormService,
        private urlService : UrlService,
        private apiService : ApiService,
        private router : Router,
        private route : ActivatedRoute
    ) {}
    
    async ngOnInit() {
        this._id = this.route.snapshot.params[ UrlService.PARAM_INDIVIDUAL_HARDWARE_ID ];
        
        if ( this._id ) {
            if ( this.formService.vorgang.individualBestellungen.hasOwnProperty( this._id ) ) {
                
                this.fieldPath      = 'individualBestellungen.' + this._id + '.';
                const initialValues = this.formService.vorgang.individualBestellungen[ this._id ];
                
                this.fields = {
                    [ this.fieldPath + FieldName.TITEL ]        : new FormControl( initialValues.titel || '' ),
                    [ this.fieldPath + FieldName.BESCHREIBUNG ] : new FormControl( initialValues.beschreibung || '' ),
                    [ this.fieldPath + FieldName.KOSTEN ]       : new FormControl( initialValues.kosten || '' ),
                }
                
                this.formGroup = new FormGroup( this.fields );
                
                await connectForm( this.formService, this.formGroup, this.fields );
                
            } else {
                await this.dialogSchliessen();
            }
        }
    }
    
    get showForm() {
        return this._id && this.formGroup && this.fields;
    }
    
    get id() {
        return this._id;
    }
    
    get bestellungen() {
        return this.formService.vorgang.individualBestellungen;
    }
    
    get bestellungenIds() {
        return Object.keys( this.formService.vorgang.individualBestellungen );
    }
    
    routeBearbeiten( id : string ) {
        return this.urlService.routeToVorgangBearbeitenIndividualHardware(
            this.formService.vorgang.id, id
        );
    }
    
    get routeSchliessen() {
        return this.urlService.routeToVorgangBearbeiten(
            this.formService.vorgang.id, VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG
        );
    }
    
    async dialogSchliessen( e ? : Event ) {
        if ( e ) {
            e.preventDefault();
        }
        await this.router.navigateByUrl( this.routeSchliessen );
    }
    
    async dialogSpeichernUndSchliessen( e ? : Event ) {
        if ( e ) {
            e.preventDefault();
        }
        await this.apiService.vorgangSpeichern( this.formService.vorgang );
        await this.dialogSchliessen();
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
