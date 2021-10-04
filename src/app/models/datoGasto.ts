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

    format() {
        return {
            ObligacionesReconocidasNetas2017: this.year === "2017" ? this.obligaciones : undefined,
            OPA2017: this.year === "2017" ? this.opa : undefined,
            ObligacionesReconocidasNetas2018: this.year === "2018" ? this.obligaciones : undefined,
            OPA2018: this.year === "2018" ? this.opa : undefined,
            ObligacionesReconocidasNetas2019: this.year === "2019" ? this.obligaciones : undefined,
            OPA2019: this.year === "2019" ? this.opa : undefined,
            ObligacionesReconocidasNetas2020: this.year === "2020" ? this.obligaciones : undefined,
            OPA2020: this.year === "2020" ? this.opa : undefined,
        };

    }
}