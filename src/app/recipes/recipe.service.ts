import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
// model
import { Ingredients } from '../shared/ingredients.model';
// service
import { ShoppingListService } from '../shopping-list/shopping-list.service';

// javascript Observables
import { Subject } from 'rxjs';


// inject services inside services
@Injectable()
export class RecipeService {
    recipeChange = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A test Recipe',
        'this is simply a test',
        'https://images-gmi-pmc.edge-generalmills.com/7eb09e32-fb06-4a34-97e6-def91b62164f.jpg',
        [
          new Ingredients('Meat', 1),
          new Ingredients('French Fries', 20)
        ]
      ),
        new Recipe('A test Recipe 1',
        'this is simply a test 1',
        'https://images-gmi-pmc.edge-generalmills.com/c5dc7b6e-0d5a-4481-a97f-410c3c2e384f.jpg',
        [
          new Ingredients('Buns', 2),
          new Ingredients('Meat', 1)
        ]
      ),
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredients[]) {
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipeChange.next(this.recipes.slice());
    }

    updateRecipe(id: number, newRecipe: Recipe) {
      this.recipes[id] = newRecipe;
      this.recipeChange.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
      this.recipes.splice(id, 1);
      this.recipeChange.next(this.recipes.slice());
    }
}
