import { IluvatarDatabaseInstancier } from '@wazzu/iluvatar-core';

export abstract class Controller {
    private _elementId: any;

    public get elementId(): any {
        return this._elementId;
    }

    public set elementId(value: any) {
        this._elementId = value;
    }

    public constructor(protected db: IluvatarDatabaseInstancier) { }
    abstract get(payload: any): Promise<any[]>;
    abstract post(payload: any): Promise<any>;
    abstract put(payload: any): Promise<any>;
    abstract delete(payload: any): Promise<boolean>;
}