import { OnInit }      from '@angular/core';
import { Component }   from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup }   from '@angular/forms';
import { Router }      from '@angular/router';

import { StandardHardwareKategorie } from '@tom/models';
import { StandardHardwareArtikel }   from '@tom/models';

import { VorgangBearbeitenSchritt } from '../../../../shared/model/VorgangBearbeitenSchritt';
import { ApiService }               from '../../../../shared/services/api.service';
import { UrlService }               from '../../../../shared/services/url.service';
import { FormService }              from '../../../services/form.service';
import { connectForm }              from '../../../util/connectForm';

@Component( {
    styles   : [
        `
            .card {
                width  : 16rem;
                border : 2px solid var(--bs-border-color);
            }

            .card.selected {
                border-color : var(--bs-primary);
            }
        `
    ],
    template : `

        <form [formGroup]="formGroup">
            <h3>Auswahl der Standard-Hardware</h3>
            <div *ngFor="let abschnitt of abschnitteForUi" class="mb-3">
                <h4>{{abschnitt.label}}</h4>
                <div class="invalid-feedback d-block"
                     *ngIf="abschnitt.field.invalid && formService.showErrors">
                    {{ abschnitt.field.errors | json }}
                </div>
                <div class="d-flex gap-3 flex-wrap">
                    <div class="card"
                         *ngFor="let artikel of artikelNachKategorie(abschnitt.kategorie)"
                         [class.selected]="abschnitt.field.value === artikel.id"
                         (click)="auswaehlen($event, artikel)">
                        <img [src]="artikel.imgUrl"
                             [alt]="artikel.titel + ' - ' + artikel.beschreibung"
                             class="card-img-top">
                        <div class="card-body">
                            <h6 class="card-title">{{artikel.titel}}</h6>
                            <p class="card-text small">{{artikel.beschreibung}}</p>
                            <a href="#" class="btn btn-outline-primary stretched-link">
                                {{abschnitt.field.value === artikel.id ? 'Abwählen' : 'Auswählen'}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">
                Weiter
            </button>

        </form>
    
    `,
} )
export class StandardHardwareSeite implements OnInit {
    
    fields    = FormService.SCHRITTE.STANDARD_HARDWARE;
    formGroup = new FormGroup( this.fields );
    
    artikel : StandardHardwareArtikel[];
    
    abschnitte : Record<StandardHardwareKategorie, {
        kategorie : StandardHardwareKategorie;
        label : string;
        field : FormControl
    }> = {
        [ StandardHardwareKategorie.RECHNER ] : {
            kategorie : StandardHardwareKategorie.RECHNER,
            label     : 'Laptops',
            field     : this.fields[ 'standardHardwareAuswahl.laptopArtikelId' ]
        },
        [ StandardHardwareKategorie.HEADSET ] : {
            kategorie : StandardHardwareKategorie.HEADSET,
            label     : 'Headsets',
            field     : this.fields[ 'standardHardwareAuswahl.headsetArtikelId' ]
        },
        [ StandardHardwareKategorie.TASCHE ]  : {
            kategorie : StandardHardwareKategorie.TASCHE,
            label     : 'Taschen',
            field     : this.fields[ 'standardHardwareAuswahl.tascheArtikelId' ]
        },
    };
    
    abschnitteForUi = Object.values( this.abschnitte );
    
    constructor(
        public formService : FormService,
        private urlService : UrlService,
        private apiService : ApiService,
        private router : Router,
    ) {}
    
    artikelNachKategorie( k : StandardHardwareKategorie | string ) : StandardHardwareArtikel[] {
        return this.artikel
               ? this.artikel.filter( a => a.kategorie === k )
               : [];
    }
    
    async ngOnInit() {
        await connectForm( this.formService, this.formGroup, this.fields );
        this.artikel = await this.apiService.standardHardwareLaden();
    }
    
    async auswaehlen( e : Event, artikel : StandardHardwareArtikel ) {
        e.preventDefault();
        
        const field = this.abschnitte[ artikel.kategorie ].field;
        
        if ( field.value === artikel.id ) {
            field.setValue( null );
        } else {
            field.setValue( artikel.id );
        }
        
        await this.apiService.vorgangSpeichern( this.formService.vorgang );
    }
    
    async senden( e : Event ) {
        e.preventDefault();
        
        await this.router.navigateByUrl(
            this.urlService.routeToVorgangBearbeiten(
                this.formService.vorgang.id,
                VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG
            )
        );
    }
}
