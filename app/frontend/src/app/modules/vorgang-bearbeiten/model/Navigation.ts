import { VorgangBearbeitenSchritt } from '@tom/models';

// Welche Informationen braucht man um ein Item darzustellen?

export interface NavigationItem {
    // slug : string; // muss das der controller wissen? nope! das ist die verantwortung der view
    // label : string; // muss das der controller wissen? nope! das ist die verantwortung der view
    order : number;
    isActive : boolean;
    isVisible : boolean;
    isValid : boolean | null;
    isInvalid : boolean | null;
}

// Welche Aktionen kann man durchführen?

export interface NavigationActions {
    navigateToNextItem() : Promise<void>;
    
    navigateToPreviousItem() : Promise<void>;
    
    navigateToItem( item : NavigationItem ) : Promise<void>;
}

// Welche Informationen braucht die UI noch um alles darzustellen?

export type Navigation = Record<VorgangBearbeitenSchritt, NavigationItem>;
