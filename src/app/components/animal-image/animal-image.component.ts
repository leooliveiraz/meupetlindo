import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-image',
  templateUrl: './animal-image.component.html',
  styleUrls: ['./animal-image.component.css']
})
export class AnimalImageComponent implements OnInit {

  @Input() src: any;
  @Input() width: any;
  @Input() height: any;

  constructor() {
    if (!this.width)
      this.width = 256;
    if (!this.height)
      this.height = 256;
  }

  ngOnInit(): void {
  }

}
