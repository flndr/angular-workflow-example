import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';
import { CanActivate }            from '@angular/router';
import { UrlTree }                from '@angular/router';
import { Router }                 from '@angular/router';
import { Injectable }             from '@angular/core';

import { Vorgang }                  from '@tom/models';
import { VorgangBearbeitenSchritt } from '../../shared/model/VorgangBearbeitenSchritt';

import { ApiService }        from '../../shared/services/api.service';
import { FormService }       from '../services/form.service';
import { NavigationService } from '../services/navigation.service';
import { RouteData }         from './models/RouteData';

@Injectable( {
    providedIn : 'root'
} )
export class MerkeSchrittGuard implements CanActivate {
    
    constructor(
        private router : Router,
        private navigationService : NavigationService,
        private apiService : ApiService,
        private formService : FormService,
    ) {}
    
    async canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) : Promise<boolean | UrlTree> {
        
        const routeData                = route.data as unknown as RouteData;
        const isValidBearbeitenSchritt = Object.values( VorgangBearbeitenSchritt ).includes( routeData.schritt );
        
        if ( isValidBearbeitenSchritt ) {
            this.formService.setSchritt( routeData.schritt );
            return true;
        }
        return false;
    }
}
