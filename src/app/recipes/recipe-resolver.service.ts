import  { Injectable } from '@angular/core';
import  { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router'
import  { Recipe } from './recipe.model';
import  { DataStrorageService } from '../shared/data-storage.service';
 
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private datastrorageservice: DataStrorageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.datastrorageservice.fetchRecipes();
    }
}
