import { Input }       from '@angular/core';
import { Component }   from '@angular/core';
import { FormControl } from '@angular/forms';
import { v4 as uuid }  from 'uuid';

@Component( {
    selector : 'app-checkbox-field',
    styles   : [
        `
        
        `
    ],
    template : `
        <div *ngIf="control" class="form-check form-switch">
            <input class="form-check-input"
                   type="checkbox"
                   [attr.id]="id"
                   [class.is-invalid]="control.dirty && control.invalid"
                   [formControl]="control"/>

            <label class="form-check-label user-select-none" [attr.for]="id">
                {{label}}
            </label>

            <div class="invalid-feedback">
                {{ control.errors | json }}
            </div>
        </div>
    `,
} )
export class CheckboxFieldComponent {
    
    id = uuid();
    
    @Input()
    control : FormControl;
    
    @Input()
    label : string;
}
