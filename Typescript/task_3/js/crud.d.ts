import { RowID, RowElement } from './interface';

// Declare the module matching your file name
declare module './crud' {
    export function insertRow(row: RowElement): RowID;
    export function deleteRow(rowId: RowID): void;
    export function updateRow(rowId: RowID, row: RowElement): RowID;
}
