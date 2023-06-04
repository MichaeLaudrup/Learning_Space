import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output('mobileMenuConmuted') mobileMenuConmuted: EventEmitter<any> = new EventEmitter(); 
  menuOpen:boolean = false; 
  constructor() { }

  ngOnInit(): void {
  }

  conmuteClose(){
    this.menuOpen = !this.menuOpen; 
    this.mobileMenuConmuted.emit(); 
  }
}
