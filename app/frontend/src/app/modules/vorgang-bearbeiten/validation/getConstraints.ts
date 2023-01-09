import { plainToInstance }  from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
import { validate }         from 'class-validator';
import { ValidationError }  from 'class-validator';

export interface Constraints {
    [ type : string ] : string;
}

export type ConstraintsPerProperty = Array<{
    property : string,
    constraints : Constraints
}>;


export const getConstraints = async <T, V>( cls : ClassConstructor<T>, plain : V ) : Promise<ConstraintsPerProperty> => {
    const instance : T = plainToInstance( cls, plain );
    const errors       = await validate( instance as unknown as object );
    return validationErrorsAsArray( errors );
}

export function validationErrorsAsArray(
    errors : ValidationError[] | ValidationError,
    parentPath = '',
) : ConstraintsPerProperty {
    if ( !Array.isArray( errors ) ) {
        errors = [ errors ];
    }
    
    let result : ConstraintsPerProperty = [];
    
    errors.forEach( error => {
        result = [
            ...result,
            ...formatError( error, parentPath )
        ];
    } );
    
    return result;
}

function formatError( error : ValidationError, parentPath : string ) : ConstraintsPerProperty {
    let result : ConstraintsPerProperty = [];
    
    const property    = propertyPath( parentPath, error.property );
    const constraints = error.constraints || {};
    
    if ( Object.keys( constraints ).length > 0 ) {
        result.push( { property, constraints } );
    }
    
    if ( error.children && error.children.length > 0 ) {
        error.children.forEach( err => {
            formatError( err, property ).forEach( fe => result.push( fe ) );
        } );
    }
    
    return result;
}

function propertyPath( parent : string, name : string ) {
    let result = name;
    if ( parent ) {
        result = `${ parent }.${ name }`;
    }
    return result;
}


