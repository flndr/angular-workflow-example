import { HttpClient }     from '@angular/common/http';
import { Injectable }     from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { VorgaengeLadenResponse } from '@tom/models';
import { Vorgang }                from '@tom/models';
import { ApiUrl }                 from '@tom/models';

@Injectable( {
    providedIn : 'root'
} )
export class ApiService {
    
    private baseUrl = 'http://localhost:4000';
    
    constructor( private http : HttpClient ) {}
    
    public async getVorgaenge() : Promise<Vorgang[]> {
        const res = await this.get<VorgaengeLadenResponse>( ApiUrl.VORGAENGE );
        return res.vorgaenge;
    }
    
    private async get<M>( url : string ) : Promise<M> {
        const response = await firstValueFrom( this.http.get( this.baseUrl + url ) );
        return response as unknown as M;
    }
    
}
