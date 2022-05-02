export interface IDataTable {
    dataPropertyTable: IDataProperty;
    clasificationType: string;
    rowData: any[]
}

export interface IDataProperty {
    sufijo: string;
    headerName: string;
    subHeaderName: string;
    codField: string;
    desField: string;
    width: number;
    graphTitle: string;
}

export interface IDataGraph extends IDataTable {
    selectedCodeRow?: string;
    graphTitle?: string;
    graphSubTitle?: string;
}