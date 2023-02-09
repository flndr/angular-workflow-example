import { plainToClass }                 from 'class-transformer';
import { ClassConstructor }             from 'class-transformer';
import { registerDecorator }            from 'class-validator';
import { ValidatorOptions }             from 'class-validator';
import { ValidatorConstraint }          from 'class-validator';
import { ValidatorConstraintInterface } from 'class-validator';
import { ValidationArguments }          from 'class-validator';
import { validate }                     from 'class-validator';
import { ValidationError }              from 'class-validator';

@ValidatorConstraint()
export class NestedElementsConstraint<T extends object> implements ValidatorConstraintInterface {
    constructor( private typeRef : ClassConstructor<T> ) {}
    
    public async validate( value : any, validationArguments? : ValidationArguments ) : Promise<boolean> {
        const validations : Array<Promise<ValidationError[]>> = [];
        
        Object.entries( value ).forEach( entry => {
            validations.push( validate( plainToClass( this.typeRef, entry[ 1 ] ) ) );
        } )
        const process = await Promise.all( validations );
        return process.every( p => p.length > 0 );
    }
    
    public defaultMessage( validationArguments? : ValidationArguments ) : string {
        return `${ validationArguments?.property } NESTED error`;
    }
}

export const NestedElementsValidator = <T extends object>( type : ClassConstructor<T>, options? : ValidatorOptions ) => {
    return ( object : object, propertyName : string ) => {
        console.log( propertyName, object );
        registerDecorator( {
            name        : 'IsNestedHowTomLikesIt',
            target      : object.constructor,
            propertyName,
            options,
            constraints : [],
            validator   : new NestedElementsConstraint( type )
        } )
    }
}
