import { Input }     from '@angular/core';
import { Component } from '@angular/core';

@Component( {
    selector : 'app-headline',
    styles   : [
        `
            .wrap {
                display         : flex;
                align-items     : baseline;
                justify-content : space-between;
                border-bottom   : 1px solid #d3d3d3;
                margin          : 3rem 0;
            }
        `
    ],
    template : `
        <div class="wrap">
            <h1 class="d-inline">
                {{headline}}
            </h1>
            <a *ngIf="showLink" [routerLink]="routerLink">
                {{routerLinkLabel}}
            </a>
        </div>
    `,
} )
export class HeadlineComponent {
    
    @Input()
    routerLink ? : string;
    
    @Input()
    routerLinkLabel ? : string;
    
    @Input()
    headline : string;
    
    get showLink() : boolean {
        return !!this.routerLinkLabel && !!this.routerLinkLabel;
    }
}
