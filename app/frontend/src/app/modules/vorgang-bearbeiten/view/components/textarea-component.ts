import { Input }       from '@angular/core';
import { Component }   from '@angular/core';
import { FormControl } from '@angular/forms';
import { v4 as uuid }  from 'uuid';
import { FormService } from '../../services/form.service';

@Component( {
    selector : 'app-textarea-field',
    styles   : [
        `
        
        `
    ],
    template : `
        <div *ngIf="control">
            <label [attr.for]="id" class="form-label user-select-none">
                {{label}}
            </label>
            <textarea class="form-control"
                      [attr.id]="id"
                      rows="3"
                      [class.is-invalid]="formService.showErrors && control.invalid"
                      [formControl]="control"
            ></textarea>
            <div class="invalid-feedback">
                {{ control.errors | json }}
            </div>
        </div>
    `,
} )
export class TextareaComponent {
    
    id = uuid();
    
    @Input()
    control : FormControl;
    
    @Input()
    label : string;
    
    constructor(
        public formService : FormService
    ) {}
}
