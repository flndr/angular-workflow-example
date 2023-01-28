import { PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne }               from 'typeorm';
import { Column }                 from 'typeorm';
import { Entity }                 from 'typeorm';
import { Relation }               from 'typeorm';

import { Lieferanschrift } from '@tom/models';

import { VorgangEntity } from './VorgangEntity';

@Entity()
export class LieferanschriftEntity implements Lieferanschrift {
    
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column( { type : 'text', nullable : true } )
    vorname : string | null;
    
    @Column( { type : 'text', nullable : true } )
    nachname : string;
    
    @Column( { type : 'text', nullable : true } )
    strasse : string;
    
    @Column( { type : 'text', nullable : true } )
    plz : string;
    
    @Column( { type : 'text', nullable : true } )
    ort : string;
    
    @Column( { type : 'text', nullable : true } )
    land : string;
    
    @OneToOne( () => VorgangEntity, ( vorgang ) => vorgang.lieferanschrift )
    vorgang : Relation<VorgangEntity>
}
