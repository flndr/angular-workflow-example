import { Type }           from 'class-transformer';
import { Matches }        from 'class-validator';
import { Equals }         from 'class-validator';
import { IsNotEmpty }     from 'class-validator';
import { IsEnum }         from 'class-validator';
import { ValidateIf }     from 'class-validator';
import { ValidateNested } from 'class-validator';

import { IndividualBestellung } from '@tom/models';
import { AbholungArt }          from '@tom/models';
import { Lieferanschrift }      from '@tom/models';

import { IndividualBestellungValidation }     from './dtos/IndividualBestellungValidation';
import { LieferanschriftValidation }          from './dtos/LieferanschriftValidation';
import { StandardHardwareAuswahlValidierung } from './dtos/StandardHardwareAuswahlValidierung';
import { VorgangBearbeitenForm }              from './VorgangBearbeitenForm';

export class ExtraFieldsValidationOptions {
    isManager : boolean;
}

const kuerzelPattern = '[A-Z]{3}';

export class VorgangBearbeitenValidierung extends ExtraFieldsValidationOptions implements VorgangBearbeitenForm {
    
    @IsEnum( AbholungArt )
    abholungArt : AbholungArt;
    
    @IsNotEmpty()
    @Matches( kuerzelPattern )
    beguenstigterKuerzel : string;
    
    @IsNotEmpty()
    bkz : string;
    
    @Equals( true )
    checkboxAllesGeprueftUndBestaetigt : boolean;
    
    @ValidateIf( ( form : VorgangBearbeitenValidierung ) => !form.isManager )
    @IsNotEmpty()
    @Matches( kuerzelPattern )
    genehmigerKuerzel : string;
    
    genehmigungAnmerkungen : string;
    
    @ValidateNested()
    @Type( () => StandardHardwareAuswahlValidierung )
    standardHardwareAuswahl : StandardHardwareAuswahlValidierung;
    
    @ValidateNested()
    @Type( () => IndividualBestellungValidation )
    individualBestellungen : Array<IndividualBestellung>;
    
    @ValidateIf( ( form : VorgangBearbeitenValidierung ) => form.abholungArt === AbholungArt.KURIER )
    @ValidateNested()
    @Type( () => LieferanschriftValidation )
    lieferanschrift : Lieferanschrift | null;
    
    @IsNotEmpty()
    titel : string;
    
}
