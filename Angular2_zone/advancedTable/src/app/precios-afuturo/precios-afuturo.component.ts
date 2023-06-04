import { Component, OnInit } from '@angular/core';
import { preciosService } from './precios.service';

@Component({
  selector: 'app-precios-afuturo',
  templateUrl: './precios-afuturo.component.html',
  styleUrls: ['./precios-afuturo.component.css'],
  providers: [preciosService]
})
export class PreciosAFuturoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
