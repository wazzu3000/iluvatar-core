export class Where {
    public constructor(private _column: string, private _condition: string, private _value: string) {}

    public get column(): string {
        return this._column;
    }

    public get condition(): string {
        return this._condition;
    }

    public get value(): string {
        return this._value;
    }
}