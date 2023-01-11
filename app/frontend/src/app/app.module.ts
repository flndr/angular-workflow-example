import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import { AppModuleLazy } from './app.module.lazy';
import { AppComponent }  from './app.component';
import { UrlService }    from './modules/shared/services/url.service';
import { SharedModule }  from './modules/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule( {
    declarations : [
        AppComponent,
    ],
    imports : [
        BrowserModule,
        AppModuleLazy,
        SharedModule,
        NgbModule
    ],
    providers    : [
        UrlService
    ],
    bootstrap    : [ AppComponent ]
} )
export class AppModule {}
