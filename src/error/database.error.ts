import { ErrorMaster } from './error-master';

export class DatabaseError extends ErrorMaster {
    public constructor(message: string) {
        super(message, 1000);
    }
}