/**
 * Tipos basicos para los campos de la base de datos
 */
export enum FieldType { int, float, string, bool, datetime };

/**
 * Estructura basica para un campo de la base de datos
 */
export type Field = {
    name: string,
    type: FieldType | Field | Field[] | string,
    required?: boolean,
    default?: any;
    unique?: boolean,
    reference?: string,
    isPrimaryKey?: boolean
};

/**
 * Clase que almacena la estructura de como deben estar formados los datos en
 * base de datos
 */
export class Schema {
    private _fields;
    protected rolesToEdit: any[] = [];
    protected rolesToCreate: any[] = [];
    protected rolesToUpdate: any[] = [];
    protected rolesToDelete: any[] = [];

    /**
     * Inicializa una nueva instancia para almacenar el esquema de los datos
     * @param _name Nombre del esquema que se usará para almacenar u obtener datos
     * @param _fields Arreglo de la estructura de campois que representa el esquema de cada campo en particular
     */
    protected constructor(private _name: string, ..._fields: Field[]) {
        this._fields = _fields;
    }

    public get name(): string {
        return this._name;
    }

    public get fields(): Field[] {
        return this._fields;
    }

    public canEdit(rol: any): boolean {
        return this.rolesToEdit.length == 0 ? true : this.rolesToEdit.indexOf(rol) >= 0;
    }

    public canCreate(rol: any): boolean {
        return this.rolesToCreate.length == 0 ? true : this.rolesToCreate.indexOf(rol) >= 0;
    }

    public canUpdate(rol: any): boolean {
        return this.rolesToUpdate.length == 0 ? true : this.rolesToUpdate.indexOf(rol) >= 0;
    }

    public canDelete(rol: any): boolean {
        return this.rolesToDelete.length == 0 ? true : this.rolesToDelete.indexOf(rol) >= 0;
    }
}