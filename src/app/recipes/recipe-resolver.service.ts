import  { Injectable } from '@angular/core';
import  { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router'
import  { Recipe } from './recipe.model';
import  { DataStrorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
 
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private datastrorageservice: DataStrorageService,
                private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length == 0) {
            return this.datastrorageservice.fetchRecipes();
        } else {
            return recipes;
        }
       
    }
}
