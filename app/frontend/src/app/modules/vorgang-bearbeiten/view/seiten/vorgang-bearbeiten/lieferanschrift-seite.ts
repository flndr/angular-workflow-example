import { Component } from '@angular/core';

import { Lieferanschrift }          from '@tom/models';
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
                <app-text-field [control]="fields.vorname" label="Vorname"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields.nachname" label="Nachname"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields.strasse" label="Strasse und Hausnummer"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields.plz" label="PLZ"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields.ort" label="Ort"></app-text-field>
            </div>
            <div class="mb-3">
                <app-text-field [control]="fields.land" label="Land"></app-text-field>
            </div>


            <button class="btn btn-primary" (click)="senden($event)">weiter</button>

            <code>
                <pre>{{formGroup.errors}}</pre>
            </code>

        </form>`,
} )
export class LieferanschriftSeite extends VorgangBearbeitenSeite<Lieferanschrift> {
    
    override formular         = Lieferanschrift;
    override dieserSchritt    = VorgangBearbeitenSchritt.LIEFERANSCHRIFT;
    override naechsterSchritt = VorgangBearbeitenSchritt.GENEHMIGUNG;
    
}
