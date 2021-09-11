import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AvalaibleYearsService } from 'src/app/services/avalaibleYears.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public year: string;
  constructor(
    public router: Router,
    public avalaibleYearsService: AvalaibleYearsService
  ) {
    this.year = avalaibleYearsService.getAvalaibleYear();
    console.log('año  ', this.year);
  }
}