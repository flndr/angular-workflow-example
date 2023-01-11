import { OnInit }                              from '@angular/core';
import { Component }                           from '@angular/core';
import { FormGroup }                           from '@angular/forms';
import { FormControl }                         from '@angular/forms';
import { Router }                              from '@angular/router';
import { VorgangBearbeitenSchritt as Schritt } from '@tom/models';
import { ApiService }                          from '../../../../shared/services/api.service';
import { UrlService }                          from '../../../../shared/services/url.service';
import { FormService }                         from '../../../services/form.service';
import { NavigationService }                   from '../../../services/navigation.service';
import { connectForm }                         from '../../../util/connectForm';
import { mapSchrittAsForm }                    from '../../../util/mapSchrittAsForm';

@Component( {
    template : ''
} )
export class VorgangBearbeitenSeite<FormClass> implements OnInit {
    
    formular : new () => FormClass;
    dieserSchritt : Schritt;
    naechsterSchritt : Schritt | null;
    
    fields : Record<keyof FormClass, FormControl>;
    formGroup : FormGroup;
    
    constructor(
        public vorgangBearbeitenService : FormService,
        public urlService : UrlService,
        public navigationService : NavigationService,
        public apiService : ApiService,
        public router : Router,
    ) {}
    
    public async ngOnInit() {
        const { fields, formGroup } = mapSchrittAsForm<FormClass>( this.formular, this.dieserSchritt );
    
        this.fields    = fields;
        this.formGroup = new FormGroup( formGroup );
        
        await connectForm( this.vorgangBearbeitenService, this.formGroup, this.dieserSchritt );
    }
    
    public async senden( e : Event ) {
        e.preventDefault();
        await this.apiService.vorgangSpeichern(
            this.navigationService.getVorgangId(),
            this.vorgangBearbeitenService.schritte,
            this.dieserSchritt
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
