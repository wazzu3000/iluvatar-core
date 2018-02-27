import { Schema } from './../schema';
import { Config } from './../../config';

export abstract class CrudMaster {
    protected schema: Schema;

    public constructor(protected schemaName: string) {
        let config = Config.getInstance();
        let schema = config.getSchema(schemaName);
        if (schema) {
            this.schema = schema;
        } else {
            throw 'Schema coud not found';
        }
    }
    abstract doQuery(): Promise<any>;

    public sendError<T>(message: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            reject(message);
        });
    }
}