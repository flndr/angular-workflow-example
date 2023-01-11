import cors       from "cors";
import express    from "express";
import bodyParser from 'body-parser';
import morgan     from 'morgan';

import { addRoutes } from './routes';
import { PORT }      from './env';

//console.log( 'MapCache loaded:' );
//console.log( ' - LastUpdated: ' + mapCacheService.map.lastUpdated );
//console.log( ' - Mitarbeiter: ' + mapCacheService.map.mitarbeiter.length );

const app = express();

app.use( cors() );
app.use( morgan( 'dev' ) );

app.use( bodyParser.urlencoded( { extended : false } ) );
app.use( bodyParser.json() );

addRoutes( app );

app.listen( PORT, () =>
    console.log( `Workflow Dummy Server running at http://localhost:${ PORT }/` )
);
