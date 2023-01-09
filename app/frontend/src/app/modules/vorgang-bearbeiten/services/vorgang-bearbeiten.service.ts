import { Injectable } from '@angular/core';

@Injectable( {
    providedIn : 'root'
} )
export class VorgangBearbeitenService {
    
    private _isHighlightingActive = false;
    
    constructor() { }
    
    get isHighlightingActive() {
        return this._isHighlightingActive;
    }
    
    toggleIsHighlightingActive() {
        this._isHighlightingActive = !this._isHighlightingActive;
    }
    
}
