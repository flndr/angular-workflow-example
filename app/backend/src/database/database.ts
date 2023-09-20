import { DataSource } from 'typeorm';

import { VorgangEntity }                 from './entities/VorgangEntity';
import { LieferanschriftEntity }         from './entities/LieferanschriftEntity';
import { StandardHardwareArtikelEntity } from './entities/StandardHardwareArtikelEntity';

const entities = [
    VorgangEntity,
    LieferanschriftEntity,
    StandardHardwareArtikelEntity
];

export const Database = new DataSource( {
    entities,
    type        : "better-sqlite3",
    database    : "db.sqlite",
    logging     : false,
    synchronize : true,
    migrations  : [],
} );

export const clearDatabase = async () => {
    const pre = `/// `;
    
    console.log( pre );
    console.log( pre + `CLEARING DATABASE...` );
    console.log( pre );
    
    for ( const entity of entities ) {
        
        try {
            const tableName = Database.getRepository( entity ).metadata.tableName;
            
            await Database.query(
                `DELETE
                 FROM ${ tableName };`,
            );
            
            await Database.query(
                `DELETE
                 FROM sqlite_sequence
                 WHERE name = :table;`,
                [ tableName ]
            );
            console.log( pre + `--> Table "${ tableName }" cleared.` );
        } catch ( e ) {
            console.log( pre + `--> ${ e }` );
        }
        
    }

    console.log( pre );
}
