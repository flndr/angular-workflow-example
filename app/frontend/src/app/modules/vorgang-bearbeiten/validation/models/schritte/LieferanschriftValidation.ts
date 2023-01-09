import { IsNotEmpty } from 'class-validator';

import { Lieferanschrift } from '@tom/models';

export class LieferanschriftValidation implements Lieferanschrift {
    @IsNotEmpty()
    public land : string | null;
    @IsNotEmpty()
    public nachname : string | null;
    @IsNotEmpty()
    public ort : string | null;
    @IsNotEmpty()
    public plz : string | null;
    @IsNotEmpty()
    public strasse : string | null;
    @IsNotEmpty()
    public vorname : string | null;
}
