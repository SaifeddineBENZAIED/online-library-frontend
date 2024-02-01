import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bouton-action',
  templateUrl: './bouton-action.component.html',
  styleUrls: ['./bouton-action.component.scss']
})
export class BoutonActionComponent implements OnInit {

  origin = '';

  @Output()
  clickEvent = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
  }

  boutonAjouterClick(): void {
    this.clickEvent.emit();
  }
}
