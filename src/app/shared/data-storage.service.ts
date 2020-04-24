import { Injectable } from '@angular/core';

// http client for send and receive data form http server 
import { HttpClient, HttpParams } from '@angular/common/http'

// custom services for recipes
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

// recipe model
import { Recipe } from '../recipes/recipe.model';

// import RXJS OPERATOR
import { map, tap, take, exhaustMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DataStrorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-courset-tutorial.firebaseio.com/recipes.json', recipes)
            .subscribe(data => {
                console.log(data)
            });
    }

    fetchRecipes() {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<Recipe[]>('https://ng-courset-tutorial.firebaseio.com/recipes.json',
                 {
                    params: new HttpParams().set('auth', user.Token)
                 }
                );
            }), 
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }),
            tap(
                recipes => {
                    this.recipeService.setRecipes(recipes);
                }
            ));
    }
}
