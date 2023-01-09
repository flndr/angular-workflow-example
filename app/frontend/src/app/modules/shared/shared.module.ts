import { HttpClientModule } from '@angular/common/http';
import { NgModule }         from '@angular/core';

import { HighlightLayoutComponent } from './components/highlight-layout.component';
import { HolyGrailLayoutComponent } from './layouts/holy-grail-layout.component';

@NgModule( {
    declarations : [
        HighlightLayoutComponent,
        HolyGrailLayoutComponent,
    ],
    exports      : [
        HighlightLayoutComponent,
        HolyGrailLayoutComponent,
    ],
    imports      : [
        HttpClientModule
    ],
    providers    : []
} )
export class SharedModule {}
