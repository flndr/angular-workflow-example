import { Component } from '@angular/core';

@Component( {
    selector : 'app-root',
    styles   : [
        `
            :host {
                height : 100%;
            }
        `
    ],
    template : `
        <app-holy-grail-layout>

            <div slot="top" class="mb-3 bg-dark text-bg-dark">
                <div class="container">
                    Angular Workflow Example App
                </div>
            </div>

            <div slot="bottom" class="bg-dark text-bg-dark">
                <div class="container mb-0">
                    TFL 4 IPU
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
