import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:boolean = false;
  editRecipeForm: FormGroup;   

  constructor(private rutaActual:ActivatedRoute, private recipeService: RecipeService, private enrutador:Router) { }

  ngOnInit(): void {
    this.rutaActual.params.subscribe( (params:Params) => {
      if(params['id']){
        this.id = +params['id']; 
        this.editMode = true; 
      }else{
        this.editMode = false; 
      }
      this.initForm(); 
    })

    
  }


  initForm(){
    const recipe=  this.recipeService.getRecipeByID(this.id); 
    let recipeName :string, recipeImgPath:string, recipeDescription:string; 
    let recipeIngredients = new FormArray([]); 
    if(this.editMode){
      recipeName = recipe.name; 
      recipeImgPath = recipe.imagePath; 
      recipeDescription = recipe.description; 
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
           'amount': new FormControl(ingredient.amount , [Validators.required, Validators.pattern(/[1-9][1-9]*$/)])
          })); 
        }
      }
    }

    this.editRecipeForm = new FormGroup({
      'name':  new FormControl(recipeName, Validators.required),
      'imagepath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  submit(){
    const newRecipe = new Recipe(
      this.editRecipeForm.value['name'],
      this.editRecipeForm.value['description'],
      this.editRecipeForm.value['imagepath'],
      this.editRecipeForm.value['ingredients']
    ); 
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe); 
    }else{
      this.recipeService.addRecipe(newRecipe); 
    }
    this.goBack(); 
  }

  get controls(){
    return (<FormArray>this.editRecipeForm.get('ingredients')).controls; 
  }

  addIngredient(){
    (<FormArray>this.editRecipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null , [Validators.required, Validators.pattern(/[1-9][1-9]*$/)])}))
  }

  goBack(){
    this.enrutador.navigate(['../'], {relativeTo: this.rutaActual}); 
  }

  deleteIngredient(index:number){
    (<FormArray>this.editRecipeForm.get('ingredients')).removeAt(index); 
  }
}
