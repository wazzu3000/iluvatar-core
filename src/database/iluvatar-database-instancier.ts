import { CreateCrud, FindCrud, UpdateCrud, DeleteCrud } from './crud/crud';
import { ClassType } from './../types';

/**
 * Plantilla inicial para las operaciones básicas de una base de datos
 */
export abstract class IluvatarDatabaseInstancier {
    protected _defaultId: string;

    public constructor(private _schemaName?: string) { }

    public get schemaName(): string {
        return this._schemaName;
    }

    public set schemaName(schemaName: string) {
        if (schemaName) {
            this._schemaName = schemaName;
        }
    }

    public get defaultId(): string {
        return this._defaultId
    }

    /**
     * Plantilla para generar una nueva conexión a base de datos, se debe
     * devolver a si mismo cuando la conexión sea exitosa
     */
    abstract openConnection(): Promise<IluvatarDatabaseInstancier>;

    /**
     * Plantilla para generar la busqueda de datos, este método deberá devolver
     * una nueva instancia de la clase que herede de `FindCrud`
     */
    abstract find(...fields: string[]): FindCrud;

    /**
     * Plantilla para generar una actualización de datos, este método deberá
     * devolver una nueva instancia de la clase que herede de `UpdateCrud`
     */
    abstract update(values: any): UpdateCrud;

    /**
     * Plantilla para crear datos, este método deberá devolver una nueva
     * instancia de la clase que herede de `CreateCrud`
     */
    abstract create(values: any): CreateCrud;

    /**
     * Plantilla para generar la eliminación de datos, este método deberá
     * devolver una nueva instancia de la clase que herede de `DeleteCrud`
     */
    abstract delete(): DeleteCrud;

    /**
     * Intenta cerrar una conexión con la base de datos, si esta es correcta el
     * parametro de la promesa debe ser verdadero, falso en caso contrario.
     */
    abstract closeConnection(): void;
}