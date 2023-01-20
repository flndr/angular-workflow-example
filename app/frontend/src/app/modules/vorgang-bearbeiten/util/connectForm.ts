import { FormControl } from '@angular/forms';
import { FormGroup }   from '@angular/forms';

import { FormService }            from '../services/form.service';
import { ConstraintsPerProperty } from '../validation/getConstraints';

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
        const constraints : ConstraintsPerProperty = formService.getConstraints( fieldNames );
        console.log( 'setFormGroupErrors', constraints );
        constraints.forEach( c => {
            const control = formGroup.controls[ c.property ];
            if ( control ) {
                control.setErrors( c.constraints );
                // setTimeout? --> https://github.com/angular/angular/issues/38191
                setTimeout( () => {
                    control.setErrors( c.constraints );
                }, 0 );
            } else {
                console.error( `Konnte Validierung für FormControl  "${ c.property }" nicht setzen, weil nicht gefunden.` );
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
    
    formGroup.markAsDirty();
    
}
