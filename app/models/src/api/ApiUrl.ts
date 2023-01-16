export class ApiUrl {
    static readonly VORGAENGE = '/vorgaenge';
    static readonly STANDARD_HARDWARE = '/standard-hardware-artikel';
    static readonly VORGANG   = '/vorgang';
    
    static vorgangIdParam = 'vorgangId';
    
    static vorgangUrl( vorgangId ? : string ) {
        return '/vorgang/' + ( vorgangId || ':' + ApiUrl.vorgangIdParam );
    }
    
}
