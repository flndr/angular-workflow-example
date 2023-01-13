import { CommonModule }             from '@angular/common';
import { NgModule }                 from '@angular/core';
import { ReactiveFormsModule }      from '@angular/forms';
import { FormsModule }              from '@angular/forms';
import { Route }                    from '@angular/router';
import { RouterModule }             from '@angular/router';
import { VorgangBearbeitenSchritt } from '../shared/model/VorgangBearbeitenSchritt';

import { UrlService }   from '../shared/services/url.service';
import { SharedModule } from '../shared/shared.module';

import { VorgangLadenGuard }            from './routes/merke-vorgang-id-guard.service';
import { FehlerseiteGrund }             from './view/errors/FehlerseiteGrund';
import { FehlerSeite }                  from './view/seiten/_fehler-seite';
import { SeitenLayout }                 from './view/seiten/_seiten-layout';
import { VorgangBearbeitenFehlerSeite } from './view/seiten/vorgang-bearbeiten/_vorgang-bearbeiten-fehler-seite';
import { VorgangBearbeitenLayout }      from './view/seiten/vorgang-bearbeiten/_vorgang-bearbeiten-layout';
import { AbholungSeite }                from './view/seiten/vorgang-bearbeiten/abholung-seite';
import { AbschlussSeite }               from './view/seiten/vorgang-bearbeiten/abschluss-seite';
import { BkzAuswahlSeite }              from './view/seiten/vorgang-bearbeiten/bkz-auswahl-seite';
import { GenehmigungSeite }             from './view/seiten/vorgang-bearbeiten/genehmigung-seite';
import { IndividualBestellungSeite }    from './view/seiten/vorgang-bearbeiten/individual-bestellung-seite';
import { LieferanschriftSeite }         from './view/seiten/vorgang-bearbeiten/lieferanschrift-seite';
import { MitarbeiterAuswahlSeite }      from './view/seiten/vorgang-bearbeiten/mitarbeiter-auswahl-seite';
import { StandardHardwareSeite }        from './view/seiten/vorgang-bearbeiten/standard-hardware-seite';
import { VorgangDetailSeite }           from './view/seiten/vorgang-detail-seite';
import { NgSelectModule }               from '@ng-select/ng-select';

export interface RouteData {
    title? : string;
    schritt : VorgangBearbeitenSchritt;
}

export interface Fehlerseite {
    grund? : FehlerseiteGrund;
}

export type ComplexFormRoute = Route & {
    data? : Fehlerseite | RouteData;
}

const routenFuerSchritte : ComplexFormRoute[] = [
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
        path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.STANDARD_HARDWARE ],
        component : StandardHardwareSeite
    },
    {
        path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ],
        component : IndividualBestellungSeite
    },
    {
        path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.ABHOLUNG ],
        component : AbholungSeite
    },
    {
        path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ],
        component : LieferanschriftSeite,
        data      : { schritt : VorgangBearbeitenSchritt.LIEFERANSCHRIFT }
    },
    {
        path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.GENEHMIGUNG ],
        component : GenehmigungSeite,
    },
    {
        path      : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.ABSCHLUSS ],
        component : AbschlussSeite,
    },
    {
        path      : '**',
        component : VorgangBearbeitenFehlerSeite,
    }
];

const routes : ComplexFormRoute[] = [
    {
        path        : ':vorgangId',
        canActivate : [ VorgangLadenGuard ],
        component   : SeitenLayout,
        children    : routenFuerSchritte
    },
];

@NgModule( {
    declarations : [
        SeitenLayout,
        FehlerSeite,
        VorgangBearbeitenFehlerSeite,
        VorgangDetailSeite,
        MitarbeiterAuswahlSeite,
        LieferanschriftSeite,
        BkzAuswahlSeite,
        VorgangBearbeitenLayout,
        StandardHardwareSeite,
        IndividualBestellungSeite,
        AbholungSeite,
        GenehmigungSeite,
        AbschlussSeite
    ],
    imports      : [
        CommonModule,
        SharedModule,
        RouterModule.forChild( routes ),
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers    : [],
    exports      : []
} )
export class VorgangBearbeitenModule {}
