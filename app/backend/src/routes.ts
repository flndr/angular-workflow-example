import { Express }      from 'express';
import { Request }      from 'express';
import { Response }     from 'express';
import { NextFunction } from 'express-serve-static-core';

import { ApiUrl } from '@tom/models';

import { ApiController } from './services/ApiController';
import { between }       from './util/between';
import { sleep }         from './util/sleep';

const apiController = new ApiController();

const simulateSlowBackend = async ( req : Request, res : Response, next : NextFunction ) => {
    await sleep( between( 0, 1 ) );
    next();
}

export const addRoutes = ( app : Express ) => {
    app.get( ApiUrl.VORGAENGE, simulateSlowBackend, apiController.vorgaengeLaden.bind( apiController ) );
    
    app.get( ApiUrl.vorgangUrl(), simulateSlowBackend, apiController.vorgangLaden.bind( apiController ) );
    app.post( ApiUrl.vorgangUrl(), simulateSlowBackend, apiController.vorgangSpeichern.bind( apiController ) );
    
    app.get( ApiUrl.STANDARD_HARDWARE, simulateSlowBackend, apiController.standardHardwareLaden.bind( apiController ) );
    app.get( ApiUrl.MITARBEITER, simulateSlowBackend, apiController.mitarbeiterLaden.bind( apiController ) );
}


