import { Injectable } from '@angular/core';
// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AvalaibleYearsService {
  public subject$ = new BehaviorSubject<string>('2021');
  public yearsSelected: number[] = [];
  public setAvalaibleYear(yearSelected: number[]): void {
    this.yearsSelected = yearSelected;
    // const minor = Math.min(...yearSelected);
    // const max = Math.max(...yearSelected);
    // const message = minor === max ? `${minor}` : `${minor} A ${max} `
    // this.year = yearSelected;
    // const message = new Intl.ListFormat('es', { type: 'conjunction' }).format(yearSelected)
    const message = yearSelected.join(',');
    this.subject$.next(message);
  }

  public getAvalaibleYear() {
    return this.subject$.asObservable();
  }

  // Devuelve el array con los años seleccionados
  getYearsSelected(): number[] {
    return this.yearsSelected;
  }

}