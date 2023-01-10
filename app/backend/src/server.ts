import cors    from "cors";
import express from "express";
import morgan  from 'morgan';

import { addRoutes } from './routes';
import { PORT }      from './env';

import { helloFromModels } from '@tom/models';

helloFromModels();

//console.log( 'MapCache loaded:' );
//console.log( ' - LastUpdated: ' + mapCacheService.map.lastUpdated );
//console.log( ' - Mitarbeiter: ' + mapCacheService.map.mitarbeiter.length );

const app = express();

app.use( cors() );
app.use( morgan( 'dev' ) );

addRoutes( app );

app.use( express.urlencoded( { extended : false } ) );
app.use( express.json() );

app.listen( PORT, () =>
    console.log( `Workflow Dummy Server running at http://localhost:${ PORT }/` )
);

