import { VorgangStatus } from '@tom/models';
import { AbholungArt }   from '@tom/models';
import { Relation }      from 'typeorm';
import { OneToOne }      from 'typeorm';
import { PrimaryColumn } from 'typeorm';
import { Column }        from 'typeorm';
import { Entity }        from 'typeorm';
import { JoinColumn }    from 'typeorm';

import { LieferanschriftEntity } from './LieferanschriftEntity';

@Entity()
export class VorgangEntity /* implements Vorgang */ {
    
    @PrimaryColumn()
    id : string;
    
    @Column()
    titel : string;
    
    @Column()
    abholungArt : AbholungArt;
    
    @Column()
    beguenstigterKuerzel : string;
    
    @Column()
    bkz : string;
    
    @Column()
    checkboxAllesGeprueftUndBestaetigt : boolean;
    
    @Column()
    erstellerKuerzel : string;
    
    @Column()
    erstellungZeitpunkt : string;
    
    @Column()
    genehmigerKuerzel : string;
    
    @Column()
    genehmigungAnmerkungen : string;
    
    //@Column()
    //individualBestellungen : Array<IndividualBestellung>;
    //
    @OneToOne( () => LieferanschriftEntity, ( lieferanschrift ) => lieferanschrift.vorgang, {
        cascade : true
    } )
    @JoinColumn()
    lieferanschrift : Relation<LieferanschriftEntity> | null;

    // @Column()
    // standardHardwareAuswahl : StandardHardwareAuswahl;
    
    @Column()
    status : VorgangStatus;
}
