import bodyParser     from 'body-parser';
import cors           from "cors";
import { randomUUID } from 'crypto';
import express        from "express";
import morgan         from 'morgan';

import { VorgangStatus } from '@tom/models';
import { AbholungArt }   from '@tom/models';

import { clearDatabase }         from './database/database';
import { Database }              from './database/database';
import { LieferanschriftEntity } from './database/entities/LieferanschriftEntity';
import { VorgangEntity }         from './database/entities/VorgangEntity';

import { PORT }      from './env';
import { addRoutes } from './routes';

( async () => {
    try {
        
        await Database.initialize();
        await clearDatabase();
        
        const lieferanschrift    = new LieferanschriftEntity()
        lieferanschrift.vorname  = 'Tom';
        lieferanschrift.nachname = 'Flan';
        lieferanschrift.strasse  = 'Musterstr. 1a';
        lieferanschrift.plz      = '12345';
        lieferanschrift.ort      = 'Nürnberg';
        lieferanschrift.land     = 'D';
        
        const vorgang                              = new VorgangEntity()
        vorgang.id                                 = randomUUID();
        vorgang.titel                              = 'Neuer Vorgang mit TypeORM';
        vorgang.bkz                                = 'BKZ';
        vorgang.abholungArt                        = AbholungArt.KURIER;
        vorgang.beguenstigterKuerzel               = 'ARA';
        vorgang.erstellerKuerzel                   = 'TOM';
        vorgang.checkboxAllesGeprueftUndBestaetigt = true;
        vorgang.erstellungZeitpunkt                = ( new Date() ).toISOString();
        vorgang.genehmigerKuerzel                  = 'SZO';
        vorgang.genehmigungAnmerkungen             = '';
        vorgang.status                             = VorgangStatus.ZWISCHENGESPEICHERT;
        vorgang.lieferanschrift                    = lieferanschrift;
        
        await Database.manager.save( vorgang );
        
        const vorgaenge = await Database.manager.find( VorgangEntity, {
            relations : {
                lieferanschrift : true
            }
        } );
        console.log( "All VorgangEntities from the db: ", vorgaenge );
        
        
        ////////////
        
        const app = express();
        
        app.use( cors() );
        app.use( morgan( 'dev' ) );
        
        app.use( bodyParser.urlencoded( { extended : false } ) );
        app.use( bodyParser.json() );
        
        addRoutes( app );
        
        app.listen( PORT, () =>
            console.log( `Workflow Dummy Server running at http://localhost:${ PORT }/` )
        );
        
    } catch ( e ) {
        console.log( e );
    }
    
} )();
