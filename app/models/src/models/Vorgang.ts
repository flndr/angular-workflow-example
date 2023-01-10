import { VorgangSchritte } from './VorgangSchritte';
import { VorgangStatus }   from './VorgangStatus';

export interface Vorgang {
    id : string;
    erstellerKuerzel : string;
    erstellungszeitpunkt : string;
    schritte : VorgangSchritte;
    status : VorgangStatus;
}
