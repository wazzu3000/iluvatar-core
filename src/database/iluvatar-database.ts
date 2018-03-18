import { DatabaseType } from './../types';
import { IluvatarDatabaseInstancier } from './iluvatar-database-instancier';

export abstract class IluvatarDatabase {
    abstract getTypesSupported(): DatabaseType[];
    abstract newIluvatarDatabaseInstancier(_schemaName: string): IluvatarDatabaseInstancier;
}