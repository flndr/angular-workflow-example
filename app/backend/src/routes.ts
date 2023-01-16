import { Express }      from 'express';
import { Request }      from 'express';
import { Response }     from 'express';
import { NextFunction } from 'express-serve-static-core';

import { ApiUrl } from '@tom/models';

import { ApiController } from './services/ApiController';

const apiController = new ApiController();

const simulateSlowBackend = async ( req : Request, res : Response, next : NextFunction ) => {
    await pause( between( 10, 50 ) );
    next();
}

export const addRoutes = ( app : Express ) => {
    app.get( ApiUrl.VORGAENGE, simulateSlowBackend, apiController.vorgaengeLaden.bind( apiController ) );
    
    app.get( ApiUrl.vorgangUrl(), simulateSlowBackend, apiController.vorgangLaden.bind( apiController ) );
    app.post( ApiUrl.vorgangUrl(), simulateSlowBackend, apiController.vorgangSpeichern.bind( apiController ) );
    
    app.get( ApiUrl.STANDARD_HARDWARE, simulateSlowBackend, apiController.standardHardwareLaden.bind( apiController ) );
    app.get( ApiUrl.MITARBEITER, simulateSlowBackend, apiController.mitarbeiterLaden.bind( apiController ) );
}

function pause( ms : number ) : Promise<void> {
    return new Promise( resolve => {
        setTimeout( resolve, ms );
    } );
}

function between( min : number, max : number ) : number {
    return Math.floor( Math.random() * ( max - min + 1 ) + min )
}

