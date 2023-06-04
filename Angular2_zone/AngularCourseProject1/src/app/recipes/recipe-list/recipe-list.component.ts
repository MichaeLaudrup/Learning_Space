import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]; 
  subscription: Subscription; 
  constructor(private recipeService:RecipeService, private dataStorage: DataStorageService) { }

  ngOnInit(): void {
    //this.dataStorage.fetchRecipes(); 
    this.subscription = this.recipeService.updateRecipeListView.subscribe( (recipeList: Recipe[]) => {
      this.recipes = recipeList; 

    }); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
}
