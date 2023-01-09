import { IsNotEmpty } from 'class-validator';

import { MitarbeiterAuswahl } from '@tom/models';

export class MitarbeiterAuswahlValiation implements MitarbeiterAuswahl {
    @IsNotEmpty( { message : 'Bitte wähle einen Mitarbeiter aus.' } )
    public kuerzel : string | null;
}
