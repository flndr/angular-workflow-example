import { Component } from '@angular/core';

import { VorgangBearbeitenSchritt } from '@tom/models';
import { MitarbeiterAuswahl }       from '@tom/models';

import { VorgangBearbeitenSeite } from './vorgang-bearbeiten-seite.component';

@Component( {
    styles   : [
        `
        
        `
    ],
    template : `
        <form [formGroup]="formGroup">

            <div class="mb-3">
                <app-text-field [control]="fields.kuerzel" label="Kürzel"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class MitarbeiterAuswahlSeite extends VorgangBearbeitenSeite<MitarbeiterAuswahl> {
    
    override formular         = MitarbeiterAuswahl;
    override dieserSchritt    = VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL;
    override naechsterSchritt = VorgangBearbeitenSchritt.BKZ_AUSWAHL;
    
}
