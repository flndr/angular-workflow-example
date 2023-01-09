import { IsNotEmpty } from 'class-validator';

import { BkzAuswahl } from '@tom/models';

export class BkzAuswahlValidation implements BkzAuswahl {
    @IsNotEmpty()
    public bkz : string | null;
}
