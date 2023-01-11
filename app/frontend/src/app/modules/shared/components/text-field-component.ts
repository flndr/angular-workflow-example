import { Input }       from '@angular/core';
import { Component }   from '@angular/core';
import { FormControl } from '@angular/forms';
import { v4 as uuid }  from 'uuid';

@Component( {
    selector : 'app-text-field',
    styles   : [
        `
        
        `
    ],
    template : `
        <div *ngIf="control">
            <label [attr.for]="id" class="form-label">
                {{label}}
            </label>
            <input type="text" class="form-control"
                   [attr.id]="id"
                   [class.is-invalid]="control.dirty && control.invalid"
                   [formControl]="control"/>
            <div class="invalid-feedback">
                {{ control.errors | json }}
            </div>
        </div>
    `,
} )
export class TextFieldComponent {
    
    id = uuid();
    
    @Input()
    control : FormControl;
    
    @Input()
    label : string;
}
