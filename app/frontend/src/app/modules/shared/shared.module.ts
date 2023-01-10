import { CommonModule }             from '@angular/common';
import { HttpClientModule }         from '@angular/common/http';
import { NgModule }                 from '@angular/core';
import { RouterLink }               from '@angular/router';
import { HeadcrumbComponent }       from './components/Headcrumb.component';
import { HighlightLayoutComponent } from './components/highlight-layout.component';
import { HolyGrailLayoutComponent } from './layouts/holy-grail-layout.component';

@NgModule( {
    declarations : [
        HighlightLayoutComponent,
        HolyGrailLayoutComponent,
        HeadcrumbComponent,
    ],
    exports      : [
        HighlightLayoutComponent,
        HolyGrailLayoutComponent,
        HeadcrumbComponent,
    ],
    imports : [
        CommonModule,
        HttpClientModule,
        RouterLink
    ],
    providers    : []
} )
export class SharedModule {}
