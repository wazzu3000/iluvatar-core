import { CrudMaster } from './crud-master';
import { Where } from './../where';

export abstract class WhereCrud extends CrudMaster {
    protected wheres: Where[];

    public constructor(schemaName: string) {
        super(schemaName);
        this.wheres = [];
    }

    public addWhere(where: Where): WhereCrud {
        this.wheres.push(where);
        return this;
    }
}