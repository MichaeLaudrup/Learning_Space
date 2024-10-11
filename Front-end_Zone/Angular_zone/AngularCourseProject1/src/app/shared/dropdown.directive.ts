import { Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  
  constructor(private elRef: ElementRef,private renderer: Renderer2) { 
  }

  ngOnInit(): void {
  }

  @HostListener('mouseenter') mousenter( ){
    this.renderer.addClass(this.elRef.nativeElement, 'open'); 
  }

  @HostListener('mouseleave') mouseover( ){
    this.renderer.removeClass(this.elRef.nativeElement, 'open'); 
  }

}
