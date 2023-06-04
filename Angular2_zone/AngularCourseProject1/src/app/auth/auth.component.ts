import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { enableDebugTools } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent {
 isLoginMode: boolean = true; 
 isLoading: boolean = false; 
 error:string = null; 

 constructor( private authService:AuthService, private router:Router){

 }
 onSwitchMode(){
     this.isLoginMode = !this.isLoginMode; 
 }

 onSubmit(form: NgForm){
     if(!form.valid) return; 
     let email = form.value.email; 
     let password = form.value.password; 
     this.isLoading = true; 
     let authObservable : Observable<AuthResponseData>; 


     if(this.isLoginMode){
        authObservable = this.authService.login(email,password)
    }else{ //Se crea cuenta nueva
        authObservable = this.authService.singup(email, password)
    }
    authObservable.subscribe( (resData)=> {
        this.isLoading = false; 
        this.router.navigate(['/recipes'])
    }, errorMessage => {
        this.error = errorMessage; 
        this.isLoading = false; 
    }); 
     
     form.reset(); 
 }




}