import { Component, OnInit } from '@angular/core';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private _quantity: number = 0;
  message = '';
  showAlert = false;

  constructor(private _alertService: AlertService) {
  }

  ngOnInit(): void {
    this._alertService.alert$.subscribe((res) => {
      this.message = res.message;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, res.time);

    })
  }

}
