import { CommonModule }        from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule }            from '@angular/core';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink }          from '@angular/router';

import { HeadcrumbComponent }   from './components/headcrumb.component';
import { HeadlineComponent }    from './components/headline-component';
import { StatusBadgeComponent } from './components/statusbadge.component';

@NgModule( {
    declarations : [
        HeadcrumbComponent,
        StatusBadgeComponent,
        HeadlineComponent
    ],
    exports      : [
        HeadcrumbComponent,
        StatusBadgeComponent,
        HeadlineComponent
    ],
    imports      : [
        RouterLink,
        FormsModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers    : []
} )
export class SharedModule {}
