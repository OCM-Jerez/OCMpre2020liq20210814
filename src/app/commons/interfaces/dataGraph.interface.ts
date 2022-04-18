export interface IDataTableGraph {
    dataPropertyTable: IDataPropertyTable;
    clasificationType: string;
    data: any[]
}

export interface IDataPropertyTable {
    sufijo: string;
    headerName: string;
    subHeaderName: string;
    codField: string;
    desField: string;
    width: number;
    titleGraph: string;
}