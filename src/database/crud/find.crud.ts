import { WhereCrud } from './where.crud';
import { Join } from './../join';

export abstract class FindCrud extends WhereCrud {
    protected fields: string [];
    protected joins: Join[];
    protected ordersBy: string [];
    protected groupsBy: string[]

    public constructor(schemaName: string, ...fields: string[]) {
        super(schemaName);
        this.fields = fields;
        this.joins = [];
    }

    public addJoin(join: Join): FindCrud {
        this.joins.push(join);
        return this;
    }

    public setOrderBy(...ordersBy: string[]): FindCrud {
        this.ordersBy = ordersBy;
        return this;
    }

    public setGroupBy(...groupsBy: string[]): FindCrud {
        this.groupsBy = groupsBy;
        return this;
    }
}