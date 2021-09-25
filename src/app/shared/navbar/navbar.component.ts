import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AvalaibleYearsService } from 'src/app/services/avalaibleYears.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public year: Observable<string>;
  constructor(
    public router: Router,
    public avalaibleYearsService: AvalaibleYearsService
  ) {

    this.year = avalaibleYearsService.getAvalaibleYear();
  }
}