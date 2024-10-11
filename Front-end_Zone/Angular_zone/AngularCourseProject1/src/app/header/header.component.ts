import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>(); 
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private recipesService: RecipeService, private router: Router) { }
  private subscriptions: Subscription[] = [];
  isAuthenticated = false;  
  ngOnInit(): void {
    this.subscriptions.push(this.authService.user.subscribe( (userData) => {
      console.log(userData)
      this.isAuthenticated = !!userData; 
    })); 
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( suscription => {
      suscription.unsubscribe(); 
    })
  }

  onSelect(feature:string) :void {
    this.featureSelected.emit(feature); 
  }

  saveData() : void {
    this.dataStorageService.storeRecipes(); 
  }
  fetchRecipes(): void {
    this.dataStorageService.fetchRecipes().subscribe( recipes => {
      console.log(recipes); 
      this.recipesService.addRecipes(recipes); 
    }); 
  }

  logout(){
    this.authService.logout(); 

  }

}
