import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
export class ShoppingListService{
    listIngredientsChanged = new Subject<Ingredient[]>(); 
    private ingredients:Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Orange', 3)];
    startedEditing = new Subject<number>(); 
        
    addNewIngredient(newIngredient:Ingredient){
        this.ingredients.push(newIngredient); 
        this.listIngredientsChanged.next(this.ingredients.slice()); 
    }
    getIngredients(){
        return this.ingredients.slice(); 
    }

    addNewIngredients(newIngredients:Ingredient[]){
        this.ingredients = this.ingredients.concat(newIngredients); 
        this.listIngredientsChanged.next(this.ingredients.slice()); 
    }

    getIngredient( index:number){
        return this.ingredients[index]; 
    }

    updateIngredient( index:number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
        this.listIngredientsChanged.next(this.ingredients.slice());  
    }
    deleteIngredient(id:number){
        this.ingredients.splice(id,1); 
        this.listIngredientsChanged.next(this.ingredients.slice()); 

    }
}