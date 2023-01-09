import { Min }        from 'class-validator';
import { IsNumber }   from 'class-validator';
import { IsNotEmpty } from 'class-validator';

import { IndividualBestellung } from '@tom/models';

export class IndividualBestellungValidation implements IndividualBestellung {
    @IsNotEmpty()
    public titel : string | null;
    @IsNotEmpty()
    public beschreibung : string | null;
    @IsNotEmpty()
    public bestellungId : string | null;
    @IsNumber()
    @Min( 0 )
    public kosten : number;
}
