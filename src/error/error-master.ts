export class ErrorMaster extends Error {
    public constructor(message: string, private _statusCode: number) {
        super(message);
    }

    public get statusCode(): number {
        return this._statusCode;
    }
}