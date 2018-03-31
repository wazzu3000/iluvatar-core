declare module '@wazzu/iluvatar-core' {
	export type Dictionary<K extends number | string, V> = {
	    [key: string]: V;
	};
	export type ClassType = {
	    new (...args: any[]);
	};
	export type DatabaseType = {
	    databaseType: RegExp;
	    javascriptType: string | ClassType;
	};
	export type JavascriptType = string | ClassType;
	/**
	 * Estructura basica para un campo de la base de datos
	 */
	export type Field = {
	    type: Field | Field[] | string;
	    required?: boolean;
	    default?: any;
	    unique?: boolean;
	    reference?: string;
	    isPrimaryKey?: boolean;
	};

	// import { Dictionary, DatabaseType, Field } from '@wazzu/types';
	/**
	 * Clase que almacena la estructura de como deben estar formados los datos en
	 * base de datos
	 */
	export class Schema {
	    private _name;
	    private _fields;
	    private static dbTypesSupported: DatabaseType[];
	    private static typesBySchema: Dictionary<string, Dictionary<string, JavascriptType>>;
		private static uniqueIndexesBySchema: Dictionary<string, string[]>;
		private javascriptTypes: Dictionary<string, JavascriptType>;
		private uniqueIndexes: string[];
	    protected rolesToEdit: any[];
	    protected rolesToCreate: any[];
	    protected rolesToUpdate: any[];
	    protected rolesToDelete: any[];
	    /**
	     * Inicializa una nueva instancia para almacenar el esquema de los datos
	     * @param _name Nombre del esquema que se usará para almacenar u obtener datos
	     * @param _fields Arreglo de la estructura de campois que representa el esquema de cada campo en particular
	     */
	    protected constructor(_name: string, _fields: Dictionary<string, Field>);
	    public static setDbTypesSupported(databaseTypes: DatabaseType[]): void;
	    public readonly name: string;
	    public readonly fields: Dictionary<string, Field>;
	    public cleanAndVerifyValues(payload: any): any;
		public cleanValues(payload: any): any;
		public getUniqueIndexes(): string[];
	    public canEdit(rol: any): boolean;
	    public canCreate(rol: any): boolean;
	    public canUpdate(rol: any): boolean;
	    public canDelete(rol: any): boolean;
	    private verifyType(value, javascriptType);
	}

	export abstract class Controller {
		private _elementId;
		protected db: IluvatarDatabaseInstancier;
		public elementId: any;
		
		public constructor(db: IluvatarDatabaseInstancier);
	    abstract get(payload: any): Promise<any[]>;
	    abstract post(payload: any): Promise<any>;
	    abstract put(payload: any): Promise<any>;
	    abstract delete(payload: any): Promise<boolean>;
	}

	// import { Schema } from '@wazzu/database/schema';
	// import { Controller } from '@wazzu/api/controller';
	/**
	 * Clase que almacena todas las configuraciones necesarias para el proyecto
	 */
	export class Config {
	    private static configInstance;
	    private configs;
	    private schemas;
	    private controllers;
	    /**
	     * Inicializa una nueva instancia del objeto configuración
	     */
	    private constructor();
	    /**
	     * Obtiene una instancia global de configuración
	     */
	    static getInstance(): Config;
	    /**
	     * Almacena una configuración personalizada en memoria, esta puede ser de
	     * cualquier tipo
	     * @param key Clave con la que es guardada la configuración
	     * @param value Valor de la configuración a guardar
	     */
	    setConfig(key: string, value: any): void;
	    /**
	     * Busca y obtiene una configuración previamente guardada en memoria según
	     * su clave
	     * @param key Clave con la que fue guardada la configuración
	     */
	    getConfig(key: string): any;
	    /**
	     * Almacena un esquema en memoria
	     * @param schemaName Clave con la que es guardado el esquema en memoria
	     * @param schema Esquema a guardar en memoria
	     */
	    addSchema(schemaName: string, schema: typeof Schema): void;
	    /**
	     * Busca y obtiene un esquema en memoria, en caso de no encontrar dicho
	     * esquema devuelve nulo como valor
	     * @param schemaName Clave del esquema con el que fue almacenado
	     */
	    getSchema(schemaName: string): Schema;
	    /**
	     * Almacena un controlador personalizado en memoria
	     * @param controllerName Clave con el que es guardado el controlador en
	     * memoria
	     * @param controller Controlador a guardar en memoria
	     */
	    addController(controllerName: string, controller: typeof Controller): void;
	    /**
	     * Busca y obtiene un controlador en memoria, en caso de no encontrar dicho
	     * controlador devuelve nulo como valor
	     * @param controllerName Clave del controlador con el que fue almacenado
	     */
	    getController(controllerName: string): typeof Controller;
	}

	// import { Schema } from '@wazzu/iluvatar-core';
	export abstract class CrudMaster {
	    protected schemaName: string;
	    protected schema: Schema;
	    constructor(schemaName: string);
	    abstract doQuery(): Promise<any>;
	    sendError<T>(message: string): Promise<T>;
	}

	// import { CrudMaster } from '@wazzu/iluvatar-core';
	export abstract class CreateCrud extends CrudMaster {
	    protected values: any;
	    constructor(schemaName: string, values: any);
	}

	export class Where {
	    private _column;
	    private _condition;
	    private _value;
	    constructor(_column: string, _condition: string, _value: string);
	    readonly column: string;
	    readonly condition: string;
	    readonly value: string;
	}

	// import { CrudMaster } from '@wazzu/iluvatar-core';
	// import { Where } from '@wazzu/iluvatar-core';
	export abstract class WhereCrud extends CrudMaster {
	    protected wheres: Where[];
	    constructor(schemaName: string);
	    addWhere(where: Where): WhereCrud;
	}

	export class Join {
	    private _tableName;
	    private _localColumnName;
	    private _foreignColumnName;
	    constructor(_tableName: string, _localColumnName: string, _foreignColumnName: string);
	    readonly tableName: string;
	    readonly localColumnName: string;
	    readonly foreignColumnName: string;
	}

	// import { WhereCrud } from '@wazzu/iluvatar-core';
	// import { Join } from '@wazzu/iluvatar-core';
	export abstract class FindCrud extends WhereCrud {
	    protected fields: string[];
	    protected joins: Join[];
	    protected ordersBy: string[];
	    protected groupsBy: string[];
	    constructor(schemaName: string, ...fields: string[]);
	    addJoin(join: Join): FindCrud;
	    setOrderBy(...ordersBy: string[]): FindCrud;
	    setGroupBy(...groupsBy: string[]): FindCrud;
	}

	// import { WhereCrud } from '@wazzu/iluvatar-core';
	export abstract class UpdateCrud extends WhereCrud {
	    protected values: any;
	    constructor(schemaName: string, values: any);
	}

	// import { WhereCrud } from '@wazzu/iluvatar-core';
	export abstract class DeleteCrud extends WhereCrud {
	}

	// import { CreateCrud, FindCrud, UpdateCrud, DeleteCrud } from '@wazzu/iluvatar-core';
	/**
	 * Plantilla inicial para las operaciones básicas de una base de datos
	 */
	export abstract class IluvatarDatabaseInstancier {
	    private _schemaName;
	    protected _defaultId: string;
	    constructor(_schemaName?: string);
	    schemaName: string;
	    readonly defaultId: string;
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

	// import { DatabaseType } from '@wazzu/types';
	// import { IluvatarDatabaseInstancier } from '@wazzu/iluvatar-core';
	export abstract class IluvatarDatabase {
	    abstract getTypesSupported(): DatabaseType[];
	    abstract newIluvatarDatabaseInstancier(_schemaName: string): IluvatarDatabaseInstancier;
	}

	export class AppModel {
	    schemasPath: string;
	    controllersPath: string;
	    port: number;
	    routePrefix: string;
	}

	export class DatabaseModel {
	    engine: string;
	    user: string;
	    password: string;
	    database: string;
	    port: number;
		host: string;
		idFieldName: string;
	}

	export class AuthModel {
	    enabled: boolean;
	    secretKey: string;
	    ttl: number;
		userSchemaName: string;
		userFieldName: string;
		passwordFieldName: string;
	    rolFieldName: string;
	    adminFieldValue: any;
	}

	export class ErrorMaster extends Error {
	    private _statusCode;
	    constructor(message: string, _statusCode: number);
	    readonly statusCode: number;
	}

	// import { ErrorMaster } from '@wazzu/iluvatar-core';
	export class DatabaseError extends ErrorMaster {
	    constructor(message: string);
	}

}
