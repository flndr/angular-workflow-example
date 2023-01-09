import { Component } from '@angular/core';

@Component( {
    selector : 'app-holy-grail-layout',
    styles   : [
        `
            :host {
                height : 100%;
            }

            .Layout_Wrapper {
                height         : 100%;

                display        : flex;
                flex-direction : column;
            }

            .Layout_Center {
                flex-grow       : 1;
                align-self      : stretch;
                width           : 100%;

                display         : flex;
                justify-content : stretch;
                align-items     : stretch;
            }

            .Layout_Center_Right,
            .Layout_Center_Center,
            .Layout_Center_Left {
                align-self : stretch;
                width      : auto;
                height     : 100%;
            }

            .Layout_Center_Center {
                flex-grow : 1;
            }
        `
    ],
    template : `
        <div class="Layout_Wrapper">

            <div class="Layout_Top">
                <ng-content select="[slot='top']"></ng-content>
            </div>

            <div class="Layout_Center">
                <div class="Layout_Center_Left">
                    <ng-content select="[slot='center-left']"></ng-content>
                </div>
                <div class="Layout_Center_Center">
                    <ng-content select="[slot='center-center']"></ng-content>
                </div>
                <div class="Layout_Center_Right">
                    <ng-content select="[slot='center-right']"></ng-content>
                </div>
            </div>


            <div class="Layout_Bottom">
                <ng-content select="[slot='bottom']"></ng-content>
            </div>

        </div>
    `
} )
export class HolyGrailLayoutComponent {

}
