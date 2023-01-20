import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint( { name : 'backendBkz', async : false } )
export class BackendBkzValidator implements ValidatorConstraintInterface {
    validate( possibleBkz : string, args : ValidationArguments ) {
        console.log( possibleBkz, args );
        return possibleBkz.length > 1 && possibleBkz.length < 10; // for async validations you must return a Promise<boolean> here
    }
    
    defaultMessage( args : ValidationArguments ) {
        // here you can provide default error message if validation failed
        return 'Das ist kein gültiges BKZ.';
    }
}
