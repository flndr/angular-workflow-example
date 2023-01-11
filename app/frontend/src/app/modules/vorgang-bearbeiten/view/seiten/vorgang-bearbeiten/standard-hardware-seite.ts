import { Component }               from '@angular/core';
import { StandardHardwareAuswahl } from '@tom/models';

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
                <app-text-field [control]="fields.artikel" label="StandardHardwareAuswahl"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class StandardHardwareSeite extends VorgangBearbeitenSeite<StandardHardwareAuswahl> {
    
    override formular         = StandardHardwareAuswahl;
    override dieserSchritt    = VorgangBearbeitenSchritt.STANDARD_HARDWARE;
    override naechsterSchritt = VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG;
    
}
