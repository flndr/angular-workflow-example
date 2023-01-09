import { OnInit }     from '@angular/core';
import { Component }  from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Component( {
    styles   : [
        `
            .container {
                height : 100%;
            }
        
        
        `
    ],
    template : `
        <div class="container">

            <h1>Übersicht aller Vorgänge</h1>

        </div>`,
} )
export class VorgangUebersichtSeite implements OnInit {
    
    constructor(
        public apiService : ApiService
    ) { }
    
    public async ngOnInit() {
        await this.apiService.vorgaengeLaden();
    }
    
    //
    //debugValidation() : string {
    //    return JSON.stringify( this.dynamicForm.validation, null, 2 );
    //}
    //
    //debugValues() : string {
    //    return JSON.stringify( this.dynamicForm.formData, null, 2 );
    //}
    
}
