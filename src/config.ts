import { Schema } from './database/schema';
import { Controller } from './api/controller';

/**
 * Clase que almacena todas las configuraciones necesarias para el proyecto
 */
export class Config {
    private static configInstance: Config = null;
    private configs: {} = {};
    private schemas: {} = {};
    private controllers: {} = {};

    /**
     * Inicializa una nueva instancia del objeto configuración
     */
    private constructor() { }

    /**
     * Obtiene una instancia global de configuración
     */
    public static getInstance(): Config {
        if (!Config.configInstance) {
            Config.configInstance = new Config();
        }
        return Config.configInstance;
    }

    /**
     * Almacena una configuración personalizada en memoria, esta puede ser de
     * cualquier tipo
     * @param key Clave con la que es guardada la configuración
     * @param value Valor de la configuración a guardar
     */
    public setConfig(key: string, value: any): void {
        this.configs[key] = value;
    }

    /**
     * Busca y obtiene una configuración previamente guardada en memoria según
     * su clave
     * @param key Clave con la que fue guardada la configuración
     */
    public getConfig(key: string): any {
        return this.configs[key];
    }

    /**
     * Almacena un esquema en memoria
     * @param schemaName Clave con la que es guardado el esquema en memoria
     * @param schema Esquema a guardar en memoria
     */
    public addSchema(schemaName: string, schema: typeof Schema): void {
        this.schemas[schemaName] = schema;
    }

    /**
     * Busca y obtiene un esquema en memoria, en caso de no encontrar dicho
     * esquema devuelve nulo como valor
     * @param schemaName Clave del esquema con el que fue almacenado
     */
    public getSchema(schemaName: string): Schema {
        let SchemaClass = this.schemas[schemaName];
        return SchemaClass ? new SchemaClass() : null;
    }

    /**
     * Almacena un controlador personalizado en memoria
     * @param controllerName Clave con el que es guardado el controlador en
     * memoria
     * @param controller Controlador a guardar en memoria
     */
    public addController(controllerName: string, controller: typeof Controller): void {
        this.controllers[controllerName] = controller;
    }

    /**
     * Busca y obtiene un controlador en memoria, en caso de no encontrar dicho
     * controlador devuelve nulo como valor
     * @param controllerName Clave del controlador con el que fue almacenado
     */
    public getController(controllerName : string): typeof Controller {
        return this.controllers[controllerName] as typeof Controller;
    }
}