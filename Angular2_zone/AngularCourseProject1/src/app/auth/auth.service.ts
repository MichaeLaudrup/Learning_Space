import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError} from "rxjs"; 
import { User } from "./user.model";
import { Router } from "@angular/router";
import { TimeInterval } from "rxjs-compat";

export interface AuthResponseData {
    kind:string,
    idToken:string,
    email:string,
    refreshToken: string,
    expiresIn:string,
    localId:string,
    registered?: boolean
}

@Injectable( {providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null); 
    token: string= null; 
    private autologoutTimer: any; 
    constructor( private http: HttpClient, private router:Router){}


    singup(email:string , password: string){
        let data = {
            email,
            password,
            returnSecureToken: true
        }
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARGpIsZePlPUS_6rkdoRt4J78sOZTNyes', data)
            .pipe( catchError( this.handleError), tap(
                resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn)
                }
            )); 
    }

    login( email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARGpIsZePlPUS_6rkdoRt4J78sOZTNyes', {
            email, password, returnSecureToken: true
        }).pipe( catchError(this.handleError ), tap(
            resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken,+(resData.expiresIn))
            }
        ))
    }

    autologin(){
        const userData: {
            email:string,
            id:string,
            _token: string,
            _tokenExpirationDate:string, 
        } = JSON.parse(localStorage.getItem('userData')); 
        if(!userData)  return; 
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        console.log(loadedUser); 
        if(loadedUser.token){
            this.user.next(loadedUser);  
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
            this.autoLogout(expirationDuration); 
        }
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknow error occurred!';
        if(!errorRes.error || !errorRes.error.error) return throwError(errorMessage)
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS': 
                errorMessage = 'This email exists already'
            break; 
            case 'ADMIN_ONLY_OPERATION': 
                errorMessage = 'You\'re trying to create an anonymous user, this API dont allow this behavior'
            break; 
            case 'EMAIL_NOT_FOUND': 
                errorMessage = 'This email does not exist.'
            break; 
            case 'INVALID_PASSWORD': 
                errorMessage = 'Incorrect Password! Try again! '
            break; 
        }
        return throwError(errorMessage)
    }


    logout() {
        this.user.next(null); 
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');  
        if(this.autologoutTimer){
            clearTimeout(this.autologoutTimer)
        }
    }

    autoLogout( expirationDuration: number){
        this.autologoutTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration); 

    }

    private handleAuthentication(email:string, id:string, token:string, expiresIn:number){
        const expirationDate = new Date((new Date().getTime()) + expiresIn); 
        const user = new User(email, id, token, expirationDate);
        this.user.next(user); 
        this.autoLogout(expiresIn * 1000); 
        localStorage.setItem('userData', JSON.stringify(user))
    }

}