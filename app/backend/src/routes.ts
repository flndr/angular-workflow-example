import { Response } from 'express';
import { Express }  from 'express';

import { ApiUrl } from '@tom/models';

import { ApiError }         from './errors/ApiError';
import { ExcelParserError } from './errors/ExcelParserErrors';
import { ApiController }    from './services/ApiController';

const apiController = new ApiController();

const returnError = ( res : Response, e : Error | any ) => {
    let status  = 500;
    let message = 'Something went wrong';
    if ( e instanceof ExcelParserError || e instanceof ApiError ) {
        status = 400;
    }
    if ( e instanceof Error ) {
        message = e.message;
    }
    res.status( status ).jsonp( { message } );
}

export const addRoutes = ( app : Express ) => {
    app.get( ApiUrl.VORGAENGE, apiController.vorgaengeLaden.bind(apiController) );
    app.get( ApiUrl.vorgangUrl(), apiController.vorgangLaden.bind(apiController) );
}
