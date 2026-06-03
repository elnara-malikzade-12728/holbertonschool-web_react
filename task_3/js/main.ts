/// <reference path="./crud.d.ts" />
import { RowID as rowID, RowElement as rowElement } from './interface';
import * as CRUD from './crud';

const row: rowElement = {
    firstName: 'Guillaume',
    lastName: 'Salva'
}

const newRowID: rowID = CRUD.insertRow(row);