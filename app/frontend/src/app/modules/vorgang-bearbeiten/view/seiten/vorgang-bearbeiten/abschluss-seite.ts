import { Component } from '@angular/core';
import { Abschluss } from '@tom/models';

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
                <app-text-field [control]="fields.checkboxAllesGeprueftUndBestaetigt"
                                label="checkboxAllesGeprueftUndBestaetigt"></app-text-field>
            </div>

            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class AbschlussSeite extends VorgangBearbeitenSeite<Abschluss> {
    
    override formular         = Abschluss;
    override dieserSchritt    = VorgangBearbeitenSchritt.ABSCHLUSS;
    override naechsterSchritt = null;
    
}
