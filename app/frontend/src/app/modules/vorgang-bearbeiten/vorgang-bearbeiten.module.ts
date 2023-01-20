import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }         from '@angular/forms';
import { Route }               from '@angular/router';
import { RouterModule }        from '@angular/router';
import { NgSelectModule }      from '@ng-select/ng-select';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { LayoutModule }             from '../layout/layout.module';
import { VorgangBearbeitenSchritt } from '../shared/model/VorgangBearbeitenSchritt';
import { UrlService }               from '../shared/services/url.service';
import { SharedModule }             from '../shared/shared.module';
import { MerkeSchrittGuard }        from './routes/merke-schritt-guard.service';

import { VorgangLadenGuard }            from './routes/merke-vorgang-id-guard.service';
import { RouteData }                    from './routes/models/RouteData';
import { CheckboxFieldComponent }       from './view/components/checkbox-field-component';
import { TextFieldComponent }           from './view/components/text-field-component';
import { FehlerseiteGrund }             from './view/errors/FehlerseiteGrund';
import { FehlerSeite }                  from './view/seiten/_fehler-seite';
import { SeitenLayout }                 from './view/seiten/_seiten-layout';
import { VorgangBearbeitenFehlerSeite } from './view/seiten/vorgang-bearbeiten/_vorgang-bearbeiten-fehler-seite';
import { AbholungSeite }                from './view/seiten/vorgang-bearbeiten/abholung-seite';
import { AbschlussSeite }               from './view/seiten/vorgang-bearbeiten/abschluss-seite';
import { BkzAuswahlSeite }              from './view/seiten/vorgang-bearbeiten/bkz-auswahl-seite';
import { GenehmigungSeite }             from './view/seiten/vorgang-bearbeiten/genehmigung-seite';
import { IndividualBestellungSeite }    from './view/seiten/vorgang-bearbeiten/individual-bestellung-seite';
import { LieferanschriftSeite }         from './view/seiten/vorgang-bearbeiten/lieferanschrift-seite';
import { MitarbeiterAuswahlSeite }      from './view/seiten/vorgang-bearbeiten/mitarbeiter-auswahl-seite';
import { StandardHardwareSeite }        from './view/seiten/vorgang-bearbeiten/standard-hardware-seite';
import { VorgangDetailSeite }           from './view/seiten/vorgang-detail-seite';

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
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ],
        canActivate : [ MerkeSchrittGuard ],
        component   : MitarbeiterAuswahlSeite,
        data        : { schritt : VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL }
    },
    {
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.BKZ_AUSWAHL ],
        canActivate : [ MerkeSchrittGuard ],
        component   : BkzAuswahlSeite,
        data        : { schritt : VorgangBearbeitenSchritt.BKZ_AUSWAHL }
    },
    {
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.STANDARD_HARDWARE ],
        canActivate : [ MerkeSchrittGuard ],
        component   : StandardHardwareSeite,
        data        : { schritt : VorgangBearbeitenSchritt.STANDARD_HARDWARE }
    },
    {
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ],
        canActivate : [ MerkeSchrittGuard ],
        component   : IndividualBestellungSeite,
        data        : { schritt : VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG }
    },
    {
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.ABHOLUNG ],
        canActivate : [ MerkeSchrittGuard ],
        component   : AbholungSeite,
        data        : { schritt : VorgangBearbeitenSchritt.ABHOLUNG }
    },
    {
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ],
        canActivate : [ MerkeSchrittGuard ],
        component   : LieferanschriftSeite,
        data        : { schritt : VorgangBearbeitenSchritt.LIEFERANSCHRIFT }
    },
    {
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.GENEHMIGUNG ],
        canActivate : [ MerkeSchrittGuard ],
        component   : GenehmigungSeite,
        data        : { schritt : VorgangBearbeitenSchritt.GENEHMIGUNG }
    },
    {
        path        : UrlService.BEARBEITUNG_SCHRITT_URL[ VorgangBearbeitenSchritt.ABSCHLUSS ],
        canActivate : [ MerkeSchrittGuard ],
        component   : AbschlussSeite,
        data        : { schritt : VorgangBearbeitenSchritt.ABSCHLUSS }
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

//--> datenstruktur und handling mit typescript
//bsp. menu mit validierung
//aufgabe: baut ne schleife mit aus nem interface/dummy (hat wieder nix mit angular zu tun)
//
//--> layouting
//wo gelten layouts (wo padding udn margin setzen)
//wie plant man layouts
//nesting mit routes
//
//--> url als state nutzen (nicht überall den router injecten. routeguard macht das)

//page compoment orchestriert die services zu dieser seite
//page component legt fest WAS und in welcher reihenfolge das passiert
//page component --> controller der page
//
//reihenfolge auf mehreren pages gleich (vorbedingungen) --> route guard

@NgModule( {
    declarations : [
        SeitenLayout,
        FehlerSeite,
        VorgangBearbeitenFehlerSeite,
        VorgangDetailSeite,
        MitarbeiterAuswahlSeite,
        LieferanschriftSeite,
        BkzAuswahlSeite,
        StandardHardwareSeite,
        IndividualBestellungSeite,
        AbholungSeite,
        GenehmigungSeite,
        AbschlussSeite,
        CheckboxFieldComponent,
        TextFieldComponent
    ],
    imports      : [
        CommonModule,
        LayoutModule,
        SharedModule,
        RouterModule.forChild( routes ),
        NgSelectModule,
        NgxJsonViewerModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers    : [],
    exports      : []
} )
export class VorgangBearbeitenModule {}
