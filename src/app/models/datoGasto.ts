import { TipoClasificacionService } from '../services/tipoClasificacion.service';
import cap_cod_des_map from '../../assets/data/cap_cod_des_map.json';
import pro_cod_des_map from '../../assets/data/pro_cod_des_map.json';
import org_cod_des_map from '../../assets/data/org_cod_des_map.json';
import eco_cod_des_map from '../../assets/data/eco_cod_des_map.json';

export class DatoGasto {
    cod: string;
    des: string;
    obligaciones: string;
    opa: string;
    year: string;
    tipoClasificacion: string;

    constructor(cod: string, des: string, obligaciones: string, opa: string, year: string, tipoClasificacion: string) {
        this.cod = cod;
        this.des = des;
        this.obligaciones = obligaciones;
        this.opa = opa;
        this.year = year;
        this.tipoClasificacion = tipoClasificacion;
    }

    getCodigo(): string {
        return this.cod + ' - ' + this.des;
    }

    format() {
        const formatoTabla = {};
        switch (this.tipoClasificacion) {
            case "Cap":
                formatoTabla["CodCap"] = this.cod;
                formatoTabla["DesCapOld"] = this.des;
                formatoTabla["DesCap"] = cap_cod_des_map[this.cod] !== undefined ? cap_cod_des_map[this.cod].des : "Codigo no encontrado";
                break;

            case 'Org':
                formatoTabla["CodOrg"] = this.cod;
                formatoTabla["DesOrgOld"] = this.des;
                formatoTabla["DesOrg"] = org_cod_des_map[this.cod] !== undefined ? org_cod_des_map[this.cod].des : "Codigo no encontrado";
                break;

            case 'Pro':
                formatoTabla["CodPro"] = this.cod;
                formatoTabla["DesProOld"] = this.des;
                formatoTabla["DesPro"] = pro_cod_des_map[this.cod] !== undefined ? pro_cod_des_map[this.cod].des : "Codigo no encontrado";
                break;

            case 'Eco':
                formatoTabla["CodEco"] = this.cod;
                formatoTabla["DesEcoOld"] = this.des;
                formatoTabla["DesEco"] = eco_cod_des_map[this.cod] !== undefined ? eco_cod_des_map[this.cod].des : "Codigo no encontrado";
                break;

            default:
                break;
        }
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