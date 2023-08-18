import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  @ViewChild('form') formulario: NgForm; 
  ingredient: Ingredient; 
  subscription : Subscription; 
  editMode = false; 
  editingItemIndex: number; 
  editingItem: Ingredient; 

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe( (id:number) => {
      this.editingItemIndex = id; 
      this.editMode = true; 
      this.editingItem = this.shoppingService.getIngredient(id); 
      this.formulario.setValue({name:this.editingItem.name, amount:this.editingItem.amount})
    }); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
  insertarIngredient(form:NgForm){
    const nuevoIngrediente = new Ingredient(form.value['name'], form.value['amount'])
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editingItemIndex, new Ingredient(this.formulario.value['name'], this.formulario.value['amount'])); 
    }else{
      this.shoppingService.addNewIngredient(nuevoIngrediente)
    }
    this.resetForm(); 
  }

  resetForm() : void {
    this.editMode = false; 
    this.formulario.reset(); 
  }

  deleteItem(){
    if(this.editMode){
      this.shoppingService.deleteIngredient(this.editingItemIndex); 
      this.resetForm(); 
    }
  }
}
