const helloFromValidation = () => console.log( 'helloFromValidation' );

import { getConstraints }             from './getConstraints';
import { ConstraintsPerProperty }     from './getConstraints';
import { vorgangSchritteDefaultData } from "./vorgangSchritteDefaultData";
import { VorgangSchritteValidations } from './models/VorgangSchritteValidations';

const validate = async ( data : VorgangSchritteValidations ) : Promise<ConstraintsPerProperty> => {
    return getConstraints( VorgangSchritteValidations, data );
}

export {
    helloFromValidation,
    
    validate,
    
    ConstraintsPerProperty,
    VorgangSchritteValidations,
    vorgangSchritteDefaultData
};
