import { IDataPropertyTable } from "../commons/interfaces/dataGraph.interface";


const CLASIFICATION = {

    ingresosEconomicaCapitulos: {
        sufijo: 'Cap',
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        codField: 'CodCap',
        desField: 'DesCap',
        width: 250,
    },
    ingresosEconomicaArticulos: {
        sufijo: 'Eco',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 250,
    },
    ingresosEconomicaConceptos: {
        sufijo: 'Eco',
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 250,
    },
    ingresosEconomicaEconomicos: {
        sufijo: 'Eco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 400,
    },
    gastosOrganicaOrganicos: {
        sufijo: 'Org',
        headerName: 'Clasificado por orgánico',
        subHeaderName: 'Orgánico',
        codField: 'CodOrg',
        desField: 'DesOrg',
        width: 250,
    },
    gastosProgramaAreas: {
        sufijo: 'Pro',
        headerName: 'Clasificado por areas de programas de gasto',
        subHeaderName: 'Area de gasto',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
    },
    gastosProgramaPoliticas: {
        sufijo: 'Pro',
        headerName: 'Clasificado por políticas de gasto',
        subHeaderName: 'Política de gasto',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
    },
    gastosProgramaGrupos: {
        sufijo: 'Pro',
        headerName: 'Clasificado por grupos programas de gasto',
        subHeaderName: 'Grupo programas de gasto',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
    },
    gastosProgramaProgramas: {
        sufijo: 'Pro',
        headerName: 'Clasificado por programa',
        subHeaderName: 'Programa',
        codField: 'CodPro',
        desField: 'DesPro',
        width: 550,
    },
    gastosEconomicaCapitulos: {
        sufijo: 'Cap',
        headerName: 'Clasificado por capítulo',
        subHeaderName: 'Capítulo',
        codField: 'CodCap',
        desField: 'DesCap',
        width: 250,
    },
    gastosEconomicaArticulos: {
        sufijo: 'Eco',
        headerName: 'Clasificado por articulo',
        subHeaderName: 'Articulo',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 250,
    },
    gastosEconomicaConceptos: {
        sufijo: 'Eco',
        headerName: 'Clasificado por concepto',
        subHeaderName: 'Concepto',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 250,
    },
    gastosEconomicaEconomicos: {
        sufijo: 'Eco',
        headerName: 'Clasificado por económico',
        subHeaderName: 'Económico',
        codField: 'CodEco',
        desField: 'DesEco',
        width: 400,
    }
}

export const getClasificacion = (tipo: string): IDataPropertyTable => {
    return CLASIFICATION[tipo];
}