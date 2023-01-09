import { Type }           from 'class-transformer';
import { ValidateIf }     from 'class-validator';
import { ValidateNested } from 'class-validator';

import { VorgangBearbeitenSchritt } from '@tom/models';
import { VorgangSchritte }          from '@tom/models';
import { AbholungArt }              from '@tom/models';

import { AbholungValidation }                from './schritte/AbholungValidation';
import { AbschlussValidation }               from './schritte/AbschlussValidation';
import { BkzAuswahlValidation }              from './schritte/BkzAuswahlValidation';
import { GenehmigungValidation }             from './schritte/GenehmigungValidation';
import { IndividualBestellungenValidation }  from './schritte/IndividualBestellungenValidation';
import { LieferanschriftValidation }         from './schritte/LieferanschriftValidation';
import { MitarbeiterAuswahlValiation }       from './schritte/MitarbeiterAuswahlValiation';
import { StandardHardwareAuswahlValidation } from './schritte/StandardHardwareAuswahlValidation';

export class ExtraFieldsValidationOptions {
    isManager : boolean;
}

export class VorgangSchritteValidations extends ExtraFieldsValidationOptions implements VorgangSchritte {
    
    @ValidateNested()
    @Type( () => MitarbeiterAuswahlValiation )
    public [ VorgangBearbeitenSchritt.MITARBEITER_AUSWAHL ] : MitarbeiterAuswahlValiation;
    
    @ValidateNested()
    @Type( () => BkzAuswahlValidation )
    public [ VorgangBearbeitenSchritt.BKZ_AUSWAHL ] : BkzAuswahlValidation;
    
    @ValidateNested()
    @Type( () => StandardHardwareAuswahlValidation )
    public [ VorgangBearbeitenSchritt.STANDARD_HARDWARE ] : StandardHardwareAuswahlValidation;
    
    @ValidateNested()
    @Type( () => IndividualBestellungenValidation )
    public [ VorgangBearbeitenSchritt.INDIVIDUAL_BESTELLUNG ] : IndividualBestellungenValidation;
    
    @ValidateNested()
    @Type( () => AbholungValidation )
    public [ VorgangBearbeitenSchritt.ABHOLUNG ] : AbholungValidation;
    
    @ValidateIf( ( form : VorgangSchritteValidations ) => form[ VorgangBearbeitenSchritt.ABHOLUNG ].abholungArt === AbholungArt.KURIER )
    @ValidateNested()
    @Type( () => LieferanschriftValidation )
    public [ VorgangBearbeitenSchritt.LIEFERANSCHRIFT ] : LieferanschriftValidation;
    
    @ValidateIf( ( form : VorgangSchritteValidations ) => !form.isManager )
    @ValidateNested()
    @Type( () => GenehmigungValidation )
    public [ VorgangBearbeitenSchritt.GENEHMIGUNG ] : GenehmigungValidation;
    
    @ValidateNested()
    @Type( () => AbschlussValidation )
    public [ VorgangBearbeitenSchritt.ABSCHLUSS ] : AbschlussValidation;
    
}
