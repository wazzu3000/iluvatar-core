import { Schema } from '@wazzu/iluvatar-core';
import { DatabaseType } from './../types';
import { IluvatarDatabaseInstancier } from './iluvatar-database-instancier';

export abstract class IluvatarDatabase {
    abstract getTypesSupported(): DatabaseType[];
    abstract newIluvatarDatabaseInstancier(schemaName: string): IluvatarDatabaseInstancier;
    abstract createSchemaInDb(schema: Schema);
    abstract createUniqueKey(schemaName: string, fieldName: string);
}