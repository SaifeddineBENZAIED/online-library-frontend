import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective implements OnInit{

  private colors: string[] = ['#000000', '#455761', '#00A2FF', '#0000FF', '#6495ED', '#ADD8E6' ,'#1A4E9C'];

  @HostBinding('style.color') color: string = '';
  @HostBinding('style.border-color') borderColor: string = '';

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      const randomColorIndex = Math.floor(Math.random() * this.colors.length);
      this.color = this.colors[randomColorIndex];
      this.borderColor = this.colors[randomColorIndex];
    }, 100);
  }

}
