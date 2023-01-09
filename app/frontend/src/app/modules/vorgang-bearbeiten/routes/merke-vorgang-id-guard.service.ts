import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot }    from '@angular/router';
import { CanActivate }            from '@angular/router';
import { UrlTree }                from '@angular/router';
import { Router }                 from '@angular/router';
import { Injectable }             from '@angular/core';

import { UrlService } from '../../shared/services/url.service';

@Injectable( {
    providedIn : 'root'
} )
export class VorgangIdSpeichernGuard implements CanActivate {
    
    constructor(
        private router : Router,
        private routingService : UrlService
    ) {}
    
    async canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) : Promise<boolean | UrlTree> {
        console.log('vorgangId', route.url[ 0 ].path);
        this.routingService.setVorgangId( route.url[ 0 ].path );
        return true;
    }
}
