import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() showMenuButton: any;
  @Output() menuStatusChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  openOrCloseMenu(){
    this.menuStatusChange.emit();
  }

}
