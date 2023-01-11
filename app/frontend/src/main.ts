import { platformBrowserDynamic }     from '@angular/platform-browser-dynamic';
import 'reflect-metadata';

import { AppModule } from './app/app.module';

import { helloFromModels } from '@tom/models';



helloFromModels();


platformBrowserDynamic().bootstrapModule( AppModule )
                        .catch( err => console.error( err ) );
