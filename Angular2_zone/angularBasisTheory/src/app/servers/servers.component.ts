import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  //template: '' //Tambien se puede declarar directamente el template html aqui sin necesidad de buscar en otro archivo
  styleUrls: ['./servers.component.css']
  //styles: '' //Se pueden meter directamente estilos dentro de un array separado con los diferentes estilos 
})
export class ServersComponent implements OnInit {
  allowNewServer:boolean = false; 
  serverCreationStatus: string = 'No server was created'; 
  serverName: string = ''; 
  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true; 
    }, 2000); 
  }

  ngOnInit(): void {
  }

  onCreatedServer() {
    this.serverCreationStatus = 'Server was created!'; 
  }

  onUpdateServerName(event:Event) {
    console.log(event.target)
    this.serverName = (<HTMLInputElement>event.target).value; 

  }

}
