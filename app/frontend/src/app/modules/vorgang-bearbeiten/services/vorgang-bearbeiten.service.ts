import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Injectable( {
    providedIn : 'root'
} )
export class VorgangBearbeitenService {
    
    private _vorgangId : string | null = null;
    
    constructor(
        private apiService : ApiService,
    ) {}
    
    setVorgangId( id : string ) : void {
        this._vorgangId = id;
    }
    
    getVorgangId() : string {
        if ( !this._vorgangId ) {
            throw new Error( 'VorgangID wurde noch nicht gesetzt!' );
        }
        return this._vorgangId;
    }
    
}
