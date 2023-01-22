import axios from 'axios';

import { MitarbeiterLadenResponse }      from '@tom/models';
import { StandardHardwareArtikel }       from '@tom/models';
import { StandardHardwareLadenResponse } from '@tom/models';
import { VorgangLadenResponse }          from '@tom/models';
import { VorgaengeLadenResponse }        from '@tom/models';
import { VorgangSpeichernRequest }       from '@tom/models';
import { Vorgang }                       from '@tom/models';
import { ApiUrl }                        from '@tom/models';

export class ApiService {
    
    private baseUrl = 'http://localhost:4000';
    
    public async vorgaengeLaden() : Promise<Vorgang[]> {
        const res = await this.get<VorgaengeLadenResponse>( ApiUrl.VORGAENGE );
        return res.vorgaenge;
    }
    
    public async vorgangLaden( vorgangId : string ) : Promise<Vorgang> {
        return await this.get<VorgangLadenResponse>( ApiUrl.vorgangUrl( vorgangId ) );
    }
    
    public async vorgangSpeichern( vorgang : Vorgang ) : Promise<void> {
        await this.post<{}, VorgangSpeichernRequest>( ApiUrl.vorgangUrl( vorgang.id ), vorgang );
    }
    
    public async standardHardwareLaden() : Promise<StandardHardwareArtikel[]> {
        const res = await this.get<StandardHardwareLadenResponse>( ApiUrl.STANDARD_HARDWARE );
        return res.artikel;
    }
    
    public async mitarbeiterLaden() : Promise<MitarbeiterLadenResponse> {
        return await this.get<MitarbeiterLadenResponse>( ApiUrl.MITARBEITER );
    }
    
    private async get<Response>( url : string ) : Promise<Response> {
        const response = await axios.get( this.baseUrl + url );
        return response.data as unknown as Response;
    }
    
    private async post<Response, Request>( url : string, body : Request ) : Promise<Response> {
        const response = await axios.post( this.baseUrl + url, body );
        return response.data as unknown as Response;
    }
    
}

export const apiService = new ApiService();
