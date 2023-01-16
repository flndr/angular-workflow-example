import { StandardHardwareAuswahl } from '@tom/models';
import { IsNotEmpty }              from 'class-validator';

export class StandardHardwareAuswahlValidierung implements StandardHardwareAuswahl {
    
    @IsNotEmpty()
    public laptopArtikelId : string | null;
    
    public headsetArtikelId : string | null;
    
    public tascheArtikelId : string | null;

}
