export class DatoGasto {
    cod: string;
    des: string;
    obligaciones: string;
    opa: string;
    year: string;

    constructor(cod: string, des: string, obligaciones: string, opa: string, year: string) {
        this.cod = cod;
        this.des = des;
        this.obligaciones = obligaciones;
        this.opa = opa;
        this.year = year;
    }

    getCodigo(): string {
        return this.cod + ' - ' + this.des;
    }
}