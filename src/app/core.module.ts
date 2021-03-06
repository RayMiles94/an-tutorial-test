// create module 
// for handler services
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// services
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';

// service interceptor
import { AuthInterceptorService } from './auth/auth-intercepot.service';
import { LoggingService } from './logging.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule { }