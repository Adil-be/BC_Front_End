import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public constructor() {
  }
  public active: boolean = false;

  handleMenu(value: boolean) {
    this.active = value;
  }

}
