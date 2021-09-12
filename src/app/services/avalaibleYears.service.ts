import { Injectable } from '@angular/core';
// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AvalaibleYearsService {
  public year$ = new BehaviorSubject<string>("2020");

  public setAvalaibleYear(yearSelected: string): void {
    this.year$.next(yearSelected);
    console.log(this.year$);
  }

  public getAvalaibleYear() {
    console.log(this.year$);
    return this.year$.asObservable();
  }
}
