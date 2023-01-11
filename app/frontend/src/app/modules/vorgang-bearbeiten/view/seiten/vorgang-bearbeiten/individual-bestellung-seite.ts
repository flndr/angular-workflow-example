import { Component }                from '@angular/core';
import { IndividualBestellungen }   from '@tom/models';
import { VorgangBearbeitenSchritt } from '@tom/models';

import { VorgangBearbeitenSeite } from './vorgang-bearbeiten-seite.component';

@Component( {
    styles   : [
        `
        
        `
    ],
    template : `
        <form [formGroup]="formGroup">

            <div class="mb-3">
                <app-text-field [control]="fields.bestellungen" label="IndividualBestellungSeite"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class IndividualBestellungSeite extends VorgangBearbeitenSeite<IndividualBestellungen> {
    
    override formular         = IndividualBestellungen;
    override dieserSchritt    = VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG;
    override naechsterSchritt = VorgangBearbeitenSchritt.ABHOLUNG;
    
}
