import { Input }        from '@angular/core';
import { Component }    from '@angular/core';
import { DebugService } from '../services/debug.service';

@Component( {
    selector : 'app-highlight-layout',
    styles   : [
        `
            :host,
            .container {
                height : 100%;
            }

            .label {
                display : none;
            }

            .container--isActive {
                border             : 0.25rem solid red;
                border-radius      : 0.5rem;
                margin             : 1rem;
                padding            : 1rem;
                position           : relative;
                background         : #F8F8F8;
                box-shadow         : 5px 5px 27px rgba(0, 0, 0, 0.2);
                -webkit-box-shadow : 5px 5px 27px rgba(0, 0, 0, 0.2);
                -moz-box-shadow    : 5px 5px 27px rgba(0, 0, 0, 0.2);
            }

            .container--isActive .label {
                display          : block;
                position         : absolute;
                background-color : red;
                color            : white;
                padding          : 0.25rem 0.5rem;
                border-radius    : 0.25rem;
                top              : -0.75rem;
                right            : 1rem;
                height           : 1.25rem;
                display          : flex;
                justify-content  : center;
                align-items      : center;
                font-size        : 0.75rem;
            }

        `
    ],
    template : `
        <div class="container"
             [style.border-color]="color"
             [class.container--isActive]="debugService.isHighlightingActive">
            <div class="label" [style.background-color]="color">
                {{label}}
            </div>
            <ng-content></ng-content>
        </div>
    `,
} )
export class HighlightLayoutComponent {
    
    @Input()
    label : string = '';
    
    @Input()
    color : string = '';
    
    constructor(
        public debugService : DebugService
    ) { }
}
