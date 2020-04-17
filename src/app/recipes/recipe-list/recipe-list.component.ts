import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';

// Recipe model
import { Recipe } from '../recipe.model';
// RecipeService
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] ;
  RecipeListComponentSubcrption: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.RecipeListComponentSubcrption = this.recipeService.recipeChange.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route  });
  }

  ngOnDestroy(): void {
    this.RecipeListComponentSubcrption.unsubscribe();
  }

}
