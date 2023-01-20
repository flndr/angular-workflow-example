import { CommonModule }     from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule }         from '@angular/core';
import { Route }            from '@angular/router';
import { RouterModule }     from '@angular/router';
import { LayoutModule }     from '../layout/layout.module';
import { ApiService }       from '../shared/services/api.service';
import { TitleService }     from '../shared/services/title.service';

import { SharedModule }           from '../shared/shared.module';
import { VorgangUebersichtSeite } from './view/seiten/vorgang-uebersicht-seite';

const routes : Route[] = [
    {
        path      : '',
        component : VorgangUebersichtSeite,
        title     : TitleService.VORGANG_UEBERSICHT
    },
];

@NgModule( {
    declarations : [
        VorgangUebersichtSeite
    ],
    imports      : [
        CommonModule,
        LayoutModule,
        SharedModule,
        RouterModule.forChild( routes )
    ],
    providers    : [],
    exports      : []
} )
export class VorgangUebersichtModule {}
