import { IsEnum } from 'class-validator';

import { Abholung }    from '@tom/models';
import { AbholungArt } from '@tom/models';

export class AbholungValidation implements Abholung {
    @IsEnum( AbholungArt )
    public abholungArt : AbholungArt | null;
}
