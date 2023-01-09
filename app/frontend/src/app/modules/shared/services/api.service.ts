import { HttpClient }             from '@angular/common/http';
import { Injectable }             from '@angular/core';
import { VorgaengeLadenRequest }  from '@tom/models';
import { VorgaengeLadenResponse } from '@tom/models';
import { firstValueFrom }         from 'rxjs';

@Injectable( {
    providedIn : 'root'
} )
export class ApiService {
    
    private baseUrl = 'http://localhost:4000';
    
    constructor( private http : HttpClient ) {}
    
    public async vorgaengeLaden() : Promise<VorgaengeLadenResponse> {
        const res = await firstValueFrom( this.http.get( this.baseUrl + '/vorgaenge' ) );
        console.log(res);
        return {
            vorgaenge : []
        };
    }
    
}
