import { VorgangSchritte }          from './VorgangSchritte';
import { VorgangBearbeitenSchritt } from './VorgangBearbeitenSchritt';

export interface VorgangZwischengespeichert {
    schritte : VorgangSchritte;
    aktiverSchritt : VorgangBearbeitenSchritt;
}
