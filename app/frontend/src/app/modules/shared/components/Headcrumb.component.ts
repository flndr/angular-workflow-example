import { Input }      from '@angular/core';
import { Component }  from '@angular/core';
import { UrlService } from '../services/url.service';

@Component( {
    selector : 'app-headcrumb',
    styles   : [
        `
        `
    ],
    template : `
        <div>
            <h1 *ngIf="!site">Übersicht aller Vorgänge</h1>
            <h1 *ngIf="site">
                <a [routerLink]="MODUL_URL.VORGANG_UEBERSICHT">Übersicht</a>
                -->
                {{site}}
            </h1>
        </div>`,
} )
export class HeadcrumbComponent {
    
    @Input()
    site : string | null = null;
    
    MODUL_URL = UrlService.MODUL_URL;
}
