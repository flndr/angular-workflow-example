import { CommonModule }        from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule }            from '@angular/core';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink }          from '@angular/router';

import { CheckboxFieldComponent }   from './components/checkbox-field-component';
import { TextFieldComponent }       from './components/text-field-component';
import { HeadcrumbComponent }       from './components/headcrumb.component';
import { StatusBadgeComponent }     from './components/statusbadge.component';
import { HighlightLayoutComponent } from './components/highlight-layout.component';
import { HolyGrailLayoutComponent } from './layouts/holy-grail-layout.component';

@NgModule( {
    declarations : [
        HighlightLayoutComponent,
        HolyGrailLayoutComponent,
        HeadcrumbComponent,
        StatusBadgeComponent,
        TextFieldComponent,
        CheckboxFieldComponent,
    ],
    exports      : [
        HighlightLayoutComponent,
        HolyGrailLayoutComponent,
        HeadcrumbComponent,
        StatusBadgeComponent,
        TextFieldComponent,
        CheckboxFieldComponent,
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
