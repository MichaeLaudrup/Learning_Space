import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL_BASE = 'https://reqres.in/api'
  constructor( private http: HttpClient) {}

  getUsers(){
    return this.http.get(`${this.URL_BASE}/users?per_page=6`); 
  }

}
