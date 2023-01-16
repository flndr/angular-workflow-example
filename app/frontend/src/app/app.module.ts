import { HttpClientModule } from '@angular/common/http';
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import { AppModuleLazy } from './app.module.lazy';
import { AppComponent }  from './app.component';
import { LayoutModule }  from './modules/layout/layout.module';
import { UrlService }    from './modules/shared/services/url.service';

@NgModule( {
    declarations : [
        AppComponent,
    ],
    imports      : [
        BrowserModule,
        HttpClientModule,
        AppModuleLazy,
        LayoutModule,
    ],
    providers    : [
        UrlService
    ],
    bootstrap    : [ AppComponent ]
} )
export class AppModule {}
