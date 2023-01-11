import { Input }         from '@angular/core';
import { Component }     from '@angular/core';
import { VorgangStatus } from '@tom/models';

@Component( {
    selector : 'app-status-badge',
    template : `<span [ngClass]="class">{{text}}</span>`,
} )
export class StatusBadgeComponent {
    
    @Input()
    status : VorgangStatus;
    
    textByStatus : Record<VorgangStatus, string> = {
        [ VorgangStatus.EINGEREICHT ]         : 'EINGEREICHT',
        [ VorgangStatus.ABGELEHNT ]           : 'ABGELEHNT',
        [ VorgangStatus.ABGESCHLOSSEN ]       : 'ABGESCHLOSSEN',
        [ VorgangStatus.GENEHMIGT ]           : 'GENEHMIGT',
        [ VorgangStatus.ZWISCHENGESPEICHERT ] : 'ZWISCHENGESPEICHERT',
    };
    
    classByStatus : Record<VorgangStatus, string> = {
        [ VorgangStatus.EINGEREICHT ]         : 'bg-warning',
        [ VorgangStatus.ABGELEHNT ]           : 'bg-danger',
        [ VorgangStatus.ABGESCHLOSSEN ]       : 'bg-success',
        [ VorgangStatus.GENEHMIGT ]           : 'bg-success',
        [ VorgangStatus.ZWISCHENGESPEICHERT ] : 'bg-secondary',
    };
    
    get text() : string {
        return this.textByStatus[ this.status ] || 'INVALID';
    }
    
    get class() : string[] {
        return [
            'badge',
            this.classByStatus[ this.status ] || 'bg-dark'
        ];
    }
    
}
