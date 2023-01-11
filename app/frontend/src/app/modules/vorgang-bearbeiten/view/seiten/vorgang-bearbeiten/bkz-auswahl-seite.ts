import { Component } from '@angular/core';

import { VorgangBearbeitenSchritt } from '@tom/models';
import { BkzAuswahl }               from '@tom/models';

import { VorgangBearbeitenSeite } from './vorgang-bearbeiten-seite.component';

@Component( {
    styles   : [
        `
        
        `
    ],
    template : `
        <form [formGroup]="formGroup">

            <div class="mb-3">
                <app-text-field [control]="fields.bkz" label="BKZ"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class BkzAuswahlSeite extends VorgangBearbeitenSeite<BkzAuswahl> {
    
    override formular         = BkzAuswahl;
    override dieserSchritt    = VorgangBearbeitenSchritt.BKZ_AUSWAHL;
    override naechsterSchritt = VorgangBearbeitenSchritt.STANDARD_HARDWARE;
    
}
