import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// auth guard
import { AuthGuard } from '../auth/auth.guard';

// components
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

// services
import { RecipeResolverService } from './recipe-resolver.service';

const routes: Routes = [
    { 
        path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard]
          ,children: [
            {  path: '', component: RecipeStartComponent  },
            {  path: 'new', component: RecipeEditComponent   },
            {  path: ':id' , component: RecipeDetailComponent , resolve: [RecipeResolverService] },
            {  path: ':id/edit', component: RecipeEditComponent , resolve: [RecipeResolverService]  },
        ] 
      },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule  {}