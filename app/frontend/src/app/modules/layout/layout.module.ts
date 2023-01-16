import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';

import { HolyGrailLayoutComponent } from './holy-grail-layout.component';

@NgModule( {
    declarations : [
        HolyGrailLayoutComponent
    ],
    exports      : [
        HolyGrailLayoutComponent,
    ],
    imports      : [
        CommonModule
    ],
    providers    : []
} )
export class LayoutModule {}
