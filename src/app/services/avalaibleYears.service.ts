import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable()
export class AvalaibleYearsService {
  year = '2020';

  public setAvalaibleYear(yearSelected): void {
    this.year = yearSelected;
    console.log(this.year);
  }

  public getAvalaibleYear(): string {
    console.log(this.year);
    return this.year;
  }
}
