import { Injectable } from '@angular/core';

// https://stackoverflow.com/questions/54476526/how-to-reload-the-header-component-when-the-variable-value-changes-via-service/54476754
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AvalaibleYearsService {
  public subject$ = new BehaviorSubject<string>('2020');
  private year = '2020'
  public setAvalaibleYear(yearSelected: string): void {
    this.year = yearSelected;
    this.subject$.next(yearSelected);
  }

  public getAvalaibleYear() {
    return this.subject$.asObservable();
  }

  async getDataJson(isExpense: boolean) {
    const data = await import(`../../assets/data/${this.year}Liq${isExpense ? 'Gas' : 'Ing'}.json`);
    const result: any = (data as any).default;
    return result;
  }

  getCurrentYear(): string {
    return this.year
  }
}
