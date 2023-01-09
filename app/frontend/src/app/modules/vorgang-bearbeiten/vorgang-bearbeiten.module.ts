import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { Route }        from '@angular/router';
import { RouterModule } from '@angular/router';

import { VorgangBearbeitenSchritt } from '@tom/models';
import { UrlService }               from '../shared/services/url.service';
import { SharedModule }             from '../shared/shared.module';

import { VorgangIdSpeichernGuard }      from './routes/merke-vorgang-id-guard.service';
import { FehlerseiteGrund }             from './view/errors/FehlerseiteGrund';
import { FehlerSeite }                  from './view/seiten/_fehler-seite';
import { SeitenLayout }                 from './view/seiten/_seiten-layout';
import { VorgangBearbeitenFehlerSeite } from './view/seiten/vorgang-bearbeiten/_vorgang-bearbeiten-fehler-seite';
import { VorgangBearbeitenLayout }      from './view/seiten/vorgang-bearbeiten/_vorgang-bearbeiten-layout';
import { BkzAuswahlSeite }              from './view/seiten/vorgang-bearbeiten/bkz-auswahl-seite';
import { MitarbeiterAuswahlSeite }      from './view/seiten/vorgang-bearbeiten/mitarbeiter-auswahl-seite';
import { VorgangDetailSeite }           from './view/seiten/vorgang-detail-seite';

export interface RouteData {
    title? : string;
    permission? : string[];
}

export interface Fehlerseite {
    grund? : FehlerseiteGrund;
}

export type ComplexFormRoute = Route & {
    data? : Fehlerseite | RouteData;
}

const routes : ComplexFormRoute[] = [
    {
        path        : ':vorgangId',
        canActivate : [ VorgangIdSpeichernGuard ],
        component   : SeitenLayout,
        children    : [
            {
                path       : '',
                redirectTo : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ],
                pathMatch  : 'full',
            },
            {
                path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ],
                component : MitarbeiterAuswahlSeite,
            },
            {
                path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.BKZ_AUSWAHL ],
                component : BkzAuswahlSeite,
            },
            {
                path      : '**',
                component : VorgangBearbeitenFehlerSeite,
            }
        ]
    },
];

@NgModule( {
    declarations : [
        SeitenLayout,
        FehlerSeite,
        VorgangBearbeitenFehlerSeite,
        VorgangDetailSeite,
        MitarbeiterAuswahlSeite,
        BkzAuswahlSeite,
        VorgangBearbeitenLayout
    
    ],
    imports      : [
        CommonModule,
        SharedModule,
        RouterModule.forChild( routes )
    ],
    providers    : [],
    exports      : []
} )
export class VorgangBearbeitenModule {}
