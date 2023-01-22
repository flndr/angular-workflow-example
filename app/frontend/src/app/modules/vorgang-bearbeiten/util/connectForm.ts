import { FormControl } from '@angular/forms';
import { FormGroup }   from '@angular/forms';

import { FormService } from '../services/form.service';

export const connectForm = async (
    formService : FormService,
    formGroup : FormGroup,
    fields : Record<string, FormControl>
) => {
    
    const fieldNames = Object.keys( fields );
    
    const setFormGroupValues = () => {
        const formData : Record<string, any> = formService.getValues( fieldNames );
        Object.keys( formData ).forEach( field => {
            const control = formGroup.controls[ field ];
            if ( control ) {
                control.setValue( formData[ field ] );
                control.disable();
                control.enable();
            } else {
                console.error( `Konnte Wert für FormControl "${ field }" nicht setzen, weil nicht gefunden.` );
            }
        } );
    };
    
    const setFormGroupErrors = () => {
        Object.keys( fields ).forEach( fieldName => {
            const control     = formGroup.controls[ fieldName ];
            const constraints = formService.getConstraints( [ fieldName ] )
            if ( control ) {
                const errors = constraints.length === 1 ? constraints[ 0 ].constraints : null;
                control.setErrors( errors );
                // setTimeout? --> https://github.com/angular/angular/issues/38191
                setTimeout( () => {
                    control.setErrors( errors );
                }, 5 );
            }
        } );
    }
    
    // write values from service into form group
    setFormGroupValues();
    
    // write constraints from service into form group as field errors
    setFormGroupErrors();
    
    formGroup.valueChanges.subscribe( async formValues => {
        await formService.updateFormValues( formValues );
        setFormGroupErrors();
    } );
    formService.constraints$.subscribe( () => {
        setFormGroupErrors();
    } );
    
    formGroup.markAsDirty();
    
}

