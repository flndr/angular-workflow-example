import { FormControl }              from '@angular/forms';
import { VorgangBearbeitenSchritt } from '../../shared/model/VorgangBearbeitenSchritt';


export const mapSchrittAsForm = <F>( form : new () => F, schritt : VorgangBearbeitenSchritt ) : {
    fields : Record<keyof F, FormControl>,
    formGroup : Record<string, FormControl>
} => {
    const fields : Record<string, FormControl>    = {};
    const formGroup : Record<string, FormControl> = {};
    
    Object.keys( new form() as object ).map( key => {
        
        fields[ key ] = new FormControl();
        
        formGroup[ schritt + '.' + key ] = fields[ key ];
        
    } );
    
    return {
        fields : fields as Record<keyof F, FormControl>,
        formGroup
    };
}
