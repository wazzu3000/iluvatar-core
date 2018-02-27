export class Join {
    public constructor(private _tableName: string, private _localColumnName: string, private _foreignColumnName: string) { }

    public get tableName(): string {
        return this._tableName;
    }

    public get localColumnName(): string {
        return this._localColumnName;
    }

    public get foreignColumnName(): string {
        return this._foreignColumnName;
    }
}