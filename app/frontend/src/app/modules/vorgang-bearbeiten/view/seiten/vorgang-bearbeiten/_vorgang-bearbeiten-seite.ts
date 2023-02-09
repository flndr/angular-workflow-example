import { OnInit }      from '@angular/core';
import { Component }   from '@angular/core';
import { FormGroup }   from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router }      from '@angular/router';

import { VorgangBearbeitenSchritt } from '../../../../shared/model/VorgangBearbeitenSchritt';
import { ApiService }               from '../../../../shared/services/api.service';
import { UrlService }               from '../../../../shared/services/url.service';

import { FormService }       from '../../../services/form.service';
import { NavigationService } from '../../../services/navigation.service';
import { connectForm }       from '../../../util/connectForm';

@Component( {
    template : ''
} )
export abstract class VorgangBearbeitenSeite implements OnInit {
    
    abstract readonly dieserSchritt : VorgangBearbeitenSchritt;
    abstract readonly naechsterSchritt : VorgangBearbeitenSchritt | null;
    
    abstract readonly fields : Record<string, FormControl>;
    abstract readonly formGroup : FormGroup;
    
    constructor(
        public formService : FormService,
        public urlService : UrlService,
        public navigationService : NavigationService,
        public apiService : ApiService,
        public router : Router,
    ) {}
    
    async ngOnInit() {
        await connectForm( this.formService, this.formGroup, this.fields );
    }
    
    async senden( e : Event ) {
        e.preventDefault();
        await this.apiService.vorgangSpeichern(
            this.formService.vorgang,
        );
        if ( this.naechsterSchritt ) {
            await this.router.navigateByUrl(
                this.urlService.routeToVorgangBearbeiten(
                    this.navigationService.getVorgangId(),
                    this.naechsterSchritt
                )
            );
        }
    }
    
}
