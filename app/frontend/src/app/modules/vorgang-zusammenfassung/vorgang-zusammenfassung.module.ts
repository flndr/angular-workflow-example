import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { Route }        from '@angular/router';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '../layout/layout.module';
import { TitleService } from '../shared/services/title.service';
import { SharedModule } from '../shared/shared.module';

import { VorgangZusammenfassungSeite } from './view/seiten/vorgang-zusammenfassung-seite';

const routes : Route[] = [
    {
        path      : ':vorgangId',
        component : VorgangZusammenfassungSeite,
        title     : TitleService.VORGANG_ZUSAMMENFASSUNG
    },
];

@NgModule( {
    declarations : [
        VorgangZusammenfassungSeite
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
export class VorgangZusammenfassungModule {}
