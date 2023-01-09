import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlService } from './modules/shared/services/url.service';

const routes : Routes = [
    {
        path         : UrlService.MODUL_URL.VORGANG_UEBERSICHT,
        loadChildren : () => import('./modules/vorgang-uebersicht/vorgang-uebersicht.module').then( m => m.VorgangUebersichtModule )
    },
    {
        path         : UrlService.MODUL_URL.VORGANG_BEARBEITEN,
        loadChildren : () => import('./modules/vorgang-bearbeiten/vorgang-bearbeiten.module').then( m => m.VorgangBearbeitenModule )
    },
];

@NgModule( {
    imports : [ RouterModule.forRoot( routes ) ],
    exports : [ RouterModule ],
} )
export class AppModuleLazy {}
