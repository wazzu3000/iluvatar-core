export type Dictionary<K extends number | string, V> = { [key: string]: V }

export type ClassType = { new(...args: any[]) }

export type DatabaseType = {
    databaseType: RegExp,
    javascriptType: string | ClassType; //The posible types are: string or some class type
}

export type JavascriptType = string | ClassType;

/**
 * Estructura basica para un campo de la base de datos
 */
export type Field = {
    type: Field | Field[] | string,
    required?: boolean,
    default?: any;
    unique?: boolean,
    reference?: string,
    isPrimaryKey?: boolean
};