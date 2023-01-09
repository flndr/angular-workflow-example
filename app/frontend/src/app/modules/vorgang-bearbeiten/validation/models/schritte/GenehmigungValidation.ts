import { IsNotEmpty } from 'class-validator';

import { Genehmigung } from '@tom/models';

export class GenehmigungValidation implements Genehmigung {
    @IsNotEmpty()
    public kuerzel : string | null;
    public anmerkungen : string | null;
}
