import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// import HTTP CLIENT 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// header component
import { HeaderComponent } from './header/header.component';

// Recipes Components
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent  } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

// Shopping Components
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

// custom directive
import { DropDownDirective } from './shared/dropdown.directive';

// custom service for shopping list
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeItemComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
