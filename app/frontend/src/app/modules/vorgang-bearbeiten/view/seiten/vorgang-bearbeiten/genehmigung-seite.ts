import { Component }   from '@angular/core';
import { Genehmigung } from '@tom/models';

import { Abholung }                 from '@tom/models';
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
                <app-text-field [control]="fields.kuerzel" label="Kürzel des Genehmigenden"></app-text-field>
            </div>
   <div class="mb-3">
                <app-text-field [control]="fields.anmerkungen" label="Anmerkungen"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class GenehmigungSeite extends VorgangBearbeitenSeite<Genehmigung> {
    
    override formular         = Genehmigung;
    override dieserSchritt    = VorgangBearbeitenSchritt.GENEHMIGUNG;
    override naechsterSchritt = VorgangBearbeitenSchritt.ABSCHLUSS;
    
}
