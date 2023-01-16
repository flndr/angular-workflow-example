import { Component } from '@angular/core';

@Component( {
    selector : 'app-root',
    styles   : [
        `
            :host {
                height : 100%;
            }

            .top {
                margin-bottom : 2rem;
            }
        `
    ],
    template : `
        <app-holy-grail-layout>

            <div slot="bottom">
                (C) Hello Tom
            </div>

            <div slot="top" class="top bg-dark text-bg-dark">
                <div class="container">
                    Angular Workflow Example
                </div>
            </div>

            <!--    <div slot="center-left" style="height: 100%; background-color: rgba(94,174,225,0.4)">-->
            <!--        <ul>-->
            <!--            <li><a [routerLink]="'/'">Home</a></li>-->
            <!--            <li><a [routerLink]="'/' + AppRoutes.DYNAMIC_FORM">dynamic-form</a></li>-->
            <!--            <li><a [routerLink]="'/' + AppRoutes.IMPORTS_AND_DI">imports-and-di</a></li>-->
            <!--            <li><a [routerLink]="'/' + AppRoutes.FULL_HEIGHT">full-height</a></li>-->
            <!--            <li><a [routerLink]="'/' + AppRoutes.AUDIO_PLAYER">audio player</a></li>-->
            <!--        </ul>-->
            <!--    </div>-->

            <div slot="center-center" style="height: 100%">
                <router-outlet></router-outlet>
            </div>

            <!--    <div slot="center-right">-->
            <!--        Center-Right-->
            <!--    </div>-->


        </app-holy-grail-layout>
    `,
} )
export class AppComponent {
}
