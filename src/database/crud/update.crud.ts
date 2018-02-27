import { WhereCrud } from './where.crud';

export abstract class UpdateCrud extends WhereCrud {
    public constructor(schemaName: string, protected values: any) {
        super(schemaName);
    }
}