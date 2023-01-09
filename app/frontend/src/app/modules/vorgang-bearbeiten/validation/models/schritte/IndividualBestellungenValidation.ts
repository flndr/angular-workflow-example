import { Type }           from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { IndividualBestellungen } from '@tom/models';

import { IndividualBestellungValidation } from './IndividualBestellungValidation';

export class IndividualBestellungenValidation implements IndividualBestellungen {
    @ValidateNested()
    @Type( () => IndividualBestellungValidation )
    public bestellungen : Array<IndividualBestellungValidation>;
}
