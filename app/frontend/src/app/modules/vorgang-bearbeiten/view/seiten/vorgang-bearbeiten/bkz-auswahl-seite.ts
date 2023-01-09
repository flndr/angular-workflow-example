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
        <app-highlight-layout label="BkzAuswahlSeite" color="red">

            <h1>BkzAuswahlSeite</h1>

        </app-highlight-layout>`,
} )
export class BkzAuswahlSeite {
    
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
