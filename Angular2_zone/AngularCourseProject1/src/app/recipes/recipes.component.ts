import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  actualRecipeSelected:Recipe =undefined;
  constructor(private recipeService:RecipeService ) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe:Recipe) => {
      this.actualRecipeSelected = recipe; 
    });
  }

  updateRecipeDetail(data:Recipe){
    this.actualRecipeSelected = data; 
  } 

}
