
// Welche Informationen braucht man um die Navigation darzustellen?

import { VorgangBearbeitenSchritt } from '../../shared/model/VorgangBearbeitenSchritt';

export interface NavigationItem {
    // slug : string; // muss das der controller wissen? nope! das ist die verantwortung der view
    // label : string; // muss das der controller wissen? nope! das ist die verantwortung der view
    // isActive : boolean;
    isVisible : boolean;
    isValid : boolean | null;
    isInvalid : boolean | null;
    errorCount : number;
}

export type Navigation = Record<VorgangBearbeitenSchritt, NavigationItem>;
export type NavigationForUi = Array<NavigationItem & { schritt : VorgangBearbeitenSchritt }>;
export type ConstraintsByField = Record<string, Record<string, string>>;

// Welche Aktionen kann man durchführen?

export interface NavigationActions {
    navigateToNextItem() : Promise<void>;
    
    navigateToPreviousItem() : Promise<void>;
    
    navigateToItem( item : NavigationItem ) : Promise<void>;
}
