declare module '@wazzu/iluvatar-core' {

    /**
     * Tipos basicos para los campos de la base de datos
     */
    enum FieldType { int, float, string, bool, datetime }

    /**
     * Estructura basica para un campo de la base de datos
     */
    type Field = {
        name: string,
        type: FieldType | Field | Field[] | string,
        required?: boolean,
        default?: any;
        unique?: boolean,
        reference?: string,
        isPrimaryKey?: boolean
    }

    class Schema {
        private _name: string;
        private _fields: Field[];
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
        public constructor(_name: string, ..._fields: Field[]);

        public canEdit(rol: any): boolean;
        public canCreate(rol: any): boolean;
        public canUpdate(rol: any): boolean;
        public canDelete(rol: any): boolean;
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
        public addSchema(schemaName: string, schema: Schema): void;

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
}