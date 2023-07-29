import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const text = this.elementRef.nativeElement.innerText;
    if(text){
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', text.split('T')[0])
    }
  }

}
