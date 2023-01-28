import { PrimaryGeneratedColumn } from 'typeorm';
import { Column }                 from 'typeorm';

import { StandardHardwareKategorie } from '@tom/models';
import { StandardHardwareArtikel }   from '@tom/models';

export class StandardHardwareArtikelEntity implements StandardHardwareArtikel {
    
    @PrimaryGeneratedColumn()
    id : string;
    
    @Column()
    titel : string;
    
    @Column()
    beschreibung : string;
    
    @Column()
    imgUrl : string;
    
    @Column()
    kategorie : StandardHardwareKategorie;
    
    @Column( { type : 'float' } )
    kosten : number;
}
