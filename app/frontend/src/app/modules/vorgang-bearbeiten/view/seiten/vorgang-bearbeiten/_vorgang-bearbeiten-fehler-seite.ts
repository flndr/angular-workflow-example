import { Component } from '@angular/core';

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

            <h1>VorgangBearbeitenFehlerSeite</h1>

        </div>`,
} )
export class VorgangBearbeitenFehlerSeite {
    
    constructor(
        //public dynamicForm : ComplexFormControllerService
    ) { }
    
    //
    //debugValidation() : string {
    //    return JSON.stringify( this.dynamicForm.validation, null, 2 );
    //}
    //
    //debugValues() : string {
    //    return JSON.stringify( this.dynamicForm.formData, null, 2 );
    //}
    
}
