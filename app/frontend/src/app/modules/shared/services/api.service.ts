import { HttpClient }               from '@angular/common/http';
import { Injectable }               from '@angular/core';
import { VorgangLadenResponse }     from '@tom/models';
import { VorgangBearbeitenSchritt } from '@tom/models';
import { firstValueFrom }           from 'rxjs';

import { VorgangSchritte }         from '@tom/models';
import { VorgaengeLadenResponse }  from '@tom/models';
import { VorgangSpeichernRequest } from '@tom/models';
import { Vorgang }                 from '@tom/models';
import { ApiUrl }                  from '@tom/models';

@Injectable( {
    providedIn : 'root'
} )
export class ApiService {
    
    private baseUrl = 'http://localhost:4000';
    
    constructor( private http : HttpClient ) {}
    
    public async vorgaengeLaden() : Promise<Vorgang[]> {
        const res = await this.get<VorgaengeLadenResponse>( ApiUrl.VORGAENGE );
        return res.vorgaenge;
    }
    
    public async vorgangLaden( vorgangId : string ) : Promise<Vorgang> {
        return await this.get<VorgangLadenResponse>( ApiUrl.vorgangUrl( vorgangId ) );
    }
    
    public async vorgangSpeichern(
        vorgangId : string,
        schritte : VorgangSchritte,
        aktiverSchritt : VorgangBearbeitenSchritt
    ) : Promise<void> {
        await this.post<{}, VorgangSpeichernRequest>(
            ApiUrl.vorgangUrl( vorgangId ),
            {
                schritte,
                aktiverSchritt
            }
        );
    }
    
    private async get<Response>( url : string ) : Promise<Response> {
        const response = await firstValueFrom( this.http.get( this.baseUrl + url ) );
        return response as unknown as Response;
    }
    
    private async post<Response, Request>( url : string, body : Request ) : Promise<Response> {
        const response = await firstValueFrom( this.http.post( this.baseUrl + url, body ) );
        return response as unknown as Response;
    }
    
}
