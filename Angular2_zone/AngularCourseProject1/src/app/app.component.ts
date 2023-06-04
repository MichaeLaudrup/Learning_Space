import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RecipeService } from './recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent implements OnInit{
  title = 'AngularCourseProject1';
  constructor(private authService: AuthService) {}
  ngOnInit(){
    this.authService.autologin(); 
  }
}
