import { FormGroup } from '@angular/forms';

import { VorgangBearbeitenSchritt as Schritt } from '@tom/models';

import { FormService }            from '../services/form.service';
import { ConstraintsPerProperty } from '../validation/index';

export const connectForm = async ( formService : FormService, formGroup : FormGroup, schritt : Schritt ) => {
    
    const setFormGroupValues = () => {
        const formData : Record<string, any> = formService.schritte[ schritt ];
        Object.keys( formData ).forEach( field => {
            const control = formGroup.controls[ schritt + '.' + field ];
            if ( control ) {
                control.setValue( formData[ field ] );
            } else {
                console.error( `FormGroup control  "${ schritt + '.' + field }" not found.` );
            }
        } );
    };
    
    const setFormGroupErrors = () => {
        const constraints : ConstraintsPerProperty = formService.constraintsFilteredBy( schritt );
        constraints.forEach( c => {
            const control = formGroup.controls[ c.property ];
            if ( control ) {
                control.setErrors( c.constraints );
            } else {
                console.error( `FormGroup control  "${ c.property }" not found.` );
            }
        } );
    }
    
    // write values from service into form group
    setFormGroupValues();
    
    // TODO entfernen - soll beim laden passieren
    await formService.updateConstraints();
    
    // write constraints from service into form group as field errors
    setFormGroupErrors();
    
    formGroup.valueChanges.subscribe( async formValues => {
        await formService.updateFormValues( formValues );
        setFormGroupErrors();
    } );
    
}
