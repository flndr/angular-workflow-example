import { VorgangBearbeitenSchritt } from '@tom/models';

// Welche Informationen braucht man um die Navigation darzustellen?

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

// Welche Aktionen kann man durchführen?

export interface NavigationActions {
    navigateToNextItem() : Promise<void>;
    
    navigateToPreviousItem() : Promise<void>;
    
    navigateToItem( item : NavigationItem ) : Promise<void>;
}
