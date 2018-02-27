import { CrudMaster } from './crud-master';

export abstract class CreateCrud extends CrudMaster {
    public constructor(schemaName: string, protected values: any) {
        super(schemaName);
    }
}