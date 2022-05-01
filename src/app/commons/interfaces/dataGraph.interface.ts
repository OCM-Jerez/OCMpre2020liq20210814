export interface IDataTable {
    dataPropertyTable: IDataPropertyTableGraph;
    clasificationType: string;
    data: any[]
}

export interface IDataPropertyTableGraph {
    sufijo: string;
    headerName: string;
    subHeaderName: string;
    codField: string;
    desField: string;
    width: number;
    titleGraph: string;
    subTitleGraph: string;
}

export interface IDataGraph extends IDataTable {
    selectedCodeRow: string;
}