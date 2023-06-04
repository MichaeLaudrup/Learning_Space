import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {tap, take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router){
  }
  canLoad(route: Route): Observable<boolean >  {
    return this.authService.isAuth().pipe(
      tap( (estado) => {
        if(!estado){
          this.router.navigate(['/login'])
        }
      }),
      take(1)
    );
  }
  canActivate():Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( (estado) => {
        if(!estado){
          this.router.navigate(['/login'])
        }
      })
    );
  }
  
}
