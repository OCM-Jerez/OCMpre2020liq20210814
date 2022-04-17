export interface IDataGraph {
    data: string;
    titleSelect: string;
    optionSelect: string;
    errorSelect: string;
    URLSelect: string;
}


export interface IDataPropertyTable {
    sufijo: string;
    headerName: string;
    subHeaderName: string;
    codField: string;
    desField: string;
    width: number;
}
export interface IDataTableGraph {
    dataPropertyTable: IDataPropertyTable;
    clasificationType: string;
    title: string;
    data: any[]
}