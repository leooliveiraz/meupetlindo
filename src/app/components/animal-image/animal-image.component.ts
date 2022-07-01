import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-image',
  templateUrl: './animal-image.component.html',
  styleUrls: ['./animal-image.component.css']
})
export class AnimalImageComponent implements OnInit {

  @Input() src :any;
  constructor() { }

  ngOnInit(): void {
  }

}
