import { EventEmitter, Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>(); 
    updateRecipeListView = new Subject<Recipe[]>(); 
    recipes: Recipe[] /* = [
        new Recipe(
            "Pecado Carnal Mediterraneo",
             "Probar un vocado de este alimento puede ser un pecado, su salsa de champiñones, verduras sofreidas a fuego lento hacen que sea una tentación", 
             "https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg",
             [ new Ingredient('tomato', 4),new Ingredient('carne', 2), new Ingredient('lechuga', 2)] ),
        new Recipe("Pizza de los 4 vientos", 
            "Esta pizza tiene una mezcla de sabores de los vientos procedentes de Asia, Europa, Africa y Rusia."
            , "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
            [ new Ingredient('masa de pizza', 1),new Ingredient('salsa de tomate', 2), new Ingredient('Queso', 2)]  ),
            new Recipe("Pasta de Tempura", 
            "Pasta recien horneada."
            , "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Recetas-faciles-de-cocinar-y-sobrevivir-en-casa-al-coronavirus_2.jpg",
            [ new Ingredient('masa de pizza', 1),new Ingredient('salsa de tomate', 2), new Ingredient('Queso', 2)]  )
      ]; */
    
    getRecipes(){
        return this.recipes.slice(); //Devuelve array por copia y no por referencia de objeto
    }

    getRecipeByID(id:number){
        return this.recipes[id]; 
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe); 
        console.log(this.recipes);
        this.updateView(); 
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;  
        this.updateView(); 
    }

    updateView(){
        this.updateRecipeListView.next(this.recipes.slice()); 
    }
    deleteRecipe(index:number){
        this.recipes.splice(index, 1); 
        this.updateRecipeListView.next(this.recipes.slice()); 
    }
    addRecipes( recipes: Recipe[]){
        this.recipes = recipes; 
        this.updateRecipeListView.next(this.recipes.slice());
    }

}