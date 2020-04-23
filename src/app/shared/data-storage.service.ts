import { Injectable } from '@angular/core';

// http client for send and receive data form http server 
import { HttpClient } from '@angular/common/http'

// custom services for recipes
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

// import RXJS OPERATOR
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataStrorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-courset-tutorial.firebaseio.com/recipes.json', recipes)
        .subscribe(data => {
            console.log(data)
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-courset-tutorial.firebaseio.com/recipes.json')
        .pipe(map( recipes => {
            return recipes.map(recipe => {
                return {  ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []  }
            });
        }),
        tap(
            recipes => {
                this.recipeService.setRecipes(recipes);
            }
        ));
    }
}