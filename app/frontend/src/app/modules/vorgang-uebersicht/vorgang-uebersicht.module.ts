import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { Route }        from '@angular/router';
import { RouterModule } from '@angular/router';

import { SharedModule }           from '../shared/shared.module';
import { VorgangUebersichtSeite } from './view/seiten/vorgang-uebersicht-seite';

const routes : Route[] = [
    {
        path      : '',
        component : VorgangUebersichtSeite
    },
];

@NgModule( {
    declarations : [
        VorgangUebersichtSeite
    ],
    imports      : [
        CommonModule,
        SharedModule,
        RouterModule.forChild( routes )
    ],
    providers    : [],
    exports      : []
} )
export class VorgangUebersichtModule {}
