import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';
import { CanActivate }            from '@angular/router';
import { UrlTree }                from '@angular/router';
import { Router }                 from '@angular/router';
import { Injectable }             from '@angular/core';
import { Vorgang }                from '@tom/models';
import { ApiService }             from '../../shared/services/api.service';

import { FormService }       from '../services/form.service';
import { NavigationService } from '../services/navigation.service';

@Injectable( {
    providedIn : 'root'
} )
export class VorgangLadenGuard implements CanActivate {
    
    constructor(
        private router : Router,
        private navigationService : NavigationService,
        private apiService : ApiService,
        private formService : FormService,
    ) {}
    
    async canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) : Promise<boolean | UrlTree> {
        try {
            const vorgangId         = route.url[ 0 ].path;
            const vorgang : Vorgang = await this.apiService.vorgangLaden( vorgangId );
            this.navigationService.setVorgangId( vorgang.id );
            await this.formService.setVorgang( vorgang );
            return true;
        } catch ( e ) {
            console.error( e );
            return false;
        }
        
    }
}
