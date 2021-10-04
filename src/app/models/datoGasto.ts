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
        const formatoTabla = {
            CodOrg: this.cod,
            DesOrg: this.des,
        };
        switch (this.year) {
            case "2017":
                return {
                    ...formatoTabla,
                    ObligacionesReconocidasNetas2017: this.obligaciones,
                    OPA2017: this.opa
                };
            case "2018":
                return {
                    ...formatoTabla,
                    ObligacionesReconocidasNetas2018: this.obligaciones,
                    OPA2018: this.opa
                };
            case "2019":
                return {
                    ...formatoTabla,
                    ObligacionesReconocidasNetas2019: this.obligaciones,
                    OPA2019: this.opa
                };
            case "2020":
                return {
                    ...formatoTabla,
                    ObligacionesReconocidasNetas2020: this.obligaciones,
                    OPA2020: this.opa
                };
            default:
                return {};
        }
    }
}