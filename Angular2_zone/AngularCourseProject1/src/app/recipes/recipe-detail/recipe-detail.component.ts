import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input('recipeData') actualRecipe: Recipe;
  actualID:number = 0; 
  constructor(private shoppingService: ShoppingListService, private rutaActual:ActivatedRoute, private servicioRecetas: RecipeService, private enrutador:Router) { }

  ngOnInit(): void {
    this.rutaActual.params.subscribe( (params: Params)=> {
      this.actualID = +params['id']; 
      this.actualRecipe = this.servicioRecetas.getRecipeByID(+params['id']); 
    }); 
  }
  sendIngredientsToShoppingList(){
      this.shoppingService.addNewIngredients(this.actualRecipe.ingredients)
  }

  editThisRecipe(){
    this.enrutador.navigate(['edit'], {relativeTo: this.rutaActual}); 
  }

  deleteRecipe(){
    this.servicioRecetas.deleteRecipe(this.actualID); 
    this.enrutador.navigate(['..'])
  }


}
