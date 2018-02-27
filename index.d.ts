declare module '@wazzu/iluvatar-core' {

    export type ClassType = { new(...args: any[]) }
    export type JavascriptType = string | ClassType;

    /**
     * Estructura basica para un campo de la base de datos
     */
    export type Field = {
        type: Field | Field[] | string,
        //javascriptType?: string | ClassType,
        required?: boolean,
        default?: any;
        unique?: boolean,
        reference?: string,
        isPrimaryKey?: boolean
    };

    export type Fields = { [key: string]: Field }
    export type JavascriptTypes = { [subKey: string]: JavascriptType };
    export type TypesBySchema = { [key: string]: JavascriptTypes };

    class Schema {
        private static dbTypesSupported: DatabaseType[];
        private static typesBySchema: TypesBySchema;
        private javascriptTypes: JavascriptTypes;
        private _name: string;
        private _fields: Fields;
        protected rolesToEdit: any[];
        protected rolesToCreate: any[];
        protected rolesToUpdate: any[];
        protected rolesToDelete: any[];
        public name: string;
        public fields: Field[];

        /**
         * Inicializa una nueva instancia para almacenar el esquema de los datos
         * @param _name Nombre del esquema que se usará para almacenar u obtener datos
         * @param _fields Arreglo de la estructura de campois que representa el esquema de cada campo en particular
         */
        public constructor(_name: string, _fields: Fields);

        public static setDbTypesSupported(databaseTypes: DatabaseType[]): void
        public cleanAndVerifyValues(payload: any): any;
        public cleanValues(payload: any): any;
        public canEdit(rol: any): boolean;
        public canCreate(rol: any): boolean;
        public canUpdate(rol: any): boolean;
        public canDelete(rol: any): boolean;
        private verifyType(value: any, field: Field): void;
    }

    interface IController {
        get(payload: any, id?: any): Promise<any[]>;
        post(payload: any, id?: any): Promise<any>;
        put(payload: any, id?: any): Promise<any>;
        delete(payload: any, id?: any): Promise<boolean>;
    }

    class Config {
        private configs: {};
        private models: {};
        private controllers: {};

        /**
         * Inicializa una nueva instancia del objeto configuración
         */
        private constructor();

        /**
         * Obtiene una instancia global de configuración
         */
        public static getInstance(): Config;
    
        /**
         * Almacena una configuración personalizada en memoria, esta puede ser de
         * cualquier tipo
         * @param key Clave con la que es guardada la configuración
         * @param value Valor de la configuración a guardar
         */
        public setConfig(key: string, value: any): void;
    
        /**
         * Busca y obtiene una configuración previamente guardada en memoria según
         * su clave
         * @param key Clave con la que fue guardada la configuración
         */
        public getConfig(key: string): any;

        /**
         * Almacena un esquema en memoria
         * @param schemaName Clave con la que es guardado el esquema en memoria
         * @param schema Esquema a guardar en memoria
         */
        public addSchema(schemaName: string, schema: typeof Schema): void;

        /**
         * Busca y obtiene un esquema en memoria, en caso de no encontrar dicho
         * esquema devuelve nulo como valor
         * @param schemaName Clave del esquema con el que fue almacenado
         */
        public getSchema(schemaName: string): Schema;

        /**
         * Almacena un controlador personalizado en memoria
         * @param controllerName Clave con el que es guardado el controlador en
         * memoria
         * @param controller Controlador a guardar en memoria
         */
        public addController(controllerName: string, controller: IController);

        /**
         * Busca y obtiene un controlador en memoria, en caso de no encontrar dicho
         * controlador devuelve nulo como valor
         * @param controllerName Clave del controlador con el que fue almacenado
         */
        public getController(controllerName : string) : IController;
    }

    class AppModel {
        public schemasPath: string;
        public controllersPath: string;
        public port: number;
        public routePrefix: string;
    }

    class AuthModel {
        public enabled: boolean;
        public secretKey: string;
        public ttl: number;
        public userDocumentName: string;
        public rolFieldName: string;
        public adminFieldValue: any;
    }
    

    /**
     * Modelo que almacena la configuración de la base de datos
     */
    class DatabaseModel {
        public engine: string;
        public user: string;
        public password: string;
        public database: string;
        public port: number;
        public host: string;
    }

    /**
     * Tipos basicos para los campos de la base de datos
     */
    enum FieldType { int, float, string, bool, datetime }

    class Where {
        private _column: string;
        private _condition: string;
        private _value: string
        public column: string;
        public condition: string;
        public value: string;

        public constructor(_column: string, _condition: string, _value: string);
    }

    class Join {
        private _tableName: string;
        private _localColumnName: string;
        private _foreignColumnName: string;
        public tableName: string;
        public localColumnName: string;
        public foreignColumnName: string;

        public constructor(_tableName: string, _localColumnName: string, _foreignColumnName: string);
    }

    abstract class CrudMaster {
        protected schema: Schema;
        protected schemaName
    
        public constructor(schemaName: string);
        public sendError<T>(message: string): Promise<T>;
        public abstract doQuery(): Promise<any>;
    }

    abstract class WhereCrud extends CrudMaster {
        protected wheres: Where[];
    
        public constructor(schemaName: string);
    
        public addWhere(where: Where): WhereCrud;
    }

    abstract class CreateCrud extends CrudMaster {
        protected values: any;

        public constructor(schemaName: string, values: any);
    }

    abstract class FindCrud extends WhereCrud {
        protected fields: string [];
        protected joins: Join[];
        protected ordersBy: string [];
        protected groupsBy: string[]
    
        public constructor(schemaName: string, ...fields: string[]);
    
        public addJoin(join: Join): FindCrud ;
    
        public setOrderBy(...ordersBy: string[]): FindCrud;
    
        public setGroupBy(...groupsBy: string[]): FindCrud;
    }

    abstract class UpdateCrud extends WhereCrud {
        protected values: any;

        public constructor(schemaName: string, values: any);
    }

    abstract class DeleteCrud extends WhereCrud {

    }

    type DatabaseType = {
        databaseType: RegExp,
        javascriptType: string | ClassType;
    }

    /**
     * Plantilla inicial para las operaciones básicas de una base de datos
     */
    abstract class IluvatarDatabase {
        private _schemaName: string;
        protected _defaultId: string;
        public defaultId: string;
        public schemaName: string;

        public constructor();
        public constructor(_schemaName: string);
        
        /**
         * Plantilla para generar una nueva conexión a base de datos, se debe
         * devolver a si mismo cuando la conexión sea exitosa
         */
        abstract openConnection(): Promise<IluvatarDatabase>;
    
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

        abstract newInstance(): IluvatarDatabase;
        abstract newInstance(_schemaName: string): IluvatarDatabase;
        abstract getTypesSupported(): DatabaseType[];
    }
}