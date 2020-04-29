import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// import HTTP CLIENT 
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// header component
import { HeaderComponent } from './header/header.component';

// Shopping Components
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

// custom directive
// import { DropDownDirective } from './shared/dropdown.directive';
// import { PlacerHolderDirective } from './shared/placerholder/placeholder.directive';

// custom service for shopping list
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipeService } from './recipes/recipe.service';
// import { AuthComponent } from './auth/auth.component';

// load spinner componet 
// import  { LoadingSpinngComponet } from './shared/loading-spinner/loading-spining.component';
// import { AuthInterceptorService } from './auth/auth-intercepot.service';
// import { AlertComponent } from './shared/alert/alert.component';

// custom modules for recipes
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

// custom recipes module
// import { RecipesModule  } from './recipes/recipes.module';

// custom servies module
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

// import coremodule for services
import { CoreModule } from './core.module';

// import Auth Module
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
