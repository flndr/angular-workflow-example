import { Component } from '@angular/core';

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
                <app-text-field [control]="fields.abholungArt" label="Art der Abholung"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class AbholungSeite extends VorgangBearbeitenSeite<Abholung> {
    
    override formular         = Abholung;
    override dieserSchritt    = VorgangBearbeitenSchritt.ABHOLUNG;
    override naechsterSchritt = VorgangBearbeitenSchritt.LIEFERANSCHRIFT;
    
}
